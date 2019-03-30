$(document).ready(function (){
    document.getElementById('header-detail').innerHTML = localStorage.VehicleType;
    LoadDriverDetail();
});

function LoadDriverDetail()
{
    var qry = "SELECT * FROM DriverDetail";
    DriverLoggerDB.ExecuteQuery(qry,[],LoadDriverDetailSuccess,LoadDriverDetailError);
}

function LoadDriverDetailSuccess(tx,result)
{

    var htmlData;
    htmlData = "<table data-role='table' id='table-column-toggle' data-mode='columntoggle' class='ui-responsive table-stroke'>" +
                 "<thead>"+
                     "<tr>"+
                         "<th data-priority='5'>CreatedOn</th>"+
                         "<th data-priority='5'>Driver</th>"+
                         "<th data-priority='5'>Rego</th>"+
                         "<th data-priority='5'>Lat</th>"+
                         "<th data-priority='5'>Long</th>"+
                         "<th data-priority='2'>Start</th>"+
                         "<th data-priority='1'>First</th>"+
                         "<th data-priority='3'>Second</th>"+
                         "<th data-priority='4'>End</th>"+

              "</tr>"+
            "</thead>"+
                 "<tbody>";
    for(var i=0;i<result.rows.length;i++)
    	{
          var row = result.rows.item(i);
          htmlData +=  "<tr>" +
                            "<td data-priority='5'>" + row["CreatedOn"] + "</td>" +
                            "<td data-priority='5'>" + row["Driver"] + "</td>" +
                            "<td data-priority='2'>" + row["Rego"] + "</td>" +
                            "<td data-priority='1'>" + row["Lat"] + "</td>" +
                            "<td data-priority='3'>" + row["Long"] + "</td>" +
                            "<td data-priority='4'>" + row["Start"] + "</td>" +
                            "<td data-priority='5'>" + row["First"] + "</td>" +
                            "<td data-priority='5'>" + row["Second"] + "</td>" +
                            "<td data-priority='5'>" + row["End"] + "</td>" +
                        "</tr>";
    	}
        htmlData += "</tbody>" +
            "</table>";
    document.getElementById("Driver-detail").innerHTML = htmlData ;
}

function LoadDriverDetailError(tx,result)
{
    alert(result.message);
}

function GetLogsFromServer()
{
    alert("Log fetch from server.");
}

function SendLogsToServer()
{
    alert("Send logs to server.")
}