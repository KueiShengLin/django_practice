import django
import os
import pandas as pd
from tqdm import tqdm

if __name__ == '__main__':
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_practice.settings")  # i don't know what it doing

    django.setup()
    from weather.models import AirQuality

    air_data = pd.read_csv("../pre_2015_Air_quality_in_northern_Taiwan.csv")
    air_data = air_data.rename(index=str, columns={"PM2.5": "PM25"})

    # 之後先做好 preprocess 再灌到資料庫好了 (down!)
    columns_name = air_data.columns[:].values
    air_data['time'] = pd.to_datetime(air_data['time'])

    pbar = tqdm(air_data.values)
    for row in pbar:
        row_dict = {cn: row[i] for i, cn in enumerate(columns_name)}
        AirQuality(**row_dict).save()


