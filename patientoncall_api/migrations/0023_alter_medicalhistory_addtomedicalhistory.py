# Generated by Django 4.2.1 on 2023-06-10 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patientoncall_api', '0022_alter_medicalhistory_addtomedicalhistory'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicalhistory',
            name='addToMedicalHistory',
            field=models.BooleanField(default=True),
        ),
    ]
