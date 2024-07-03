import mysql.connector
from flask import jsonify, request

from app.models.cart_item import CartItem


def get_cart_items(db_config, cart_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT ci.cart_items_id, p.id AS product_id, p.name, p.price, ci.quantity
        FROM cart_items ci
        JOIN product p ON ci.product_id = p.id
        WHERE ci.cart_id = %s
        """
        cursor.execute(query, (cart_id,))
        items = cursor.fetchall()
        
        # Calcular el total del carrito
        total = sum(item['price'] * item['quantity'] for item in items)

        cursor.close()
        conn.close()

        return jsonify({'items': items, 'total': total})

    except Exception as e:
        return jsonify(error=str(e)), 500

def update_cart_item(db_config, cart_id, item_id):
    try:
        datos = request.json
        quantity = datos.get('quantity')

        if not quantity:
            return jsonify({'error': 'Datos incompletos'}), 400

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "UPDATE cart_items SET quantity = %s WHERE cart_id = %s AND cart_items_id = %s"
        cursor.execute(query, (quantity, cart_id, item_id))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Item de carrito actualizado correctamente'})

    except Exception as e:
        return jsonify(error=str(e)), 500

def add_cart_item(db_config, cart_id):
    try:
        datos = request.json
        product_id = datos.get('product_id')
        quantity = datos.get('quantity')

        if not product_id or not quantity:
            return jsonify({'error': 'Datos incompletos'}), 400

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Verificar si el producto ya existe en el carrito
        query_check = "SELECT quantity FROM cart_items WHERE cart_id = %s AND product_id = %s"
        cursor.execute(query_check, (cart_id, product_id))
        result = cursor.fetchone()

        if result:
            # Si el producto ya existe, actualizar la cantidad
            new_quantity = result[0] + quantity
            query_update = "UPDATE cart_items SET quantity = %s WHERE cart_id = %s AND product_id = %s"
            cursor.execute(query_update, (new_quantity, cart_id, product_id))
        else:
            # Si el producto no existe, insertar un nuevo registro
            query_insert = "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (%s, %s, %s)"
            cursor.execute(query_insert, (cart_id, product_id, quantity))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Item de carrito agregado correctamente'}), 201

    except Exception as e:
        return jsonify(error=str(e)), 500

def delete_cart_item(db_config, cart_id, item_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "DELETE FROM cart_items WHERE cart_id = %s AND cart_items_id = %s"
        cursor.execute(query, (cart_id, item_id))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Item de carrito eliminado correctamente'})

    except Exception as e:
        return jsonify(error=str(e)), 500