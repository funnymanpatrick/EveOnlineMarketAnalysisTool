g = new Dygraph(
    // Containing div
    document.getElementById("graphdiv"),
    // CSV file path
    item_csv,
    {
        // Formatting options
        title:item_csv.substring(0,item_csv.indexOf(".csv")),
        xlabel:"Date",
        ylabel:"Price",
        y2label:"",
        // highPrice, lowPrice, avgPrice, orders, volume
        visibility:[true,true,true,false,false],
        series:{
            orders:{axis:"y2",plotter:barChartPlotterScale,highlightCircleSize:0},
            volume:{axis:"y2",plotter:barChartPlotterScale,highlightCircleSize:0}
        },
        axes:{
            y:{
                valueFormatter:function(y){return y.toFixed(2);}
            },
            y2:{
                valueFormatter:function(y2){return y2.toFixed(0);},
                axisLabelFormatter:function(y2){return y2.toFixed(1);},
                axisLabelFontSize:0
            }
        }
    }
);
setStatus();
// Sets and updates status
function setStatus() {
    document.getElementById("visibility").innerHTML = g.visibility().toString();
}

// Sets visibility of graphs based on checkbox status
function change(el) {
    // Sets visibility of element
    g.setVisibility(parseInt(el.id), el.checked);
    // Shows Orders
    if(parseInt(el.id)==3){
        if(el.checked){
            g.updateOptions({y2label:"Orders",dateWindow:[g.xAxisExtremes()[0]-32400000,g.xAxisExtremes()[1]+32400000],
                axes:{y2:{axisLabelFontSize:14}}});
            //console.log(document.getElementsByName("Price"));
            if(document.getElementById("4").checked)
            {
                document.getElementById("4").checked = false;
                g.setVisibility("4",false);
            }

            // Full scaling if all prices unchecked
            /*if(!document.getElementById("0").checked && !document.getElementById("1").checked && !document.getElementById("2").checked)
            {
                g.updateOptions({series:{orders:{plotter:barChartPlotter}}});
            }*/
        }
        else{
            // Reset y2label and visible x-axis range
            g.updateOptions({y2label:"",dateWindow:g.xAxisExtremes(),axes:{y2:{axisLabelFontSize:0}}});
        }
    }

    // Shows Volume
    if(parseInt(el.id) == 4){
        if(el.checked){
            g.updateOptions({y2label:"Volume",dateWindow:[g.xAxisExtremes()[0]-32400000,g.xAxisExtremes()[1]+32400000],
                axes:{y2:{axisLabelFontSize:14}}});
            if(document.getElementById("3").checked)
            {
                document.getElementById("3").checked = false;
                g.setVisibility("3",false);
            }
        }
        else{
            // Reset y2label and visible x-axis range
            g.updateOptions({y2label:"",dateWindow:g.xAxisExtremes(),axes:{y2:{axisLabelFontSize:0}}});
        }
    }
    setStatus();
}

// Toggles price checkboxes to given state(bool)
// Currently obsolete
/*function togglePrices(state){
    checkboxes = document.getElementsByName("Price");
    for(i = 0, n=checkboxes.length;i<n;i++){
        checkboxes[i].checked = state;
        g.setVisibility(i,checkboxes[i].checked);
    }
    setStatus();
}*/

// Normal bar graph plotter
// http://blog.dygraphs.com/2012/08/introducing-custom-plotters.html
function barChartPlotter(e) {
    var ctx = e.drawingContext;
    var points = e.points;
    // see http://dygraphs.com/jsdoc/symbols/Dygraph.html#toDomYCoord
    var y_bottom = e.dygraph.toDomYCoord(0);  
 
    // This should really be based on the minimum gap
    var bar_width = 2/3 * (points[1].canvasx - points[0].canvasx);
    ctx.fillStyle = e.color;
 
    // Do the actual plotting.
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var center_x = p.canvasx;  // center of the bar
 
        ctx.fillRect(center_x - bar_width / 2, p.canvasy, bar_width, y_bottom - p.canvasy);
        ctx.strokeRect(center_x - bar_width / 2, p.canvasy, bar_width, y_bottom - p.canvasy);
  }
}

// Scaled version; Can fit bars with price plots
function barChartPlotterScale(e) {
    var ctx = e.drawingContext;
    var points = e.points;
    var y_bottom = e.dygraph.toDomYCoord(0);  // see http://dygraphs.com/jsdoc/symbols/Dygraph.html#toDomYCoord

    // This should really be based on the minimum gap
    var bar_width = 1/2 * (points[1].canvasx - points[0].canvasx);
    ctx.fillStyle = e.color;
    var area = e.plotArea;

    // Do the actual plotting.
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var center_x = p.canvasx;  // center of the bar
        
        // Scales down height of bars
        var barHeight = (area.h/p.canvasy)*10;
        // Offsets bar postion to be on the bottom of the graph
        var position = area.h - barHeight + 28;    

        ctx.fillRect(center_x - bar_width / 2, position, bar_width, barHeight);
        ctx.strokeRect(center_x - bar_width / 2, position, bar_width, barHeight);
  }
}