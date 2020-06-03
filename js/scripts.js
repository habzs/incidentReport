var output = "";
var statusCounter = 1;
var statusOutput = [];
var statusBox = 0;
var lister = "";
var formInput = document.getElementById("form1");
var lookUpFormInput = document.getElementById("form2");


function addStatus() {
    statusCounter++;

    // --- STATUS GENERATION ---
    var statusDiv = document.createElement("div");
    statusDiv.setAttribute("class", "mui-textfield mui-textfield--float-label mui-col-xs-6");
    statusDiv.setAttribute("id", "statusDiv" + statusCounter);
    document.getElementById("statusBiggerDiv").appendChild(statusDiv);

    var statusInput = document.createElement("INPUT");
    statusInput.setAttribute("type", "text");
    statusInput.setAttribute("class", "autoc");
    statusInput.setAttribute("autocomplete", "off");
    statusInput.setAttribute("id", "status" + statusCounter);
    document.getElementById("statusDiv" + statusCounter).appendChild(statusInput);

    var statusLabel = document.createElement("LABEL");
    statusLabel.textContent = "Status: ";
    document.getElementById("statusDiv" + statusCounter).appendChild(statusLabel);
    // ---

    // --- DAY GENERATION ---
    var dayDiv = document.createElement("div");
    dayDiv.setAttribute("class", "mui-textfield mui-textfield--float-label mui-col-xs-6");
    dayDiv.setAttribute("id", "dayDiv" + statusCounter);
    document.getElementById("statusBiggerDiv").appendChild(dayDiv);

    var dayInput = document.createElement("INPUT");
    dayInput.setAttribute("type", "number");
    dayInput.setAttribute("pattern", "[0-9]");
    dayInput.setAttribute("inputmode", "numeric");
    dayInput.setAttribute("id", "day" + statusCounter);
    document.getElementById("dayDiv" + statusCounter).appendChild(dayInput);

    var dayLabel = document.createElement("LABEL");
    dayLabel.textContent = "Days: ";
    document.getElementById("dayDiv" + statusCounter).appendChild(dayLabel);
    // ---
    document.getElementById("rmBtn").disabled = false;
}

function rmStatus() {

    if (statusCounter >= 2) {
        // --- STATUS REMOVE ---
        var currentStatusDiv = document.getElementById("statusDiv" + statusCounter);
        currentStatusDiv.remove();
        // ---

        // --- DAY REMOVE ---
        var currentDayDiv = document.getElementById("dayDiv" + statusCounter);
        currentDayDiv.remove();
        // ---
        statusCounter--;

        if (statusCounter == 1) {
            document.getElementById("rmBtn").disabled = true;
        }

    }
}

function generateOutput() {

    statusOutput = [];

    // formInput = document.getElementById("form1");
    fourDigits = formInput.elements[0].value;
    name = formInput.elements[1].value;
    reason = formInput.elements[2].value;
    reasonUpperCase = reason.toUpperCase();

    // statusBox is box ID, statusCounter is the number of boxes there are.
    // loops through number of boxes, and adds it into the array.
    for (let i = 0; i < statusCounter; i++) {
        statusBox = i + 1;

        // Checks if day is more than 1, if it is, use correct grammar "days".
        if (formInput.elements.namedItem("day" + statusBox).value > 1) {
            isDaysPlural = "days";
        } else {
            isDaysPlural = "day";
        }

        // Adds number of days
        statusOutput[i] = formInput.elements.namedItem("day" + statusBox).value + " " + isDaysPlural;
        // Adds status
        statusOutput[i] += " " + formInput.elements.namedItem("status" + statusBox).value;
        // Get duration of status from form
        statusDuration = parseInt(formInput.elements.namedItem("day" + statusBox).value);
        // Calculates dates
        currentDate = moment().format('DDMMYY');
        endDate = moment().add(statusDuration - 1, 'day').format('DDMMYY');

        statusOutput[i] += " (" + currentDate + "-" + endDate + ")";

        //console.log(statusOutput);
        //console.log("currentDate: " + currentDate);
    }

    //console.log("statusBox: " + statusBox);
    //console.log("statusCounter: " + statusCounter);

    statusOutput.forEach(outputFunc);
    output = fourDigits + " REC " + name + " has finished reporting sick at RHMC for " + reasonUpperCase + " and received " + lister;
    lister = "";

    // Outputs paragraph into textbox.
    document.getElementById("outputTextArea").value = output;

}

