
var DriverDetail = {};

DriverDetail.SetHeader = function(){
var DriverName = window.location.href.split("=")[1];
document.getElementById("header-detail").innerHTML = DriverName;
localStorage.VehicleType = DriverName;
}

DriverDetail.Reset = function()
{
     document.getElementById("txtDriver").value = "";
     document.getElementById("txtRego").value = "";
     document.getElementById("txtStart").value = "";
     document.getElementById("txtFirst").value = "";
     document.getElementById("txtSecond").value = "";
     document.getElementById("txtEnd").value = "";

}

$( document ).ready(function() {
      DriverDetail.SetHeader();
})

DriverDetail.ValidateForm = function()
{
    var Driver = document.getElementById("txtDriver");
    var Rego = document.getElementById("txtRego");
    var Start = document.getElementById("txtStart");
    var First = document.getElementById("txtFirst");
    var Second = document.getElementById("txtSecond");
    var End = document.getElementById("txtEnd");
    if(Driver.value == "")
    {
        alert("Driver is required.");
        Driver.focus();
        return  false;
    }
    else if(Rego.value == "" )
    {
        alert("Rego is required.");
        Rego.focus();
        return  false;
    }
    else if(Start.value == "" )
    {
        alert("Start is required.");
        Start.focus();
        return  false;
    }
    else if(First.value == "" )
     {
         alert("First is required.");
         First.focus();
         return  false;
     }
      else if(Second.value == "" )
          {
              alert("Second is required.");
              Second.focus();
              return  false;
          }
     else if(End.value == "" )
     {
         alert("End is required.");
         End.focus();
         return  false;
     }

      return true;
}

function SaveDriverDetail(){
    if(DriverDetail.ValidateForm())
    {
        // create table if not exists
       var qry = "CREATE TABLE IF NOT EXISTS DriverDetail(Driver text,Rego text,Lat text,Long text,Start text,First text,Second text,End text,VehicleType text,CreatedOn text,IsSync text default 'N')"
       DriverLoggerDB.ExecuteQuery(qry,[],DriverDetailsTableCreatedSuccess,DriverDetailsTableCreatedError);
    }

}

function DriverDetailsTableCreatedSuccess(tx,result)
{

    var Driver = document.getElementById("txtDriver").value;
    var Rego = document.getElementById("txtRego").value;
    var Start = document.getElementById("txtStart").value;
    var First = document.getElementById("txtFirst").value;
    var Second = document.getElementById("txtSecond").value;
    var End = document.getElementById("txtEnd").value;


    var dt = new Date();
    var qry = "INSERT INTO DriverDetail(Driver,Rego,Lat,Long,Start,First,Second,End,VehicleType,CreatedOn) values(?,?,?,?,?,?,?,?,?,?)"
    var params = [];
    params[0] = Driver;
    params[1] = Rego;
    params[2] = "";
    params[3] = "";
    params[4] = Start;
    params[5]= First;
    params[6] = Second;
    params[7] = End;
    params[8] = document.getElementById("header-detail").innerHTML;
    params[9] = dt.ddmmyyyy() + " " + dt.hhmmss();
    DriverLoggerDB.ExecuteQuery(qry,params,driverDetailInsertSuccess,driverDetailInsertError);
}

function DriverDetailsTableCreatedError(tx,result)
{
    alert("Error in create table driver detail " + result.message);
}

function driverDetailInsertSuccess(tx,result)
{
    alert("driver detail inserted successfully.");
    DriverDetail.Reset();
}

function driverDetailInsertError(tx,result)
{
    alert("Error in insert driver detail " + result.message);
}

function ClearDriverLogData()
{
    var qry = "SELECT count(*) SyncPendingCount FROM DriverDetail WHERE IsSync='N'"
    DriverLoggerDB.ExecuteQuery(qry,[],DriverDetailSyncPendingCountSuccess,DriverDetailSyncPendingCountError);
}

function DriverDetailSyncPendingCountError (tx,error)
{
    alert(error.message);
}

function  DriverDetailSyncPendingCountSuccess(tx,result)
{
    var row = result.rows.item(0);
    if(row["SyncPendingCount"]>0)
    {
       var dialogResult = confirm("Log not sync with server, Sure to remove?");
       if(dialogResult)
            DeleteDriverDetailRecords();
    }
    else
        DeleteDriverDetailRecords();
}

function DeleteDriverDetailRecords()
{
    var qry = "DELETE FROM DriverDetail";
    DriverLoggerDB.ExecuteQuery(qry,[],DeleteLogSuccess,DeleteLogError);
}

function DeleteLogSuccess(tx,result)
{
    alert("Logs clear successfully.")
}

function DeleteLogError(tx,result)
{
    alert("Error in clear log " + result.message);
}

function ShowLogDetail()
{
    window.location = "./ShowLog.html";
}