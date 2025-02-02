from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from .GraficsService import Graphics
import os


class ReportGeneration:

    def __init__(self):
        self.graphics = Graphics()

    def create_pdf(self, file_path):
        self.graphics.GraficarCalificaciones()

        p = canvas.Canvas(file_path, pagesize=A4)
        p.drawString(100, 800, "Estadísticas del Parque Infantil")
        p.drawString(100, 750, "Estadísticas de Calificaciones de Usuarios")
        image_path = os.path.join(
            os.path.dirname(__file__),
            "..",
            "media",
            "images",
            "reportes",
            "calificaciones.png",
        )
        p.drawImage(image_path, 100, 600, width=400, height=200)
        p.save()
