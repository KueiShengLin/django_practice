var nowTextPosition = [{top: 0, left: 10}, {top: 0, left: 10}]
var nowHaveStation = {".first_plot":[], ".second_plot":[]};
var nowAttribute1 = "AMB_TEMP", nowAttribute2 = "AMB_TEMP";
var margin = {
        top: 20,
        right: 0,
        bottom: 0,
        left: 0
    };
var chartMargin = {
        top: 40,
        right: 10,
        bottom: 100,
        left: 40
    };

var timeScale;

function addText(station, plotDiv, returnData, attribute){
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
    }

    var lineValueBounding = d3.select(plotDiv).select('#line_value_div')
        .node().getBoundingClientRect();

    var valueHeight = lineValueBounding.height - margin.top - margin.bottom,
        valueWidth = lineValueBounding.width - margin.right - margin.left;

    var timeChartBounding = d3.select(plotDiv).select('#time_chart_div')
        .node().getBoundingClientRect();

    var chartHeight = timeChartBounding.height - chartMargin.top - chartMargin.bottom,
        chartWidth = timeChartBounding.width - chartMargin.right - chartMargin.left;

    timeScale = d3.scaleTime().domain([returnDataList[0].user_request_time, returnDataList[returnDataList.length - 1].user_request_time])
                  .range([margin.left + 50, margin.left + chartWidth + 40]);

    //svg大小 = div大小
    d3.select(plotDiv).select('#chart_holder').select('#line_value_svg')
        .attr('width', lineValueBounding.width)
        .attr('height', 400); // <================記得要改

    lineValueG = d3.select(plotDiv).select('#chart_holder #line_value_svg #text');
    lineValueG.attr("transform", "translate(0," + margin['top'] + ")");

    if (plotDiv == ".first_plot")
    {

        if (nowAttribute1 != attribute){
            nowTextPosition[0] = {top: 0, left: 10};
            nowHaveStation[".first_plot"] = [];
            nowAttribute1 = attribute;
            d3.select(plotDiv).select('#line_value_div').selectAll(".value_text").remove();
            addText('Date', plotDiv, returnData, attribute);
        }

        changeTextPosition(lineValueG, 0, station, valueWidth, valueHeight);
        if (station != 'Date') {
            var yScale = d3.scaleLinear().domain([minValue, maxValue]).range([chartHeight, margin.top]);

            nowHaveStation[".first_plot"].push({
                "updateID":(plotDiv + " #line_value_div #" + station + "_value"),
                "scale":yScale
            });
        }

    }

    else if (plotDiv == ".second_plot"){
        if (nowAttribute2 != attribute){
            nowTextPosition[1] = {top: 0, left: 10};
            nowHaveStation[".second_plot"] = [];
            nowAttribute2 = attribute;
            d3.select(plotDiv).select('#line_value_div').selectAll(".value_text").remove();
            addText('Date', plotDiv, returnData, attribute);
        }

        changeTextPosition(lineValueG, 1, station, valueWidth, valueHeight);
        if (station != 'Date') {
            var yScale = d3.scaleLinear().domain([minValue, maxValue]).range([chartHeight, margin.top]);

            nowHaveStation[".second_plot"].push({
                "updateID":(plotDiv + " #line_value_div #" + station + "_value"),
                "scale":yScale
            });
        }

    }

}

function changeTextPosition(textG='.first_plot', divNum='0', ouputText='Date', width, height){

    textG.append('text').attr('class', 'value_text').attr('id', (ouputText + '_text')).attr('fill', 'hsl(' + stationDictionary[ouputText] * 12 + ',100%, 40%)')
                        .attr('transform', "translate(" + nowTextPosition[divNum]['left'] + "," + nowTextPosition[divNum]['top'] + ")")
                        .style("font-size", "20px").text(ouputText + '：');
    textG.append('text').attr('class', 'value_text').attr('id', (ouputText + '_value')).attr('fill', 'hsl(' + stationDictionary[ouputText] * 12 + ',100%, 40%)')
                        .attr('transform', "translate(" + nowTextPosition[divNum]['left'] + "," + (nowTextPosition[divNum]['top']+20) + ")")
                        .style("font-size", "20px").text('-');

    nowTextPosition[divNum]['left'] = (nowTextPosition[divNum]['left'] + (width/3)) ;
    if (nowTextPosition[divNum]['left'] > (width-10)){
        nowTextPosition[divNum]['top'] = nowTextPosition[divNum]['top'] + (height/4);
        nowTextPosition[divNum]['left'] = 0;
    }
}

var plot = ['.first_plot', '.second_plot'];

function updateValue(mouseValue, plotDiv) {
    for (var k = 0; k< plot.length; k++){
        var lineInfo = document.getElementsByClassName((plot[k] + 'lines'));
        for (var i = 0; i< nowHaveStation[(plot[k])].length ; i++){

            stationInfo = nowHaveStation[plot[k]][i]
            var beginning = 0,
                end = lineInfo[i].getTotalLength(),
                target = null;

            while (true){
              //使用2元搜尋找出 pos.x = 現在滑鼠位置的點
              target = Math.floor((beginning + end) / 2);
              pos = lineInfo[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== mouseValue) {
                  break;
              }
              if (pos.x > mouseValue)      end = target;
              else if (pos.x < mouseValue) beginning = target;
              else break; //position found
            }
            d3.select(stationInfo['updateID']).text(stationInfo['scale'].invert(pos.y).toFixed(2));

        }
    }
}

function updateDate(mouseValue) {
    date = timeScale.invert(mouseValue);
    date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    d3.selectAll('#line_value_div #Date_value').text(date);
}
