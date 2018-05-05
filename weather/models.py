from django.db import models
import pandas as pd
import sqlite3


# Create your models here.
class AirQuality(models.Model):
    time = models.DateTimeField()
    station = models.CharField(max_length=50)
    AMB_TEMP = models.FloatField()
    CH4 = models.FloatField()
    CO = models.FloatField()
    NMHC = models.FloatField()
    NO = models.FloatField()
    NO2 = models.FloatField()
    NOx = models.FloatField()
    O3 = models.FloatField()
    PH_RAIN = models.FloatField()
    PM10 = models.FloatField()
    PM25 = models.FloatField()
    RAINFALL = models.FloatField()
    RAIN_COND = models.FloatField()
    RH = models.FloatField()
    SO2 = models.FloatField()
    THC = models.FloatField()
    UVB = models.FloatField()
    WD_HR = models.FloatField()
    WIND_DIREC = models.FloatField()
    WIND_SPEED = models.FloatField()
    WS_HR = models.FloatField()

    def __str__(self):
        return self.station + ' ' + str(self.time)


# def csv_to_sqlite():
#     con = sqlite3.connect("../db.sqlite3")
#
#     air_data.to_sql("air_quailty", con, if_exists="append", index=False)
#
#
# if __name__ == '__main__':
#     csv_to_sqlite()
#     print("convert down")
#