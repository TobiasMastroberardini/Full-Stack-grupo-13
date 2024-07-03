import mysql.connector
from flask import jsonify
from mysql.connector import Error


def get_all_products(db_config):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM product")
        products = cursor.fetchall()
        cursor.close()
        conn.close()
        return products
    except Error as e:
        return {'error': str(e)}

def get_product_by_id(db_config, product_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM product WHERE id = %s", (product_id,))
        product = cursor.fetchone()
        cursor.close()
        conn.close()
        if not product:
            return {'error': 'Producto no encontrado'}, 404
        return product
    except Error as e:
        return {'error': str(e)}

def get_products_by_category(db_config):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT id, name, price, description, image, clearance, quantity, stock, url, category, openPackage
        FROM product
        ORDER BY category
        """
        cursor.execute(query)
        products = cursor.fetchall()
        categorias_productos = {}
        for product in products:
            category = product['category']
            if category not in categorias_productos:
                categorias_productos[category] = []
            categorias_productos[category].append(product)
        cursor.close()
        conn.close()
        return categorias_productos
    except Error as e:
        return {'error': str(e)}, 500

def get_products_by_specific_category(db_config, category):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        query = """
        SELECT id, name, price, description, image, clearance, quantity, stock, url, category, openPackage
        FROM product
        WHERE category = %s
        """
        cursor.execute(query, (category,))
        products = cursor.fetchall()
        cursor.close()
        conn.close()
        return products
    except Error as e:
        return {'error': str(e)}, 500

def update_product(db_config, product_id, data):
    try:
        fields = ['name', 'price', 'description', 'image', 'clearance', 'quantity', 'stock', 'url', 'category', 'openPackage']
        values = [data.get(field) for field in fields]
        for value in values:
            if value is None:
                return {'error': 'Datos incompletos'}, 400
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        query = """
            UPDATE product SET name = %s, price = %s, description = %s, image = %s, clearance = %s,
            quantity = %s, stock = %s, url = %s, category = %s, openPackage = %s WHERE id = %s
        """
        cursor.execute(query, (*values, product_id))
        conn.commit()
        cursor.close()
        conn.close()
        return {'message': 'Producto actualizado correctamente'}
    except Error as e:
        return {'error': str(e)}

def add_product(db_config, data):
    try:
        fields = ['name', 'price', 'description', 'image', 'clearance', 'quantity', 'stock', 'url', 'category', 'openPackage']
        values = [data.get(field) for field in fields]
        for value in values:
            if value is None:
                return {'error': 'Datos incompletos'}, 400
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        query = """
            INSERT INTO product (name, price, description, image, clearance, quantity, stock, url, category, openPackage)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, values)
        conn.commit()
        new_id = cursor.lastrowid
        cursor.close()
        conn.close()
        return {'message': 'Producto creado correctamente', 'id': new_id}
    except Error as e:
        return {'error': str(e)}

def delete_product(db_config, product_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM product WHERE id = %s", (product_id,))
        conn.commit()
        cursor.close()
        conn.close()
        if cursor.rowcount == 0:
            return {'error': 'Producto no encontrado'}, 404
        return {'message': 'Producto eliminado correctamente'}
    except Error as e:
        return {'error': str(e)}