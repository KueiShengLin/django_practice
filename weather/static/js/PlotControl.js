//代辦事項
//暫時沒有
//first plot
station, attribute = selectFeature(".first_plot");
var nowAttribute = {'.first_plot': 'AMB_TEMP', '.second_plot': 'AMB_TEMP'};
var inPlotStation = {'.first_plot': [station], '.second_plot': [station]};

$(".first_plot #btn").click(function() {
    // alert("first btn");
    station, attribute = selectFeature(".first_plot");
    $.ajax({
        url: "/weather/station_change",
        data: {
            "select_station_value": station,
            "select_attribute_value": attribute
        },
        dataType: "json",
        success: function(returnData) {
            checkAndPlot('.first_plot',0 , returnData, station, attribute);
        }
    });
});

//second_plot
$(".second_plot #btn").click(function() {
    // alert("second btn");
    station, attribute = selectFeature(".second_plot");

    $.ajax({

        url: "/weather/station_change",
        data: {
            "select_station_value": station,
            "select_attribute_value": attribute
        },
        dataType: "json",
        success: function(returnData) {
            checkAndPlot('.second_plot',1 , returnData, station, attribute);
        }
    });
});

function checkAndPlot(plotDiv, plotID, returnData, station, attribute){
    if (attribute != nowAttribute[plotDiv]){

        d3.select(plotDiv).select('#time_chart_div #time_chart_svg #line').remove();
        d3.select(plotDiv).select('#time_chart_div #time_chart_svg').append('g').attr('id', 'line');
        inPlotStation[plotDiv] = [];
        nowAttribute[plotDiv] = attribute;
    }

    if (inPlotStation[plotDiv].includes(station) == false) {

        plotLine(returnData, plotDiv);
        addText(station, plotDiv, returnData, attribute);
        inPlotStation[plotDiv].push(station);

    }
}

function selectFeature(plotDiv){
    // 選單列控制
    station  = d3.select(plotDiv).select("#menu #station_select").property('value');
    attribute = d3.select(plotDiv).select("#menu #attribute_select").property('value');

    //如果不想用function 而是隨時都在抓的話可以用下面的程式碼
    // d3.select(plotDiv).select("#menu #station_select").on('change', function() {
    //     station = d3.select(plotDiv).select("#menu #station_select").property('value');
    // });
    //
    // d3.select(plotDiv).select("#menu #attribute_select").on('change', function() {
    //     attribute = d3.select(plotDiv).select("#menu #attribute_select").property('value');
    // });

    return station, attribute;
}
