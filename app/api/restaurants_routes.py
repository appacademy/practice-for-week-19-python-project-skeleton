from flask import Blueprint, jsonify, session, request
from app.models import User, db, Restaurant, Review
from app.forms.restaurant_form import CreateRestaurantForm
from flask_login import current_user, login_user, logout_user, login_required
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
        # menu=[]
        # for item in restaurant.menuitems:
        #     menu.append(item.to_dict())
        # return menu
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
            rating=0
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
def update_one_restaurant(id):

    form = CreateRestaurantForm()

    restaurant = Restaurant.query.get(id)

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        restaurant.address=form.data['address']
        restaurant.city=form.data['city']
        restaurant.state=form.data['state']
        restaurant.country=form.data['country']
        restaurant.name=form.data['name']
        restaurant.price=form.data['price']
        reviews = Review.query.filter(Review.restaurant_id == id)
        ratings = []
        if reviews:
            for review in reviews:
                ratings.append(review.stars)
                if len(ratings) > 0:
                    avgRating = mean(ratings)
                    restaurant.rating = round(avgRating, 2)
        db.session.commit()
        return restaurant.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Delete a Restaurant
@restaurant_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_one_restaurant(id):

    restaurant = Restaurant.query.get(id)
    if restaurant:
        db.session.delete(restaurant)
        db.session.commit()
        return {'message': 'Restaurant successfully deleted'}
    return {'error': 'Restaurant not found'}, 404
