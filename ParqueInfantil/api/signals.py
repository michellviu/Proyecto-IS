from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.conf import settings
from django.contrib.auth import get_user_model
from api.models.usuario import Administrador
from api.models.usuario import Usuario

Usuario = get_user_model()

@receiver(post_migrate)
def create_default_admin(sender, **kwargs):
    if not Usuario.objects.filter(rol='admin').exists():
       admin_user = Usuario.objects.create_superuser(
            username='admin',
            email='admin@admin.com',
            password='admin@123',
            rol='admin',
            role_confirmation=True
        )
       Administrador.objects.create(idA=admin_user)