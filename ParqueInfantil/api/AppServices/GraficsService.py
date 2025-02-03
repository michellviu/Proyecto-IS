import os
import matplotlib.pyplot as plt
from .StatsService import Stats



class Graphics:

    def __init__(self):
        self.stats = Stats()

    def GraficarCalificaciones(self):
        puntuaciones = self.stats.CalificacionesUsuarios()
        puntuaciones_ordenadas = dict(sorted(puntuaciones.items()))

        plt.bar(puntuaciones_ordenadas.keys(), puntuaciones_ordenadas.values())
        plt.xlabel("Puntuaciones")
        plt.ylabel("Cantidad")
        plt.title("Distribución de Calificaciones de Usuarios")
        plt.xticks(list(puntuaciones_ordenadas.keys()))
        plt.yticks(range(0, max(puntuaciones_ordenadas.values()) + 1))

        path = os.path.join(
            os.path.dirname(__file__),
            "..",
            "media",
            "images",
            "reportes",
            "calificaciones.png",
        )
        plt.savefig(path)
        # plt.show()
    
    def GraficarTasaConfirmacionPorRangoEdad(self):
        
        resultados = self.stats.get_tasa_confirmacion_por_rangoedad()
        rangos = list(resultados.keys())
        confirmadas = [resultados[rango]['confirmadas'] for rango in rangos]
        canceladas = [resultados[rango]['canceladas'] for rango in rangos]
        totales = [confirmadas[i] + canceladas[i] for i in range(len(rangos))]
        
        
         # Crear el gráfico de barras para reservaciones confirmadas
        plt.figure(figsize=(10, 6))
        plt.bar(rangos, confirmadas, color='green')
        plt.xlabel('Rango de Edad')
        plt.ylabel('Reservaciones Confirmadas')
        plt.title('Reservaciones Confirmadas por Rango de Edad')
        plt.xticks(rangos)
        plt.yticks(range(0, max(confirmadas) + 1))
        # plt.show()
        
        path = os.path.join(
            os.path.dirname(__file__),
            "..",
            "media",
            "images",
            "reportes",
            "reservaciones_aceptadas.png",
        )
        plt.savefig(path)
        
        
        # Crear el gráfico de barras para reservaciones canceladas
        plt.figure(figsize=(10, 6))
        plt.bar(rangos, canceladas, color='red')
        plt.xlabel('Rango de Edad')
        plt.ylabel('Reservaciones Canceladas')
        plt.title('Reservaciones Canceladas por Rango de Edad')
        plt.xticks(rangos)
        plt.yticks(range(0, max(canceladas) + 1))
        # plt.show()
        
        
        path = os.path.join(
            os.path.dirname(__file__),
            "..",
            "media",
            "images",
            "reportes",
            "reservaciones_denegadas.png",
        )
        plt.savefig(path)
        
        
        # Crear el gráfico de barras para reservaciones totales
        plt.figure(figsize=(10, 6))
        plt.bar(rangos, totales, color='blue')
        plt.xlabel('Rango de Edad')
        plt.ylabel('Reservaciones Totales')
        plt.title('Reservaciones Totales por Rango de Edad')
        plt.xticks(rangos)
        plt.yticks(range(0, max(totales) + 1))
        # plt.show()
        
        
        path = os.path.join(
            os.path.dirname(__file__),
            "..",
            "media",
            "images",
            "reportes",
            "reservaciones_totales.png",
        )
        plt.savefig(path)
