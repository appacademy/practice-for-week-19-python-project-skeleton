from flask import Blueprint, jsonify, session, request
from app.models import User, db, Restaurant, Review, ReviewImage
from app.forms.restaurant_form import CreateRestaurantForm
from app.forms.review_form import ReviewForm
from app.forms.review_images_form import ReviewImageForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_routes import upload_file_to_s3, get_unique_filename, remove_file_from_s3

review_routes = Blueprint("review", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


# Get all Reviews
@review_routes.route("/")
def get_all_reviews():
    results = []
    reviews = Review.query.all()
    for review in reviews:
        results.append(review.to_dict())
    return results


# Delete a specific review
@review_routes.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete_one_review(id):
    review = Review.query.get(id)
    if review:
        if review.reviewer_id == current_user.id:
            db.session.delete(review)
            db.session.commit()
            return {"message": "Review successfully deleted!"}
        return {"errors": "You must own the review to complete this action!"}, 401
    return {"error": "Review not found"}, 404


# Create a review image
@review_routes.route("/<int:id>/images/new", methods=["POST"])
@login_required
def create_review_image(id):
    review = Review.query.get(id)

    if review:
        if review.reviewer_id == current_user.id:
            form = ReviewImageForm()
            form["csrf_token"].data = request.cookies["csrf_token"]
            if form.validate_on_submit():
                image = form.data["url"]
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                print(upload)

                if "url" not in upload:
                    return {"errors": [upload]}
                url = upload["url"]

                reviewImage = ReviewImage(review_id=id, url=url)
                db.session.add(reviewImage)
                db.session.commit()
                return reviewImage.to_dict()
            return {"errors": validation_errors_to_error_messages(form.errors)}, 401
        return {"errors": "You must be the review owner to complete this action!"}, 401
    return {"errors": "This review does not exist!"}


# Delete a specific review image
@review_routes.route("/images/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_review_image(id):
    reviewImage = ReviewImage.query.get(id)

    if reviewImage:
        review = Review.query.get(reviewImage.review_id)
        if review.reviewer_id == current_user.id:
            url = reviewImage.url
            deleted = remove_file_from_s3(url)
            print(deleted)
            db.session.delete(reviewImage)
            db.session.commit()
            return {"message": "Review image sucessfully deleted"}
        return {"errors": "You must own the review to complete this action!"}, 401
    return {"errors": "This review image does not exist!"}, 404
