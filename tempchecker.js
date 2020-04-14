
var nilList = [0];
var arrayCount = 0;
var timeColumn = 1;
var amPM = "";
var d = new Date();
var oTable = document.getElementById('overall-member-table');
var lister = "";

function readTable() {

    time = d.getHours();

    if (time < 12) {
        timeColumn = 1;
    } else {
        timeColumn = 2;
    }

    // gets rows of table
    var rowLength = oTable.rows.length;
    //loops through rows    
    for (i = 1; i < rowLength; i++) {

        //gets cells of current row  
        var oCells = oTable.rows.item(i).cells;

        //gets amount of cells of current row
        var cellLength = oCells.length;
        //alert("Length: " + cellLength);
        //alert("Current Row: "+ i);


        // Gets second column data
        try {
            var cellVal = oCells.item(timeColumn).innerHTML;
        } catch {}


        //alert(cellVal);

        try {
            var nameVal = oCells.item(0).innerHTML;
        } catch {}

        if (cellVal == "Nil") {
            //alert("Nil at: " + nameVal + " added to list.");
            nilList[arrayCount] = nameVal;
            arrayCount++;
        }

        i++;

    }
// return ("People who have yet to log their temp: " + nilList);
}

readTable();

if (timeColumn == 1) {
    amPM = "AM";
} else {
    amPM = "PM"
}

nilList.forEach(outputFunc);
output = "People who have not logged their temperature " + "(" + amPM + ")" + ": \\n" + lister;

console.log(output);

function outputFunc(item, index) {
    lister += item + "\\n";
}