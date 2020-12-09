function myFunction(browser) {
  var curr = document.getElementsByName("browser").value = browser;
  document.getElementById("currSign").innerHTML = curr;
}

"use strict";
function find() {

  document.getElementById("resultArea").style.display='';  //loading resultare which is disabled

  var P = Number(document.getElementById("P").value);
  var R = Number(document.getElementById("R").value);
  var r = Number(R / 100);

  var Y = Number(document.getElementById("Y").value);
  var M = Number(document.getElementById("M").value);
  var t = Y + (M / 12);       // months expressed in years

  var tM = (Y * 12) + M;      // years expressed in months

  var A = Math.round(P * (1 + r * t));
  var currentCurr = document.getElementById("currSign").innerHTML;
  var res = currentCurr.concat(" ", A, "/-")
  document.getElementById('result').innerHTML = res;

  var dps = []; //dataPoints.
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: "Interest Breakdown"
    },

    axisX: {
      title: "Months",
      valueFormatString: "#0",
    },

    axisY: {
      title: "Amount",
      valueFormatString: "#0",
      suffix: "/-",
      prefix: currentCurr
    },

    data: [{
      type: "splineArea",
      // color: "rgba(54,158,173,.7)",
      color: "#282C34",
      markerSize: 5,
      dataPoints: dps
    }]
  });

  $(document).ready(function () {
    $('#tb').DataTable();
  });

  var table = document.getElementById("tb");
  var header = table.createTHead();
  var row = header.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = "<b>Month</b>";
  cell2.innerHTML = "<b>Monthly Interest</b>";
  cell3.innerHTML = "<b>Total Interest</b>";
  cell4.innerHTML = "<b>Amount</b>";

  var table = document.getElementById("tb");
  var header1 = table.createTBody();

  var i;
  for (i = 0; i <= tM; i++) {
    var rm = r / 12;
    var Am = Math.round(P * (1 + i * rm));
    var res = currentCurr.concat(" ", Am, "/-")
    var tI =  currentCurr.concat(" ", Am-P, "/-")    //Total Monthly Interest
    var mI = Math.round((P * (1 + i * rm))-(P * (1 + (i-1) * rm))) ;    //monthly interesr

    var row = header1.insertRow(header1.rows.length);
    // var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = i;
    cell2.innerHTML = mI;
    cell3.innerHTML = tI;
    cell4.innerHTML = res;
    

    dps.push({
      x: i,
      y: Am
    });

  }

  chart.render();

  return false;
  
}

document.getElementById('go').addEventListener('click', find);
