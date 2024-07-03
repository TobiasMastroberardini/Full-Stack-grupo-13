import mysql.connector
from flask import jsonify, request
from werkzeug.security import generate_password_hash

from app.models.user import User


def get_all_users(db_config):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM user"
        cursor.execute(query)
        users = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(users)

    except Exception as e:
        return jsonify(error=str(e)), 500

def get_user(db_config, user_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM user WHERE user_id = %s"
        cursor.execute(query, (user_id,))
        user = cursor.fetchone()

        cursor.close()
        conn.close()

        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        return jsonify(user)

    except Exception as e:
        return jsonify(error=str(e)), 500

def update_user(db_config, user_id):
    try:
        datos = request.json

        name = datos.get('name')
        last_name = datos.get('last_name')
        phone = datos.get('phone')
        email = datos.get('email')
        password = datos.get('password')
        is_admin = datos.get('is_admin')

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = """
        UPDATE user
        SET name = %s, last_name = %s, phone = %s, email = %s, password = %s, is_admin = %s
        WHERE user_id = %s
        """
        cursor.execute(query, (name, last_name, phone, email, password, is_admin, user_id))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Usuario actualizado correctamente'})

    except Exception as e:
        return jsonify(error=str(e)), 500

def create_user(db_config):
    try:
        datos = request.json
        name = datos.get('name')
        last_name = datos.get('last_name')
        phone = datos.get('phone')
        email = datos.get('email')
        password = datos.get('password')
        is_admin = datos.get('is_admin', False)

        if not name or not email or not last_name or not phone or not password:
            return jsonify({'error': 'Datos incompletos'}), 400

        # Hashear la contraseña antes de almacenarla
        hashed_password = generate_password_hash(password)

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = """
        INSERT INTO user (name, last_name, phone, email, password, is_admin)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (name, last_name, phone, email, hashed_password, is_admin))

        conn.commit()
        user_id = cursor.lastrowid

        cursor.close()
        conn.close()

        return jsonify({'message': 'Usuario creado correctamente', 'user_id': user_id}), 201

    except mysql.connector.Error as mysql_error:
        return jsonify({'error': 'Error de MySQL: {}'.format(mysql_error)}), 500

def delete_user(db_config, user_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "DELETE FROM user WHERE user_id = %s"
        cursor.execute(query, (user_id,))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Usuario eliminado correctamente'})

    except Exception as e:
        return jsonify(error=str(e)), 500