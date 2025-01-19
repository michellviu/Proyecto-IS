from django.core.exceptions import ValidationError

def no_offensive_language(value):
    # Lista de palabras ofensivas (puedes agregar más según sea necesario)
    offensive_words = ["mala", "ofensiva", "insulto"]
    # Verificar si alguna palabra ofensiva está en el comentario
    for word in offensive_words:
        if word in value.lower():
            raise ValidationError(f"La palabra '{word}' no está permitida en los comentarios.")