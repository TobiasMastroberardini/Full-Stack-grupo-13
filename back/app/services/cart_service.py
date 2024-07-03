import mysql.connector
from flask import jsonify


def get_all_carts(db_config):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM cart"
        cursor.execute(query)
        carritos = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(carritos)

    except Exception as e:
        return jsonify(error=str(e)), 500

def get_carts_by_user(db_config, user_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM cart WHERE user_id = %s"
        cursor.execute(query, (user_id,))
        carritos = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(carritos)

    except Exception as e:
        return jsonify(error=str(e)), 500

def update_cart(db_config, cart_id, datos):
    try:
        estado = datos.get('estado')

        if not estado:
            return jsonify({'error': 'Datos incompletos'}), 400

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "UPDATE cart SET estado = %s WHERE id = %s"
        cursor.execute(query, (estado, cart_id))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Carrito actualizado correctamente'})

    except Exception as e:
        return jsonify(error=str(e)), 500

def create_cart(db_config, datos):
    try:
        user_id = datos.get('user_id')

        if not user_id:
            return jsonify({'error': 'Datos incompletos'}), 400

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "INSERT INTO cart (user_id) VALUES (%s)"
        cursor.execute(query, (user_id,))

        conn.commit()
        cart_id = cursor.lastrowid

        cursor.close()
        conn.close()

        return jsonify({'message': 'Carrito creado correctamente', 'cart_id': cart_id}), 201

    except Exception as e:
        return jsonify(error=str(e)), 500

def delete_cart(db_config, cart_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query_delete_items = "DELETE FROM cart_items WHERE cart_id = %s"
        cursor.execute(query_delete_items, (cart_id,))

        query_delete_cart = "DELETE FROM cart WHERE id = %s"
        cursor.execute(query_delete_cart, (cart_id,))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Carrito eliminado correctamente'})

    except Exception as e:
        return jsonify(error=str(e)), 500