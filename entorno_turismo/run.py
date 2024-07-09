from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *

app = Flask(__name__)

# Inicializar la base de datos con la aplicación Flask
init_app(app)

# Permitir solicitudes desde cualquier origen
CORS(app)
# También puedes permitir solicitudes desde un origen específico usando:
# CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5000"}})

# Rutas para el CRUD de la entidad Contacto
app.route('/', methods=['GET'])(index)
app.route('/api/contactos/', methods=['POST'])(create_contacto)
app.route('/api/contactos/', methods=['GET'])(get_all_contactos)
app.route('/api/contactos/<int:contacto_id>', methods=['GET'])(get_contacto)
app.route('/api/contactos/<int:contacto_id>', methods=['PUT'])(update_contacto)
app.route('/api/contactos/<int:contacto_id>', methods=['DELETE'])(delete_contacto)

if __name__ == '__main__':
    app.run(debug=True)
