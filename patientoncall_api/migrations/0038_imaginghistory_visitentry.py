# Generated by Django 4.2.1 on 2023-06-17 14:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('patientoncall_api', '0037_labhistory_visitentry'),
    ]

    operations = [
        migrations.AddField(
            model_name='imaginghistory',
            name='visitEntry',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='patientoncall_api.medicalhistory'),
        ),
    ]
