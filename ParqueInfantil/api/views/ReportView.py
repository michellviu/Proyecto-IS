from reportlab.lib.pagesizes import A4
from django.http import HttpResponse
import os
from rest_framework.views import APIView
from ..AppServices.ReportGeneration import ReportGeneration


class ReportView(APIView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.report_generation = ReportGeneration()

    def get(self, request, *args, **kwargs):
        pdf_path = os.path.join(
            os.path.dirname(__file__), "..", "media", "pdfs", "estadisticas.pdf"
        )
        self.report_generation.create_pdf(pdf_path)
        with open(pdf_path, "rb") as pdf_file:
            response = HttpResponse(pdf_file.read(), content_type="application/pdf")
            response["Content-Disposition"] = 'attachment; filename="estadisticas.pdf"'
        return response
