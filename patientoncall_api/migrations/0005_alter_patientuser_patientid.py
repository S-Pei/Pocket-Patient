# Generated by Django 4.2.1 on 2023-06-01 01:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patientoncall_api', '0004_patientuser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientuser',
            name='patientId',
            field=models.IntegerField(default=None, primary_key=True, serialize=False),
        ),
    ]
