g = new Dygraph(

    // containing div
    document.getElementById("graphdiv"),
    "example.csv"
    // CSV or path to a CSV file.
    /*"Date,Temperature\n" +
    "2008-05-07,75\n" +
    "2008-05-08,70\n" +
    "2008-05-09,80\n"*/,
    {

    }

);
	setStatus();

function setStatus() {
    document.getElementById("visibility").innerHTML =
    	g.visibility().toString();
}

function change(el) {
    g.setVisibility(parseInt(el.id), el.checked);
    setStatus();
}