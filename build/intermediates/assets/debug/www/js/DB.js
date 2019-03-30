var DriverLoggerDB ={};
var db = openDatabase("DriDB","1.0","Driver Logger Database",50000);
DriverLoggerDB.createDatabase = function(dbName,dbVersion,dbDescription,dbSize){
     db = window.openDatabase(dbName, dbVersion, dbDescription, dbSize); //will create database  or open it
}
DriverLoggerDB.DropTable = function(tblName)
{
	db.transaction( function(tx) {
		tx.executeSql('DROP TABLE '+ tblName +';');
	});
}

DriverLoggerDB.ExecuteQuery = function(query,queryParam,successCB,failerCB)
{
	db.transaction(function (tx) {
		tx.executeSql(query,queryParam,eval(successCB),eval(failerCB));
	});
}