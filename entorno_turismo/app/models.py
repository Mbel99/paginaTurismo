from app.database import get_db

class Contacto:
    
    def __init__(self, id=None, nombre=None, apellido=None, correo_electronico=None, pais=None, telefono=None, asunto=None, mensaje=None, fecha=None):
        self.id = id
        self.nombre = nombre
        self.apellido = apellido
        self.correo_electronico = correo_electronico
        self.pais = pais
        self.telefono = telefono
        self.asunto = asunto
        self.mensaje = mensaje
        self.fecha = fecha

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id:
            cursor.execute("""
                UPDATE contacto SET nombre = %s, apellido = %s, correo_electronico = %s, pais = %s, telefono = %s, asunto = %s, mensaje = %s, fecha = %s
                WHERE id = %s
            """, (self.nombre, self.apellido, self.correo_electronico, self.pais, self.telefono, self.asunto, self.mensaje, self.fecha, self.id))
        else:
            cursor.execute("""
                INSERT INTO contacto (nombre, apellido, correo_electronico, pais, telefono, asunto, mensaje, fecha) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (self.nombre, self.apellido, self.correo_electronico, self.pais, self.telefono, self.asunto, self.mensaje, self.fecha))
            self.id = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM contacto")
        rows = cursor.fetchall()
        contactos = [Contacto(id=row[0], nombre=row[1], apellido=row[2], correo_electronico=row[3], pais=row[4], telefono=row[5], asunto=row[6], mensaje=row[7], fecha=row[8]) for row in rows]
        cursor.close()
        return contactos

    @staticmethod
    def get_by_id(contacto_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM contacto WHERE id = %s", (contacto_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Contacto(id=row[0], nombre=row[1], apellido=row[2], correo_electronico=row[3], pais=row[4], telefono=row[5], asunto=row[6], mensaje=row[7], fecha=row[8])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM contacto WHERE id = %s", (self.id,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'correo_electronico': self.correo_electronico,
            'pais': self.pais,
            'telefono': self.telefono,
            'asunto': self.asunto,
            'mensaje': self.mensaje,
            'fecha': self.fecha.strftime('%Y-%m-%d') if self.fecha else None
        }
