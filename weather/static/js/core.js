// 代辦事項
// station有自己的顏色
// 滑鼠過去有神秘直線
// 看一下人家怎麼人多條線顯示得比較好
var station = 'Banqiao';
var attribute = 'AMB_TEMP';
var selectValue, selectTime;
var color = ['rgba(255, 172, 0, 0.8)', 'rgba(12, 12, 34, 0.8)','rgba(255, 0, 0, 0.8)','rgba(0, 255, 0, 0.8)','rgba(0, 0, 255, 0.8)']
    coclorCount = 0;

$.getScript("/static/js/TimeChart.js", function(){
    $.ajax({
        url: "/weather/station_change",
        data: {
            "select_station_value": station,
            "select_attribute_value": attribute
        },
        dataType: "json",
        async: true,
        success: function(returnData) {
            plotLine(returnData, '.first_plot');
            plotLine(returnData, '.second_plot');
            // 黑人問號，為什麼第一次做比例尺會亂掉
            d3.select('.first_plot #time_chart_div #time_chart_svg #line').remove();
            d3.select('.first_plot #time_chart_div #time_chart_svg').append('g').attr('id', 'line');
            plotLine(returnData, '.first_plot');
        },
        error: function(xhr, ts, et) {
            alert(et);
        }
    });
});

$.getScript("/static/js/PlotControl.js");
