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
        plt.close()
    
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
        plt.close()
    
    def Graficar_Actividades_Avg_Qualifications(self):
        
        actividades = self.stats.get_actividades_avg_qualifications()
        ids = [actividad_id for actividad_id in actividades]
        nombres = [actividades[actividad_id]['nombre'] for actividad_id in actividades]
        calificaciones = [actividades[actividad_id]['calificacion'] for actividad_id in actividades]

        fig, ax = plt.subplots(figsize=(10, 6))
        ax.axis('tight')
        ax.axis('off')
        table_data = [['ID', 'Nombre', 'Calificación']] + list(zip(ids, nombres, calificaciones))
        table = ax.table(cellText=table_data, colLabels=None, cellLoc='center', loc='center')
        table.auto_set_font_size(False)
        table.set_fontsize(10)
        table.scale(1.2, 1.2)

        path = os.path.join(
            os.path.dirname(__file__),
            "..",
            "media",
            "images",
            "reportes",
            "actividades_calificaciones.png",
        )
        plt.savefig(path)
        plt.close()
        
    def Graficar_Actividades_Mas_Participadas(self):
        
        actividades = self.stats.get_most_participated_activities()
        nombres = [actividad['nombre'] for actividad in actividades]
        participantes = [actividad['participantes'] for actividad in actividades]

        plt.figure(figsize=(10, 6))
        plt.pie(participantes, labels=nombres, autopct='%1.1f%%', startangle=140)
        plt.axis('equal')  # Asegurar que el gráfico de pastel sea circular
        plt.title('Actividades con mayor Participación')
        
        path = os.path.join(
            os.path.dirname(__file__),
            "..",
            "media",
            "images",
            "reportes",
            "actividades_participantes.png",
        )
        plt.savefig(path)
        plt.close()
    