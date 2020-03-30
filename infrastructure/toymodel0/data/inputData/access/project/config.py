import os


class BaseConfig:
    """Base configuration"""
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://%s:%s@%s/%s' % (
        os.getenv('POSTGRES_USER'),
        os.getenv('POSTGRES_PASS'),
        os.getenv('POSTGRES_HOST'),
        os.getenv('POSTGRES_DB'))
    print(SQLALCHEMY_DATABASE_URI)


class DevelopmentConfig(BaseConfig):
    """Development configuration"""
    DEBUG = True


class TestingConfig(BaseConfig):
    """Testing configuration"""
    DEBUG = True
    TESTING = True


class ProductionConfig(BaseConfig):
    """Production configuration"""
    pass


config = {"development": DevelopmentConfig,
          "testing": TestingConfig,
          "production": ProductionConfig,
          "default": DevelopmentConfig}