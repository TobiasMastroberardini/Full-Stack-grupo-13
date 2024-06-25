import mysql.connector

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '0123456789',
    'database': 'checan',
    'port': '3307',
}

config_prod = {
    # configuración en producción (despliegue)
    "user": '',
    'password': '',
    'host': '',
    'database': ''
}

conn = mysql.connector.connect(**db_config)
