# Generated by Django 4.0.2 on 2023-05-31 13:22

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('patientOnCall', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='patientId',
            field=models.IntegerField(default=-1, editable=False),
        ),
        migrations.AlterField(
            model_name='patient',
            name='id',
            field=models.UUIDField(default=uuid.uuid5, editable=False, primary_key=True, serialize=False),
        ),
    ]
