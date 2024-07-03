from flask import Blueprint, current_app, request

from app.services.cart_service import (create_cart, delete_cart, get_all_carts,
                                       get_carts_by_user, update_cart)

bp = Blueprint('carts', __name__)

@bp.route('/carritos', methods=['GET'])
def route_get_all_carts():
    db_config = current_app.config['DB_CONFIG']
    return get_all_carts(db_config)

@bp.route('/carritos/<int:user_id>', methods=['GET'])
def route_get_carts_by_user(user_id):
    db_config = current_app.config['DB_CONFIG']
    return get_carts_by_user(db_config, user_id)

@bp.route('/carritos/<int:cart_id>', methods=['PUT'])
def route_update_cart(cart_id):
    db_config = current_app.config['DB_CONFIG']
    datos = request.json
    return update_cart(db_config, cart_id, datos)

@bp.route('/carritos', methods=['POST'])
def route_create_cart():
    db_config = current_app.config['DB_CONFIG']
    datos = request.json
    return create_cart(db_config, datos)

@bp.route('/carritos/<int:cart_id>', methods=['DELETE'])
def route_delete_cart(cart_id):
    db_config = current_app.config['DB_CONFIG']
    return delete_cart(db_config, cart_id)