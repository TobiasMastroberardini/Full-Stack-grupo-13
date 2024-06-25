import mysql.connector
from flask import Flask, jsonify, request

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '0123456789',
    'database': 'checan',
    'port': '3307',
}

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!'

# PRODUCTOS

# Ruta para obtener todos los productos
@app.route('/productos', methods=['GET'])
def get_productos():
    try:
        # Establecer conexión a la base de datos
        conn = mysql.connector.connect(**db_config)

        # Crear cursor para ejecutar consultas
        cursor = conn.cursor(dictionary=True)

        # Ejecutar consulta para obtener todos los productos
        cursor.execute("SELECT * FROM product")
        productos = cursor.fetchall()

        # Cerrar cursor y conexión
        cursor.close()
        conn.close()

        # Devolver los productos como respuesta JSON
        return jsonify(productos)

    except Exception as e:
        return jsonify(error=str(e))

# Ruta para obtener un producto por su ID
@app.route('/productos/<int:producto_id>', methods=['GET'])
def get_producto(producto_id):
    try:
        # Establecer conexión a la base de datos
        conn = mysql.connector.connect(**db_config)

        # Crear cursor para ejecutar consultas
        cursor = conn.cursor(dictionary=True)

        # Ejecutar consulta para obtener el producto por su ID
        query = "SELECT * FROM product WHERE id = %s"
        cursor.execute(query, (producto_id,))
        producto = cursor.fetchone()

        # Cerrar cursor y conexión
        cursor.close()
        conn.close()

        # Si el producto no existe, devolver un mensaje de error
        if not producto:
            return jsonify({'error': 'Producto no encontrado'}), 404

        # Devolver el producto encontrado como respuesta JSON
        return jsonify(producto)

    except Exception as e:
        return jsonify(error=str(e))

# Ruta para actualizar un producto por su ID
@app.route('/productos/<int:producto_id>', methods=['PUT'])
def update_producto(producto_id):
    try:
        # Obtener datos del producto desde el request
        datos = request.json

        # Validar datos (se asume que los datos contienen los campos de la tabla)
        campos = ['name', 'price', 'description', 'image', 'clearance', 'quantity', 'stock', 'url', 'category', 'openPackage']
        valores = [datos.get(campo) for campo in campos]

        if not all(valores):
            return jsonify({'error': 'Datos incompletos'}), 400

        # Establecer conexión a la base de datos
        conn = mysql.connector.connect(**db_config)

        # Crear cursor para ejecutar consultas
        cursor = conn.cursor()

        # Ejecutar consulta para actualizar el producto
        query = """
            UPDATE product SET name = %s, price = %s, description = %s, image = %s, clearance = %s,
            quantity = %s, stock = %s, url = %s, category = %s, openPackage = %s WHERE id = %s
        """
        cursor.execute(query, (*valores, producto_id))

        # Confirmar cambios
        conn.commit()

        # Cerrar cursor y conexión
        cursor.close()
        conn.close()

        # Devolver una respuesta exitosa
        return jsonify({'message': 'Producto actualizado correctamente'})

    except Exception as e:
        return jsonify(error=str(e))

