from django.db import models
import pandas as pd
import sqlite3

# Create your models here.
# class AirQuality(models.Model):

con = sqlite3.connect("../test.sqlite3")
air_data = pd.read_csv("../2015_Air_quality_in_northern_Taiwan.csv")
air_data.to_sql("air_quailty", con, if_exists="append", index=False)