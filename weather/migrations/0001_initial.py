# Generated by Django 2.0.2 on 2018-05-05 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AirQuality',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('station', models.CharField(max_length=50)),
                ('AMB_TEMP', models.CharField(max_length=50)),
                ('CH4', models.CharField(max_length=50)),
                ('CO', models.CharField(max_length=50)),
                ('NMHC', models.CharField(max_length=50)),
                ('NO', models.CharField(max_length=50)),
                ('NO2', models.CharField(max_length=50)),
                ('NOx', models.CharField(max_length=50)),
                ('O3', models.CharField(max_length=50)),
                ('PH_RAIN', models.CharField(max_length=50)),
                ('PM10', models.CharField(max_length=50)),
                ('PM25', models.CharField(max_length=50)),
                ('RAINFALL', models.CharField(max_length=50)),
                ('RAIN_COND', models.CharField(max_length=50)),
                ('RH', models.CharField(max_length=50)),
                ('SO2', models.CharField(max_length=50)),
                ('THC', models.CharField(max_length=50)),
                ('UVB', models.CharField(max_length=50)),
                ('WD_HR', models.CharField(max_length=50)),
                ('WIND_DIREC', models.CharField(max_length=50)),
                ('WIND_SPEED', models.CharField(max_length=50)),
                ('WS_HR', models.CharField(max_length=50)),
            ],
        ),
    ]
