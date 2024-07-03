from flask import Blueprint, current_app, jsonify, request

from ..services import product_service

bp = Blueprint('product_routes', __name__)

@bp.route('/productos', methods=['GET'])
def get_productos():
    db_config = current_app.config['DB_CONFIG']
    productos = product_service.get_all_products(db_config)
    return jsonify(productos)

@bp.route('/productos/<int:producto_id>', methods=['GET'])
def get_producto(producto_id):
    db_config = current_app.config['DB_CONFIG']
    producto = product_service.get_product_by_id(db_config, producto_id)
    return jsonify(producto)

@bp.route('/productos/categorias', methods=['GET'])
def get_productos_por_categoria():
    db_config = current_app.config['DB_CONFIG']
    productos = product_service.get_products_by_category(db_config)
    return jsonify(productos)

@bp.route('/productos/categorias/<string:categoria>', methods=['GET'])
def get_productos_por_categoria_especifica(categoria):
    db_config = current_app.config['DB_CONFIG']
    productos = product_service.get_products_by_specific_category(db_config, categoria)
    return jsonify(productos)

@bp.route('/productos/<int:producto_id>', methods=['PUT'])
def update_producto(producto_id):
    db_config = current_app.config['DB_CONFIG']
    datos = request.json
    result = product_service.update_product(db_config, producto_id, datos)
    return jsonify(result)

@bp.route('/productos', methods=['POST'])
def add_producto():
    db_config = current_app.config['DB_CONFIG']
    datos = request.json
    result = product_service.add_product(db_config, datos)
    return jsonify(result)

@bp.route('/productos/<int:producto_id>', methods=['DELETE'])
def delete_producto(producto_id):
    db_config = current_app.config['DB_CONFIG']
    result = product_service.delete_product(db_config, producto_id)
    return jsonify(result)