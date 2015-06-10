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
        y2label:"Orders",
        visibility:[true,true,true,false,false]
    }

);
setStatus();

//Sets and updates status?
function setStatus() {
    document.getElementById("visibility").innerHTML =
    	g.visibility().toString();
}
//Sets visibility of graphs based on checkbox status?
function change(el) {
    g.setVisibility(parseInt(el.id), el.checked);
    if(parseInt(el.id)==3){
        togglePrices(!el.checked);
        if(el.checked){
            g.updateOptions({ylabel:"Orders"});
        }
        else{
            g.updateOptions({ylabel:"Price"});
        }
    }
    if(parseInt(el.id) == 4){
        if(document.getElementById("0").checked || !document.getElementById("3").checked){
            togglePrices(el.checked);
        }  
        if(document.getElementById("3").checked){
            document.getElementById("3").checked = false;
            g.setVisibility(3,false);
        }
    }
    setStatus();
}

function togglePrices(state){
    checkboxes = document.getElementsByName("Price");
    for(i = 0, n=checkboxes.length;i<n;i++){
        checkboxes[i].checked = state;
        g.setVisibility(i,checkboxes[i].checked);
    }
    setStatus();
}