function outputFunc(item, index) {

    // Checks if it is the last item in the list, ends it off with a "."
    // Rather than a ","
    if (index == (statusCounter - 1)) {
        lister += item + ". "
    } else {
        lister += item + ", ";
    }
}

function fillName() {

    document.getElementById("name").classList.remove("mui--is-empty", "mui--is-untouched", "mui--is-pristine");
    document.getElementById("name").classList.add("mui--is-touched", "mui--is-dirty", "mui--is-not-empty");

    digits = formInput.elements.namedItem("fourDigits").value;

    $.getJSON('json/namelist.json', function (recruit) {
        for (var i = 0; i < recruit.length; i++) {
            if (recruit[i].fourD == digits) {
                recruitName = recruit[i].name;
                //console.log("recruitName: " + recruitName);
                document.getElementById("name").value = recruitName;
                break;
            } else {
                document.getElementById("name").value = "ERROR: Check 4D";
            }
        }

    });

}

function copyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementById("outputTextArea");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
}

function clearForm() {
    //location.reload();
    for (var i = 0; 1 < statusCounter; i++) {
        rmStatus();
    }

    document.getElementById("form1").reset();
    document.getElementById("outputTextArea").value = "";

    document.getElementById("fourDigits").classList.add("mui--is-empty", "mui--is-untouched", "mui--is-pristine");
    document.getElementById("fourDigits").classList.remove("mui--is-touched", "mui--is-dirty", "mui--is-not-empty");

    document.getElementById("name").classList.add("mui--is-empty", "mui--is-untouched", "mui--is-pristine");
    document.getElementById("name").classList.remove("mui--is-touched", "mui--is-dirty", "mui--is-not-empty");

    document.getElementById("reason").classList.add("mui--is-empty", "mui--is-untouched", "mui--is-pristine");
    document.getElementById("reason").classList.remove("mui--is-touched", "mui--is-dirty", "mui--is-not-empty");

    document.getElementById("status1").classList.add("mui--is-empty", "mui--is-untouched", "mui--is-pristine");
    document.getElementById("status1").classList.remove("mui--is-touched", "mui--is-dirty", "mui--is-not-empty");

    document.getElementById("day1").classList.add("mui--is-empty", "mui--is-untouched", "mui--is-pristine");
    document.getElementById("day1").classList.remove("mui--is-touched", "mui--is-dirty", "mui--is-not-empty");

}

// AUTOCOMPLETE

var statusList = ["LD", "RIB", "EX. RMJ", "EX. HEAVY LOADS", "EX. UPPER LIMBS", "EX. GRENADES AND EXPLOSIVES", "EX. HANDLING OF FIREARMS", "EX. LIVE FIRING AND FIRING OF BLANKS", "UFD"];

$(document).on("focus", ".autoc", function () {
    if (!$(this).is(".aced"))
        $(this).addClass("aced").autocomplete({
            source: statusList
        });
})




// Tab 2 - 4D Lookup

function nameLookUp() {

    digits = lookUpFormInput.elements.namedItem("lookUp4D").value;

    $.getJSON('json/namelist.json', function (recruit) {
        for (var i = 0; i < recruit.length; i++) {

            if (recruit[i].fourD == digits) {
                recruitName = recruit[i].name;
                //console.log("recruitName: " + recruitName);
                document.getElementById("lookUpNameOutput").value = recruitName;
                break;
            } else {
                document.getElementById("lookUpNameOutput").value = "ERROR: Check 4D";
            }
        }

    });
}

function lookUpCopyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementById("lookUpNameOutput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
}