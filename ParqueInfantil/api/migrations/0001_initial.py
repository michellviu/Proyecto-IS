# Generated by Django 5.0.4 on 2025-01-17 16:19

import api.models.models_validations
import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Actividad',
            fields=[
                ('idA', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('edad_recomendada', models.PositiveSmallIntegerField()),
                ('num_participantes', models.PositiveIntegerField()),
                ('duracion', models.TimeField()),
                ('descripcion', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('idU', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Instalacion',
            fields=[
                ('idI', models.BigAutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('tipo', models.CharField(max_length=50)),
                ('ubicacion', models.CharField(max_length=50)),
                ('capacidad', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Actividad_programada',
            fields=[
                ('idAP', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_hora', models.DateTimeField()),
                ('idA', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.actividad')),
            ],
        ),
        migrations.CreateModel(
            name='Administrador',
            fields=[
                ('idA', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Educador',
            fields=[
                ('idE', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Padre',
            fields=[
                ('idP', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='api.usuario')),
            ],
        ),
        migrations.CreateModel(
            name='Calificacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('puntacion', models.SmallIntegerField()),
                ('fecha', models.DateField()),
                ('comentario', models.CharField(max_length=100, validators=[api.models.models_validations.no_offensive_language])),
                ('idAP', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.actividad_programada')),
                ('idU', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.usuario')),
            ],
        ),
        migrations.AddField(
            model_name='actividad',
            name='idI',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.instalacion'),
        ),
        migrations.CreateModel(
            name='Recurso',
            fields=[
                ('idR', models.AutoField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=10)),
                ('tipo', models.CharField(max_length=30)),
                ('frecuencia_uso', models.PositiveIntegerField()),
                ('idI', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.instalacion')),
            ],
        ),
        migrations.AddField(
            model_name='actividad_programada',
            name='idE',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.educador'),
        ),
        migrations.CreateModel(
            name='Reservacion',
            fields=[
                ('cod_uni', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fecha_hora', models.DateField()),
                ('estado', models.CharField(max_length=10)),
                ('num_ninos', models.PositiveIntegerField()),
                ('comentarios', models.CharField(max_length=100)),
                ('idAP', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.actividad_programada')),
                ('idP', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='api.padre')),
            ],
        ),
        migrations.AddConstraint(
            model_name='calificacion',
            constraint=models.UniqueConstraint(fields=('idU', 'idAP'), name='unique_calificacion'),
        ),
        migrations.AddConstraint(
            model_name='reservacion',
            constraint=models.UniqueConstraint(fields=('idP', 'idAP'), name='unique_reservacion'),
        ),
    ]
