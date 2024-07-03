from flask import Blueprint, current_app, jsonify, request

from app.services.cart_item_service import (add_cart_item, delete_cart_item,
                                            get_cart_items, update_cart_item)

bp = Blueprint('cart_items', __name__)

@bp.route('/carritos/<int:cart_id>/items', methods=['GET'])
def route_get_cart_items(cart_id):
    db_config = current_app.config['DB_CONFIG']
    return get_cart_items(db_config, cart_id)

@bp.route('/carritos/<int:cart_id>/items/<int:item_id>', methods=['PUT'])
def route_update_cart_item(cart_id, item_id):
    db_config = current_app.config['DB_CONFIG']
    return update_cart_item(db_config, cart_id, item_id)

@bp.route('/carritos/<int:cart_id>/items', methods=['POST'])
def route_add_cart_item(cart_id):
    db_config = current_app.config['DB_CONFIG']
    return add_cart_item(db_config, cart_id)

@bp.route('/carritos/<int:cart_id>/items/<int:item_id>', methods=['DELETE'])
def route_delete_cart_item(cart_id, item_id):
    db_config = current_app.config['DB_CONFIG']
    return delete_cart_item(db_config, cart_id, item_id)