# Ruta para agregar un nuevo producto
@app.route('/productos', methods=['POST'])
def add_producto():
    try:
        # Obtener datos del producto desde el request
        datos = request.json

        # Validar datos (se asume que los datos contienen los campos de la tabla)
        campos = ['name', 'price', 'description', 'image', 'clearance', 'quantity', 'stock', 'url', 'category', 'openPackage']
        valores = [datos.get(campo) for campo in campos]
        
        for campo in campos:
            datos.get(campo)
            if datos == None:
                return jsonify({'error': 'Datos incompletos'}), 400

        # Establecer conexión a la base de datos
        conn = mysql.connector.connect(**db_config)

        # Crear cursor para ejecutar consultas
        cursor = conn.cursor()

        # Ejecutar consulta para insertar el nuevo producto
        query = """
            INSERT INTO product (name, price, description, image, clearance, quantity, stock, url, category, openPackage)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, valores)

        # Confirmar cambios
        conn.commit()

        # Obtener el ID del nuevo producto insertado
        nuevo_id = cursor.lastrowid

        # Cerrar cursor y conexión
        cursor.close()
        conn.close()

        # Devolver una respuesta exitosa con el ID del nuevo producto
        return jsonify({'message': 'Producto creado correctamente', 'id': nuevo_id})

    except Exception as e:
        return jsonify(error=str(e))

# Ruta para eliminar un producto por su ID
@app.route('/productos/<int:producto_id>', methods=['DELETE'])
def delete_producto(producto_id):
    try:
        # Establecer conexión a la base de datos
        conn = mysql.connector.connect(**db_config)

        # Crear cursor para ejecutar consultas
        cursor = conn.cursor()

        # Ejecutar consulta para eliminar el producto
        query = "DELETE FROM product WHERE id = %s"
        cursor.execute(query, (producto_id,))

        # Confirmar cambios
        conn.commit()

        # Cerrar cursor y conexión
        cursor.close()
        conn.close()

        # Si no se eliminó ninguna fila, el producto no existía
        if cursor.rowcount == 0:
            return jsonify({'error': 'Producto no encontrado'}), 404

        # Devolver una respuesta exitosa
        return jsonify({'message': 'Producto eliminado correctamente'})

    except Exception as e:
        return jsonify(error=str(e))
    
# CARRITO

@app.route('/carritos', methods=['GET'])
def get_all_carts():
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


@app.route('/carritos/<int:user_id>', methods=['GET'])
def get_carts_by_user(user_id):
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

@app.route('/carritos/<int:cart_id>', methods=['PUT'])
def update_cart(cart_id):
    try:
        datos = request.json

        # Aquí se podrían incluir más campos para actualizar, como 'estado' por ejemplo
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

@app.route('/carritos', methods=['POST'])
def create_cart():
    try:
        # Obtener datos del request (en este caso, solo user_id)
        datos = request.json
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

@app.route('/carritos/<int:cart_id>', methods=['DELETE'])
def delete_cart(cart_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Primero, eliminar todos los items del carrito
        query_delete_items = "DELETE FROM cart_items WHERE cart_id = %s"
        cursor.execute(query_delete_items, (cart_id,))

        # Luego, eliminar el carrito
        query_delete_cart = "DELETE FROM cart WHERE id = %s"
        cursor.execute(query_delete_cart, (cart_id,))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Carrito eliminado correctamente'})

    except Exception as e:
        return jsonify(error=str(e)), 500

# CART ITEMS

@app.route('/carritos/<int:cart_id>/items', methods=['GET'])
def get_cart_items(cart_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        query = """
        SELECT ci.cart_item_id, p.id AS product_id, p.name, p.price, ci.quantity
        FROM cart_items ci
        JOIN product p ON ci.product_id = p.id
        WHERE ci.cart_id = %s
        """
        cursor.execute(query, (cart_id,))
        items = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(items)

    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/carritos/<int:cart_id>/items/<int:item_id>', methods=['PUT'])
def update_cart_item(cart_id, item_id):
    try:
        datos = request.json
        quantity = datos.get('quantity')

        if not quantity:
            return jsonify({'error': 'Datos incompletos'}), 400

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "UPDATE cart_items SET quantity = %s WHERE cart_id = %s AND id = %s"
        cursor.execute(query, (quantity, cart_id, item_id))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Item de carrito actualizado correctamente'})

    except Exception as e:
        return jsonify(error=str(e)), 500


@app.route('/carritos/<int:cart_id>/items', methods=['POST'])
def add_cart_item(cart_id):
    try:
        datos = request.json
        product_id = datos.get('product_id')
        quantity = datos.get('quantity')

        if not product_id or not quantity:
            return jsonify({'error': 'Datos incompletos'}), 400

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (%s, %s, %s)"
        cursor.execute(query, (cart_id, product_id, quantity))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Item de carrito creado correctamente'}), 201

    except Exception as e:
        return jsonify(error=str(e)), 500


@app.route('/carritos/<int:cart_id>/items/<int:item_id>', methods=['DELETE'])
def delete_cart_item(cart_id, item_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = "DELETE FROM cart_items WHERE cart_id = %s AND id = %s"
        cursor.execute(query, (cart_id, item_id))

        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Item de carrito eliminado correctamente'})

    except Exception as e:
        return jsonify(error=str(e)), 500


# USERS

@app.route('/users', methods=['GET'])
def get_all_users():
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


@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
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


@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
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


@app.route('/users', methods=['POST'])
def create_user():
    try:
        datos = request.json
        name = datos.get('name')
        last_name = datos.get('last_name')
        phone = datos.get('phone')
        email = datos.get('email')
        password = datos.get('password')
        is_admin = datos.get('is_admin', False)

        if not name or not email or not password:
            return jsonify({'error': 'Datos incompletos'}), 400

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = """
        INSERT INTO user (name, last_name, phone, email, password, is_admin)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (name, last_name, phone, email, password, is_admin))

        conn.commit()
        user_id = cursor.lastrowid

        cursor.close()
        conn.close()

        return jsonify({'message': 'Usuario creado correctamente', 'user_id': user_id}), 201

    except Exception as e:
        return jsonify(error=str(e)), 500


@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
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


if __name__ == '__main__':
    app.run(debug=True)