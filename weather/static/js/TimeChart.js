//本次： 可以使用plotDiv去分是哪個 plot(最外層的div)
//代辦事項；
//y 有一些極端值看要不要去掉
//width = 400
//看要不要把x y 軸拿出來計算
//先畫好圖放進div 才能把bootstrap 撐開
function plotLine(returnData, plotDiv) {
    // alert(plotDiv)
    //data preprocess
    var selectValue = returnData.user_request_data;
    var selectTime = returnData.user_request_time;
    var returnDataList = []; //將returnData 的格式從{data:[], time:[]} =>[{data, time},{data, time},{data, time}]
    var maxValue = returnData.max_value,
        minValue = returnData.min_value;

    for (var i = 0; i < selectValue.length; i++) {
        returnDataList.push({
            "user_request_data": selectValue[i],
            "user_request_time": new Date(selectTime[i])
        });
        // if (selectValue[i] > maxValue)
        //     maxValue = selectValue[i];
        // if (selectValue[i] < minValue)
        //     minValue = selectValue[i];
    }

    var timeChartBounding = d3.select(plotDiv).select('#time_chart_div')
        .node().getBoundingClientRect();

    var timeChartSelectSvg = d3.select(plotDiv).select('#time_chart_div').select('#time_chart_svg')
        .attr('width', timeChartBounding.width)
        .attr('height', 400); // <================記得要改

    var timeChartBounding = d3.select(plotDiv).select('#time_chart_div')
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
    timeChartSelectSvg.select('#time_chart_x_axis').call(xAxis).attr("transform", "translate(0," + height + ")")
        .selectAll('text').style("text-anchor", "end").style("font", "14px").attr("dx", "-.8em").attr("dy", ".15em").attr("transform", "rotate(-65)");

    //Y 軸 translate +10 是為了字體大小
    var yAxis = d3.axisLeft(yScale);
    timeChartSelectSvg.select('#time_chart_y_axis').call(yAxis).attr("transform", "translate(" + (margin.left + 10) + ", 0  )")
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
