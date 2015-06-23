g = new Dygraph(
    // containing div
    document.getElementById("graphdiv"),
    //CSV file path
    "item18.csv",
    {
        //Formatting options
        title:"Title",
        xlabel:"Date",
        ylabel:"Price",
        y2label:"Volume",
        visibility:[true,true,true,false,true],
        orders:{axis:{ },plotter:barChartPlotter,highlightCircleSize:0},
        volume:{axis:"orders",plotter:barChartPlotter,highlightCircleSize:0},
        axes:{
            y:{
                valueFormatter:function(y){return y.toFixed(2);}
            },
            y2:{
                valueFormatter:function(y2){return y2.toFixed(0);},
                axisLabelFormatter:function(y2){return y2.toFixed(1);}
            }
        },
        dateWindow:[1431975600000,1434412800000]
    }
);
setStatus();

//Sets and updates status
function setStatus() {
    document.getElementById("visibility").innerHTML = g.visibility().toString();
}

//Sets visibility of graphs based on checkbox status
function change(el) {
    //Sets visibility of element
    g.setVisibility(parseInt(el.id), el.checked);

    //Shows Orders
    if(parseInt(el.id)==3){
        if(el.checked){
            g.updateOptions({y2label:"Orders"});
            if(document.getElementById("4").checked)
            {
                document.getElementById("4").checked = false;
                g.setVisibility("4",false);
            }
        }
        else{
            g.updateOptions({y2label:""});
        }
    }

    //Shows Volume
    if(parseInt(el.id) == 4){
        if(el.checked){
            g.updateOptions({y2label:"Volume"});
            if(document.getElementById("3").checked)
            {
                document.getElementById("3").checked = false;
                g.setVisibility("3",false);
            }
        }
        else{
            g.updateOptions({y2label:""});
        }
    }
    setStatus();
}

//Toggles price checkboxes to given state(bool)
//Currently obsolete
/*function togglePrices(state){
    checkboxes = document.getElementsByName("Price");
    for(i = 0, n=checkboxes.length;i<n;i++){
        checkboxes[i].checked = state;
        g.setVisibility(i,checkboxes[i].checked);
    }
    setStatus();
}*/

function barChartPlotter(e) {
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
    
    var barHeight = (area.h/p.canvasy)*10;
    var position = area.h - barHeight + 28;    

    ctx.fillRect(center_x - bar_width / 2, position, bar_width, barHeight);
    ctx.strokeRect(center_x - bar_width / 2, position, bar_width, barHeight);
  }
}
