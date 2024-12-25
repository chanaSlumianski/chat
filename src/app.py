from flask import Flask
from flask_cors import CORS

from routes.documents import documents


def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True)

    app.register_blueprint(documents)
    
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=8080, debug=True)
