g = new Dygraph(
    // containing div
    document.getElementById("graphdiv"),
    //CSV file path
    "example.csv",
    {
        //Optional formatting things
        title:"Item 34, Region 10000002, 5/10-6/07",
        xlabel:"Date",
        ylabel:"Price",
        y2label:"",
        visibility:[true,true,true,false,false],
        orders:{axis:{ }},
        volume:{axis:"orders",plotter:barChartPlotter}
    }

);
setStatus();

//Sets and updates status
function setStatus() {
    document.getElementById("visibility").innerHTML =
    	g.visibility().toString();
}
//Sets visibility of graphs based on checkbox status
function change(el) {
    //Sets visibility of element
    g.setVisibility(parseInt(el.id), el.checked);

    //Only shows orders and defaults back to prices when unchecked
    if(parseInt(el.id)==3){
        if(document.getElementById("4").checked){
            document.getElementById("4").checked = false;
            g.setVisibility(4,false);
        }
        if(el.checked){
            g.updateOptions({y2label:"Orders"});
        }
        else{
            g.updateOptions({y2label:""});
        }
    }

    //Only shows volume and defaults back to prices when unchecked
    if(parseInt(el.id) == 4){
        if(document.getElementById("3").checked){
            document.getElementById("3").checked = false;
            g.setVisibility(3,false);
        }
        if(el.checked){
            g.updateOptions({y2label:"Volume",
                axes:{y2:{
                    valueFormatter:function(y2,opts){
                        return y2*.0000000001;
                    }}}});
        }
        else{
            g.updateOptions({y2label:""});
        }
    }
    setStatus();
}
//Toggles price checkboxes to given state(bool)
function togglePrices(state){
    checkboxes = document.getElementsByName("Price");
    for(i = 0, n=checkboxes.length;i<n;i++){
        checkboxes[i].checked = state;
        g.setVisibility(i,checkboxes[i].checked);
    }
    setStatus();
}

function barChartPlotter(e) {
  var ctx = e.drawingContext;
  var points = e.points;
  var y_bottom = e.dygraph.toDomYCoord(0);  // see http://dygraphs.com/jsdoc/symbols/Dygraph.html#toDomYCoord
 
  // This should really be based on the minimum gap
  var bar_width = 1/2 * (points[1].canvasx - points[0].canvasx);
  ctx.fillStyle = e.color;
 
  // Do the actual plotting.
  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    var center_x = p.canvasx;  // center of the bar
 
    ctx.fillRect(center_x - bar_width / 2, p.canvasy,
        bar_width, y_bottom - p.canvasy);
    ctx.strokeRect(center_x - bar_width / 2, p.canvasy,
        bar_width, y_bottom - p.canvasy);
  }
}