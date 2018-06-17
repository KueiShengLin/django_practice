var nowTextPosition = [{top: 0, left: 10}, {top: 0, left: 10}]
var margin = {
        top: 20,
        right: 0,
        bottom: 0,
        left: 0
    };

function addText(station, plotDiv){

    var timeChartBounding = d3.select(plotDiv).select('#line_value_div')
        .node().getBoundingClientRect();

    var height = timeChartBounding.height - margin.top - margin.bottom,
        width = timeChartBounding.width - margin.right - margin.left;

    //svg大小 = div大小
    d3.select(plotDiv).select('#chart_holder').select('#line_value_svg')
        .attr('width', timeChartBounding.width)
        .attr('height', 400); // <================記得要改

    lineValueG = d3.select(plotDiv).select('#chart_holder #line_value_svg #text');
    lineValueG.attr("transform", "translate(0," + margin['top'] + ")");

    if (plotDiv == ".first_plot")
        changeTextPosition(lineValueG, 0, station, width, height);
    else if (plotDiv == ".second_plot"){
            changeTextPosition(lineValueG, 1, station, width, height);

    }

}

function changeTextPosition(textG='.first_plot', divNum='0', ouputText='Date', width, height){

    textG.append('text').attr('id', (ouputText + '_text')).attr('fill', 'hsl(' + stationDictionary[ouputText] * 12 + ',100%, 40%)')
                        .attr('transform', "translate(" + nowTextPosition[divNum]['left'] + "," + nowTextPosition[divNum]['top'] + ")")
                        .style("font-size", "20px").text(ouputText + '：');
    textG.append('text').attr('id', (ouputText + '_value')).attr('fill', 'hsl(' + stationDictionary[ouputText] * 12 + ',100%, 40%)')
                        .attr('transform', "translate(" + nowTextPosition[divNum]['left'] + "," + (nowTextPosition[divNum]['top']+20) + ")")
                        .style("font-size", "20px").text('-');

    nowTextPosition[divNum]['left'] = (nowTextPosition[divNum]['left'] + (width/3)) ;
    if (nowTextPosition[divNum]['left'] > (width-10)){
        nowTextPosition[divNum]['top'] = nowTextPosition[divNum]['top'] + (height/4);
        nowTextPosition[divNum]['left'] = 0;
    }
}
