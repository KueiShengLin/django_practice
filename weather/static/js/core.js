// 代辦事項
// station有自己的顏色(down)
// 滑鼠過去有神秘直線
// 看一下人家怎麼人多條線顯示得比較好
var station = d3.select('.first_plot').select("#menu #station_select").property('value');
var attribute = 'AMB_TEMP';
var selectValue, selectTime;
var stationDictionary = {};

var stationCount = 0;

d3.selectAll('.first_plot #menu #station_select option').style('color', function(d,i){return 'hsl(' + i*12 + ',100%, 40%)'})
                                                        .attr('id', function(d,i){ stationCount++; return 'option'+i;});
d3.selectAll('.second_plot #menu #station_select option').style('color', function(d,i){return 'hsl(' + i*12 + ',100%, 40%)'})
                                                        .attr('id', function(d,i){ return i;});

var j = 0
for (j; j < stationCount; j++){
    var pickStation = d3.select('.first_plot #menu #station_select #option'+j).property('value');
    stationDictionary[pickStation] = j;
}

$.getScript("/static/js/TimeChart.js");
$.getScript("/static/js/ValueText.js");
$.getScript("/static/js/PlotControl.js");
$.getScript("/static/js/MouseEvent.js");


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

        addText('Date', '.first_plot', returnData, attribute);
        addText(station, '.first_plot', returnData, attribute);
        addText('Date', '.second_plot', returnData, attribute);
        addText(station, '.second_plot', returnData, attribute);

        mouseLine('.first_plot');
        mouseLine('.second_plot');
        // mouseText('.first_plot', returnData);
    },
    error: function(xhr, ts, et) {
        alert(et);
    }
});
