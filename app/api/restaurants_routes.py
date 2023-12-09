from flask import Blueprint, jsonify, session, request
from app.models import User, db, Restaurant, Review, RestaurantImage
from app.forms.restaurant_form import CreateRestaurantForm
from app.forms.review_form import ReviewForm
from app.forms.restaraunt_image_form import RestaurantImageForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_routes import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from statistics import mean

restaurant_routes = Blueprint('restuarant', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# View All Restaurants
@restaurant_routes.route('/')
def get_restaurants():
    # page = request.args.get('page')
    # size = 10

    # if page == None or page > 10:
    #     page = 1
    # offset = size * (page - 1)

    # restaurants = Restaurant.query.limit(size).offset(offset).all()
    restaurants = Restaurant.query.all()
    results = []
    for restaurant in restaurants:
        id = restaurant.id
        reviews = Review.query.filter(Review.restaurant_id == id)
        ratings = []
        if reviews:
            for review in reviews:
                ratings.append(review.stars)
                if len(ratings) > 0:
                    avgRating = mean(ratings)
                    restaurant.rating = round(avgRating, 2)
        results.append(restaurant.to_dict())
    return results


# Create A Restaurant
@restaurant_routes.route('/new', methods=['POST'])
@login_required
def create_restaurants():
    form = CreateRestaurantForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        restaurant = Restaurant(
            owner_id=current_user.id,
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            country=form.data['country'],
            name=form.data['name'],
            price=form.data['price'],
            rating=0,
            category=form.data["category"],
            postalcode=form.data["postalcode"],
            lat=form.data["lat"],
            lng=form.data["lng"],
        )
        db.session.add(restaurant)
        db.session.commit()
        return restaurant.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# View Details of A specific restaurant by Id
@restaurant_routes.route('/<int:id>')
def get_one_restaurant(id):

    restaurant = Restaurant.query.filter(Restaurant.id == id)
    for res in restaurant:
        reviews = Review.query.filter(Review.restaurant_id == id)
        ratings = []
        if reviews:
            for review in reviews:
                ratings.append(review.stars)
                if len(ratings) > 0:
                    avgRating = mean(ratings)
                    res.rating = round(avgRating, 2)
        return res.to_dict()


# Update the details of a specific restaurant
@restaurant_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def update_one_restaurant(id):

    form = CreateRestaurantForm()

    restaurant = Restaurant.query.get(id)

    if restaurant:
        if restaurant.owner_id == current_user.id:
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                restaurant.address = form.data['address']
                restaurant.city = form.data['city']
                restaurant.state = form.data['state']
                restaurant.country = form.data['country']
                restaurant.name = form.data['name']
                restaurant.price = form.data['price']
                reviews = Review.query.filter(Review.restaurant_id == id)
                ratings = []
                restaurant.category = form.data["category"]
                restaurant.postalcode = form.data["postalcode"]
                restaurant.lat = form.data["lat"]
                restaurant.lng = form.data["lng"]
                if reviews:
                    for review in reviews:
                        ratings.append(review.stars)
                        if len(ratings) > 0:
                            avgRating = mean(ratings)
                            restaurant.rating = round(avgRating, 2)
                db.session.commit()
                return restaurant.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        return {"errors": "You must own this restaurant to complete this action!"}, 401
    return {"errors": "This restaurant does not exist!"}, 404


# Delete a Restaurant
@restaurant_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_one_restaurant(id):

    restaurant = Restaurant.query.get(id)
    if restaurant:
        if restaurant.owner_id == current_user.id:
            db.session.delete(restaurant)
            db.session.commit()
            return {'message': 'Restaurant successfully deleted'}
        return {"errors": "You must own the restaurant to complete this action!"}, 401
    return {'error': 'Restaurant not found'}, 404


# View reviews of a specific restaurant
@restaurant_routes.route("/<int:id>/reviews")
def get_reviews(id):
    restaurant = Restaurant.query.get(id)
    if restaurant:
        reviews = Review.query.filter(Review.restaurant_id == restaurant.id)
        results = []
        if reviews:
            for review in reviews:
                results.append(review.to_dict())
            return results
        else:
            return {"errors": "No reivews found for this spot!"}, 404
    return {"errors": "No restaurant found!"}, 404


# Create review for a specific restaurant
@restaurant_routes.route("/<int:id>/reviews/new", methods=["POST"])
@login_required
def create_review(id):
    restaurant = Restaurant.query.get(id)

    if restaurant:
        form = ReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            review = Review(
                reviewer_id=current_user.id,
                restaurant_id=restaurant.id,
                review=form.data["review"],
                stars=form.data["stars"]
            )
            db.session.add(review)
            db.session.commit()
            return review.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Update a specific review for a specific spot
@restaurant_routes.route("/<int:id>/review/<int:reviewId>", methods=["PUT"])
@login_required
def update_review(id, reviewId):

    restaurant = Restaurant.query.get(id)

    if restaurant:
        review = Review.query.get(reviewId)
        if review:
            if review.reviewer_id == current_user.id:
                form = ReviewForm()
                form['csrf_token'].data = request.cookies['csrf_token']
                if form.validate_on_submit():
                    review.review = form.data["review"]
                    review.stars = form.data["stars"]
                    db.session.commit()
                    return review.to_dict()
                return {'errors': validation_errors_to_error_messages(form.errors)}, 401
            return {"errors": "USER MUST OWN THE REVIEW!!!!!"}, 401
        return {"errors": "Review mayhaps not exist?"}, 404
    return {"errors": "This restaurant does not exist - Josh"}, 404


# Create a restaurant image
@restaurant_routes.route("/<int:id>/images/new", methods=["POST"])
@login_required
def create_restaurant_image(id):
    restaurant = Restaurant.query.get(id)

    if restaurant:
        if restaurant.owner_id == current_user.id:
            form = RestaurantImageForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                image = form.data["url"]
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                print(upload)

                if "url" not in upload:
                    return {"errors": [upload]}
                url = upload["url"]
                restaurantImage = RestaurantImage(
                    restaurant_id=id,
                    url=form.data["url"]
                )
                db.session.add(restaurantImage)
                db.session.commit()
                return restaurantImage.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        return {"errors": "You must be the restaurant owner to complete this action!"}, 401
    return {"errors": "This restaurant does not exist!"}


# Delete a specific restaurant image
@restaurant_routes.route("/images/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_review_image(id):
    restaurantImage = RestaurantImage.query.get(id)

    if restaurantImage:
        restaurant = Restaurant.query.get(restaurantImage.restaurant_id)
        if restaurant.owner_id == current_user.id:
            url = restaurantImage.url
            deleted = remove_file_from_s3(url)
            print(deleted)
            db.session.delete(restaurantImage)
            db.session.commit()
            return {"message": "Restaurant image sucessfully deleted"}
        return {"errors": "You must own the restaurant to complete this action!"}, 401
    return {"errors": "This restaurant image does not exist!"}, 404


# Search Filter for Restaurants
@restaurant_routes.route("/search")
def search_filter():
    name = request.args.get('name')
    categorySearch = request.args.get('category')
    priceSearch = request.args.get('price')
    # page = request.args.get('page')
    # size = 10

    # if page == None or page > 10:
    #     page = 1
    # offset = size * (page - 1)

    results = []
    restaurants = None

    if name and categorySearch and priceSearch:
        nameSearch = "%{}%".format(name)
        restaurants = Restaurant.query.filter(
            Restaurant.name.like(nameSearch),
            Restaurant.category == categorySearch,
            Restaurant.price == priceSearch
        )
    elif name and categorySearch:
        nameSearch = "%{}%".format(name)
        restaurants = Restaurant.query.filter(
            Restaurant.name.like(nameSearch),
            Restaurant.category == categorySearch
        )
    elif name and priceSearch:
        nameSearch = "%{}%".format(name)
        restaurants = Restaurant.query.filter(
            Restaurant.name.like(nameSearch),
            Restaurant.price == priceSearch
        )
    elif categorySearch and priceSearch:
        restaurants = Restaurant.query.filter(
            Restaurant.category == categorySearch,
            Restaurant.price == priceSearch
        )
    elif name:
        nameSearch = "%{}%".format(name)
        restaurants = Restaurant.query.filter(
            Restaurant.name.like(nameSearch))
    elif categorySearch:
        restaurants = Restaurant.query.filter(
            Restaurant.category == categorySearch)
    elif priceSearch:
        restaurants = Restaurant.query.filter(
            Restaurant.price == priceSearch)
    for res in restaurants:
        id = res.id
        reviews = Review.query.filter(Review.restaurant_id == id)
        ratings = []
        if reviews:
            for review in reviews:
                ratings.append(review.stars)
                if len(ratings) > 0:
                    avgRating = mean(ratings)
                    res.rating = round(avgRating, 2)
        results.append(res.to_dict())
    return results
