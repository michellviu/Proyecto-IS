from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from .GraficsService import Graphics
import os
import matplotlib
matplotlib.use('Agg')

class ReportGeneration:

    def __init__(self):
        self.graphics = Graphics()

    def create_pdf(self, file_path):
        self.graphics.GraficarCalificaciones()
        self.graphics.GraficarTasaConfirmacionPorRangoEdad()

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
        p.drawImage(image_path, 100, 500, width=400, height=200)
        
        p.drawString(100, 450, "Estadísticas de Reservaciones Confirmadas por Rango de Edad")
        confirmadas_image_path = os.path.join(
            os.path.dirname(__file__),
            "..",
            "media",
            "images",
            "reportes",
            "reservaciones_aceptadas.png",
           
        )
        p.drawImage(confirmadas_image_path, 100, 200, width=400, height=200)
        
        
        # Finalizar la segunda página y comenzar una nueva
        p.showPage()

    # Agregar el gráfico de reservaciones canceladas
        p.drawString(100, 800, "Estadísticas de Reservaciones Canceladas por Rango de Edad")
        canceladas_image_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "media",
        "images",
        "reportes",
        "reservaciones_denegadas.png",
         )
        
        p.drawImage(canceladas_image_path, 100, 550, width=400, height=200)
   

    # Agregar el gráfico de reservaciones totales
        p.drawString(100, 450, "Estadísticas de Reservaciones Totales por Rango de Edad")
        totales_image_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "media",
        "images",
        "reportes",
        "reservaciones_totales.png",
         )
   
        p.drawImage(totales_image_path, 100, 200, width=400, height=200)
 
        
        
        
        
        p.save()
