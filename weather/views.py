from django.shortcuts import render
from weather.models import AirQuality
from django.http import HttpResponse

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
    attribute_list = [meta_data.name for meta_data in AirQuality._meta.get_fields()]

    return render(request, 'visualization.html', {"station_list": station_list, "attribute_list": attribute_list})

