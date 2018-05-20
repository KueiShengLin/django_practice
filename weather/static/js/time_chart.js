//代辦事項；
//yScale 要可以抓到全域最大值
//酷炫轉場特效

var station = 'Xizhi';
var attribute = 'AMB_TEMP';
var selectValue, selectTime;
var color = ['#ffab00', '#ff0000', '#00ff00', '#0000ff', '#121234'],
    coclorCount = 0;
alert(station);
$.ajax({
    url: "/weather/station_change",
    data: {
        "select_station_value": station,
        "select_attribute_value": attribute
    },
    dataType: "json",
    async: true,
    success: function(returnData) {
        plotLine(returnData);
    },
    error: function(xhr, ts, et) {
        alert(et);
    }
});

// 選單列控制
d3.select("#menu #station_select").on('change', function() {
    station = d3.select("#menu #station_select").property('value');
});

d3.select("#menu #attribute_select").on('change', function() {
    attribute = d3.select("#menu #attribute_select").property('value');
});

//資料庫
$("#btn").click(function() {
    $.ajax({
        url: "/weather/station_change",
        data: {
            "select_station_value": station,
            "select_attribute_value": attribute
        },
        dataType: "json",
        success: function(returnData) {
            plotLine(returnData);

        }
    });
});

//先畫好圖放進div 才能把bootstrap 撐開
function plotLine(returnData) {
    //data preprocess
    var selectValue = returnData.user_request_data;
    var selectTime = returnData.user_request_time;
    var returnDataList = []; //將returnData 的格式從{data:[], time:[]} =>[{data, time},{data, time},{data, time}]
    var maxValue = 0,
        minValue = 0;

    for (var i = 0; i < selectValue.length; i++) {
        returnDataList.push({
            "user_request_data": selectValue[i],
            "user_request_time": new Date(selectTime[i])
        });
        if (selectValue[i] > maxValue)
            maxValue = selectValue[i];
        if (selectValue[i] < minValue)
            minValue = selectValue[i];
    }

    var timeChartBounding = d3.select('#chart_holder #time_chart_div')
        .node().getBoundingClientRect();

    var timeChartSelectSvg = d3.select('#chart_holder #time_chart_div #time_chart_svg')
        .attr('width', timeChartBounding.width)
        .attr('height', 600); // <================記得要改

    var timeChartBounding = d3.select('#chart_holder #time_chart_div')
        .node().getBoundingClientRect();

    var margin = {
            top: 40,
            right: 10,
            bottom: 100,
            left: 30
        },
        height = timeChartBounding.height - margin.top - margin.bottom,
        width = timeChartBounding.width - margin.right - margin.left;

    //nice() = 將第一個和最後一個取四捨五入
    //比例尺 xScale +10 是因為y軸字體大小
    var xScale = d3.scaleTime().domain([returnDataList[0].user_request_time, returnDataList[returnDataList.length - 1].user_request_time])
        .range([margin.left + 10, margin.left + width]).nice();
    var yScale = d3.scaleLinear().domain([minValue, maxValue]).range([height, margin.top]);

    //X 軸
    var xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y %m %d"));
    timeChartSelectSvg.select('#time_chart_x_axis').classed("axis", true).call(xAxis).attr("transform", "translate(0," + height + ")")
        .selectAll('text').style("text-anchor", "end").style("font", "14px").attr("dx", "-.8em").attr("dy", ".15em").attr("transform", "rotate(-65)");

    //Y 軸 translate +10 是為了字體大小
    var yAxis = d3.axisLeft(yScale);
    timeChartSelectSvg.select('#time_chart_y_axis').classed("axis", true).call(yAxis).attr("transform", "translate(" + (margin.left + 10) + ", 0  )")
        .selectAll('text').style("text-anchor", "end").style("font", "14px").attr("dx", "-.8em").attr("dy", ".15em");

    //曲線圖
    var line = d3.line().x(function(d) {
            return xScale(d.user_request_time);
        })
        .y(function(d) {
            return yScale(d.user_request_data);
        })
        .curve(d3.curveMonotoneX);

    var path = timeChartSelectSvg.select('#line')
        .append('path').datum(returnDataList).attr('d', line);
    var totalPathLength = path.node().getTotalLength();

    path.attr("stroke-dasharray", totalPathLength + " " + totalPathLength)
        .attr("stroke-dashoffset", totalPathLength)
        .style('stroke', color[coclorCount])
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attr("stroke-dashoffset", 0);
    //.transition().duration(2000).ease("linear");

    coclorCount = (coclorCount + 1) % color.length;
}
