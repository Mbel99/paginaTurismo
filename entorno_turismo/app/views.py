from flask import Flask, jsonify, request
from flask_cors import CORS
from app.models import Contacto

app = Flask(__name__)
CORS(app)  # Esto habilita CORS en toda la aplicación

@app.route('/')
def index():
    return jsonify({'message': 'Hello World API Turismo'})

@app.route('/api/contactos', methods=['POST'])
def create_contacto():
    data = request.json
    new_contacto = Contacto(nombre=data['nombre'], apellido=data['apellido'], correo_electronico=data['correo_electronico'], pais=data['pais'], telefono=data['telefono'], asunto=data['asunto'], mensaje=data['mensaje'], fecha=data['fecha'])
    new_contacto.save()
    return jsonify({'message': 'Consulta creada exitosamente'}), 201

@app.route('/api/contactos', methods=['GET'])
def get_all_contactos():
    contactos = Contacto.get_all()
    return jsonify([contacto.serialize() for contacto in contactos])

@app.route('/api/contactos/<int:contacto_id>', methods=['GET'])
def get_contacto(contacto_id):
    contacto = Contacto.get_by_id(contacto_id)
    if not contacto:
        return jsonify({'message': 'Consulta no encontrada'}), 404
    return jsonify(contacto.serialize())

@app.route('/api/contactos/<int:contacto_id>', methods=['PUT'])
def update_contacto(contacto_id):
    contacto = Contacto.get_by_id(contacto_id)
    if not contacto:
        return jsonify({'message': 'Consulta no encontrada'}), 404
    data = request.json
    contacto.nombre = data['nombre']
    contacto.apellido = data['apellido']
    contacto.correo_electronico = data['correo_electronico']
    contacto.pais = data['pais']
    contacto.telefono = data['telefono']
    contacto.asunto = data['asunto']
    contacto.mensaje = data['mensaje']
    contacto.fecha = data['fecha']
    contacto.save()
    return jsonify({'message': 'Consulta actualizada exitosamente'})

@app.route('/api/contactos/<int:contacto_id>', methods=['DELETE'])
def delete_contacto(contacto_id):
    contacto = Contacto.get_by_id(contacto_id)
    if not contacto:
        return jsonify({'message': 'Consulta no encontrada'}), 404
    contacto.delete()
    return jsonify({'message': 'Consulta eliminada exitosamente'})

if __name__ == '__main__':
    app.run(debug=True)
