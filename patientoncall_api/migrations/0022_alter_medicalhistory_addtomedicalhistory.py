# Generated by Django 4.2.1 on 2023-06-10 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patientoncall_api', '0021_alter_medicalhistory_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicalhistory',
            name='addToMedicalHistory',
            field=models.BooleanField(default=False),
        ),
    ]
