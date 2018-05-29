//代辦事項
//暫時沒有
//first plot
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
            plotLine(returnData, '.first_plot');
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
            plotLine(returnData, '.second_plot');
        }
    });
});

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
