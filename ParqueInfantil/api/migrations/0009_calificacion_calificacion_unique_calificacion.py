# Generated by Django 5.0.4 on 2024-11-29 22:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_reservacion_unique_together_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Calificacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('puntacion', models.SmallIntegerField()),
                ('fecha', models.DateField()),
                ('comentario', models.CharField(max_length=100)),
                ('idAP', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.actividad_programada')),
                ('idU', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.usuario')),
            ],
        ),
        migrations.AddConstraint(
            model_name='calificacion',
            constraint=models.UniqueConstraint(fields=('idU', 'idAP'), name='unique_calificacion'),
        ),
    ]
