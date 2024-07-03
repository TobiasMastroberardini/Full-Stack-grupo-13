from flask import Flask
from flask_cors import CORS

from .config import DevelopmentConfig
from .routes import cart_items_routes, cart_routes, product_routes, user_routes


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    app.config['DB_CONFIG'] = {
        'user': app.config['MYSQL_USER'],
        'password': app.config['MYSQL_PASSWORD'],
        'host': app.config['MYSQL_HOST'],
        'database': app.config['MYSQL_DB'],
        'port': app.config['MYSQL_PORT']
    }

    # Habilitar CORS para todas las rutas
    CORS(app)

    # Registrar los Blueprints
    app.register_blueprint(product_routes.bp)
    app.register_blueprint(cart_routes.bp)
    app.register_blueprint(cart_items_routes.bp)
    app.register_blueprint(user_routes.bp)

    
    return app