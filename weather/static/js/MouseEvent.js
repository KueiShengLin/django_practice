function mouseLine(plotDiv){
    var timeChartBounding = d3.select(plotDiv).select('#time_chart_div')
        .node().getBoundingClientRect();

    var margin = {
            top: 40,right: 10,
            bottom: 100,left: 40},
            height = timeChartBounding.height - margin.top - margin.bottom,
            width = timeChartBounding.width - margin.right - margin.left;

    var mouseScale = d3.scaleLinear().domain([0, width]).range([margin.left + 10, margin.left + width + 10]); //因為y軸為了好看+10，所以這裡也要+10

    var mouseG = d3.select(plotDiv).select('#time_chart_div #time_chart_svg #mouse')
                   .attr('transform', "translate(" + (margin.left +10) + ", 0  )"); //跟mouse有關的圖層
    mouseG.append('path').attr('class', 'mouse_line')
          .style("stroke", "black").style("stroke-width", "1px").style("opacity", "0"); //那條垂直線

    // var mousePerLine = mouseG.selectAll(".mouse_per_line").append("g").attr("class", "mouse_per_line");
    // mousePerLine.append("circle")
    //             .attr("r", 7)
    //             .style("storke", "black")
    //             .style("fill", "none").style("stroke-width", "1px").style("opacity", "0");
    mouseG.select("#sensor") //滑鼠事件感知
          .attr('width', width).attr('height', height)
          .attr('fill', 'none').attr('pointer-events', 'all')
          // .on('mouseout', function() { //離開時線圈全部消失
          //     d3.selectAll(".mouse_line").style("opacity", "0");
          //     // d3.selectAll(".mouse_per_line circle").style("opacity", "0");
          // })
          .on('mouseover', function() { //滑鼠碰到時顯示線和圈
              d3.selectAll(".mouse_line").style("opacity", "1");
              // d3.selectAll(".mouse_per_line circle").style("opacity", "1");
          })
          .on('mousemove', function() { //滑鼠動時線圈跟著動
              var mouse = d3.mouse(this);
              console.log(mouse[0]);
              d3.selectAll('.mouse_line')
                .attr('d', function() {
                    var d = "M" + mouse[0] + "," + height;
                    d += " " + mouse[0] + "," + 0;
                    return d;
                })

             updateValue(mouseScale(mouse[0]), plotDiv); // in ValueText.js
             updateDate(mouseScale(mouse[0]), plotDiv);
          });

}

// function mouseText(plotDiv, returnData){
//     //data preprocess
//     var selectValue = returnData.user_request_data;
//     var selectTime = returnData.user_request_time;
//     var returnDataList = []; //將returnData 的格式從{data:[], time:[]} =>[{data, time},{data, time},{data, time}]
//     var maxValue = returnData.max_value,
//         minValue = returnData.min_value;
//
//     for (var i = 0; i < selectValue.length; i++) {
//         returnDataList.push({
//             "user_request_data": selectValue[i],
//             "user_request_time": new Date(selectTime[i])
//         });
//     }
//
//     var timeChartBounding = d3.select(plotDiv).select('#time_chart_div')
//         .node().getBoundingClientRect();
//
//     var margin = {
//             top: 40,right: 10,
//             bottom: 100,left: 40},
//             height = timeChartBounding.height - margin.top - margin.bottom,
//             width = timeChartBounding.width - margin.right - margin.left;
//
//     var xScale = d3.scaleTime().domain([returnDataList[0].user_request_time, returnDataList[returnDataList.length - 1].user_request_time])
//         .range([margin.left + 10, margin.left + width]).nice();
//     var yScale = d3.scaleLinear().domain([minValue, maxValue]).range([height, margin.top]);
//
//     var mouseScale = d3.scaleLinear().domain([0, width]).range([margin.left + 10, margin.left + width]);
//
//     var mouseSensor = d3.select(plotDiv).select('#time_chart_div #time_chart_svg #mouse #sensor')
//     mouseSensor.on('mouseover', function() { //滑鼠碰到時顯示線和圈
//         var mouse = d3.mouse(this);
//         console.log([margin.left + 10, margin.left + width]);
//         console.log(mouseScale(mouse[0]));
//         date = xScale.invert(mouseScale(mouse[0]));
//         date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
//         d3.select('#line_value_div #Date_value').text(date);
//
//         // banqiao =
//
//     })
//
// }
