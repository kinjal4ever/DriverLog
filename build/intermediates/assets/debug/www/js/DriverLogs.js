function RedirectPage(DriverName)
{
    var pagename = "./AddDetail.html?Driver="+DriverName;
    //$.mobile.changePage(pagename, { reloadPage: true, transition: "none"} );
    window.location.href = pagename;
}