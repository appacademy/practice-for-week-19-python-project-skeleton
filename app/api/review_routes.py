from flask import Blueprint, jsonify, session, request
from app.models import User, db, Restaurant, Review
from app.forms.restaurant_form import CreateRestaurantForm
from app.forms.review_form import ReviewForm
from flask_login import current_user, login_user, logout_user, login_required

review_routes = Blueprint('review', __name__)


#Delete a specific review
@review_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_one_review(id):

    review = Review.query.get(id)
    if review:
        if review.reviewer_id == current_user.id:
            db.session.delete(review)
            db.session.commit()
            return {'message': 'Review successfully deleted!'}
        return {"errors": "You must own the review to complete this action!"}, 401
    return {'error': 'Review not found'}, 404