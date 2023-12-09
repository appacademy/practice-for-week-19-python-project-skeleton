from flask import Blueprint, jsonify
from app.config import Config

map_routes = Blueprint('map', __name__)


@map_routes.route("/key", methods=["POST"])
def key():
    return {
        "googleMapsAPIKey": Config.GOOGLE_MAPS_API_KEY
    }
