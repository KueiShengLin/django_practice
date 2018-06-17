from django.shortcuts import render
from weather.models import AirQuality
from django.http import JsonResponse
import pandas as pd

# Create your views here.
"""
    values : 傳你給定的column 回來，用字典的型態 [{id:1},{id:2},...]
    values_list : 同values 但是是用list的型態 [[1],[2],...] ，如果flat = True 則是single value [1,2,...]
    distinct : 同sql SELECT DISTINCT 找出unique 的值
    get / filter : 同SQL SELECT get傳單一 filter傳多值
    _meta : 存model的原數據(描述資料資訊的資料)? _meta.get_fields 可以抓到column name
"""


def menu(request):
    station_list = AirQuality.objects.values_list('station', flat=True).distinct()
    attribute_list = [meta_data.name for meta_data in AirQuality._meta.get_fields()][3:]

    return render(request, 'visualization.html', {"station_list": station_list, "attribute_list": attribute_list})


def init_scale_size(attribute):
    attribute_data = AirQuality.objects.values_list(attribute, flat=True)
    max_value = max(attribute_data)
    min_value = min(attribute_data)

    # attribute_data = AirQuality.objects.values_list(attribute, flat=True)
    # attribute_info = AirQuality.objects.values("station", "time", attribute)
    #
    # max_value_index = list(attribute_data).index(max(attribute_data))
    # max_value_time = str(attribute_info[max_value_index]['time'].year) + \
    #                  "-" + str(attribute_info[max_value_index]['time'].month) + \
    #                  "-" + str(attribute_info[max_value_index]['time'].day)
    #
    # max_value_station_data = pd.DataFrame(list(attribute_info))
    # max_value_station_data.index = max_value_station_data['time']
    # del max_value_station_data['time']
    #
    # max_value_station_data = max_value_station_data.resample('D').mean().dropna()  # 依照"D"(天) 重新間隔 再把nan的直接滅了
    #
    # min_value = min(attribute_data)
    # max_value = max_value_station_data.loc[max_value_time]
    return min_value, max_value


def return_station(request):
    station = str(request.GET.get("select_station_value"))
    attribute = str(request.GET.get("select_attribute_value"))

    station_data = AirQuality.objects.filter(station=station)
    station_data = pd.DataFrame(list(station_data.values()))
    station_data.index = station_data['time']
    del station_data['time']
    station_data = station_data.resample('D').mean().dropna()  # 依照"D"(天) 重新間隔 再把nan的直接滅了

    user_request_time = list(station_data.index)
    user_request_data = list(station_data[attribute])

    min_value, max_value = init_scale_size(attribute)

    return_data = {"user_request_data": user_request_data, "user_request_time": user_request_time,
                   "min_value": min_value, "max_value": max_value}

    return JsonResponse(return_data)


#
