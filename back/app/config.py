class Config:
    SECRET_KEY = 'your_secret_key'
    DEBUG = True

class DevelopmentConfig(Config):
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = '0123456789'
    MYSQL_DB = 'checan'
    MYSQL_HOST = 'localhost'
    MYSQL_PORT = 3307