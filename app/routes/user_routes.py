from flask import Blueprint, current_app, jsonify, request

from app.services.user_service import (create_user, delete_user, get_all_users,
                                       get_user, update_user)

bp = Blueprint('users', __name__)

@bp.route('/users', methods=['GET'])
def route_get_all_users():
    db_config = current_app.config['DB_CONFIG']
    return get_all_users(db_config)

@bp.route('/users/<int:user_id>', methods=['GET'])
def route_get_user(user_id):
    db_config = current_app.config['DB_CONFIG']
    return get_user(db_config, user_id)

@bp.route('/users/<int:user_id>', methods=['PUT'])
def route_update_user(user_id):
    db_config = current_app.config['DB_CONFIG']
    return update_user(db_config, user_id)

@bp.route('/users', methods=['POST'])
def route_create_user():
    db_config = current_app.config['DB_CONFIG']
    return create_user(db_config)

@bp.route('/users/<int:user_id>', methods=['DELETE'])
def route_delete_user(user_id):
    db_config = current_app.config['DB_CONFIG']
    return delete_user(db_config, user_id)