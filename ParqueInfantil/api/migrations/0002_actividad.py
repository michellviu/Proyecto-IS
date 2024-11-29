# Generated by Django 5.0.4 on 2024-11-29 17:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
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
                ('idI', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.instalacion')),
            ],
        ),
    ]
