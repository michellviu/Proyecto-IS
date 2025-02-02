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
