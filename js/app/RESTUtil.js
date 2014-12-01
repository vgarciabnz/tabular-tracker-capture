
function RESTUtil() {}

RESTUtil.getAsynchData = function( url, actionSuccess, actionError, loadingStart, loadingEnd ) 
{
	return $.ajax({
		type: "GET"
		,dataType: "json"
		,url: url
		,async: true
		,success: actionSuccess
		,error: actionError
		,beforeSend: function( xhr ) {
			if ( loadingStart !== undefined ) loadingStart();
		}
	})
	.always( function( data ) {
		if ( loadingEnd !== undefined ) loadingEnd();
	});
}


RESTUtil.getSynchData = function( url ) {
	return $.ajax({
		type: "GET",
		dataType: "json",
		url: url,
		async: false
	}).responseText;
}

/*
RESTUtil.submitData_Text = function( settingName, data )
{
	RESTUtil.submitData_URL( _queryURL_SystemSettings + settingName, data
		, function() { alert( 'Saved Successfully!' ); }
		, function() { alert( 'Failed to Save the value.' ); } );
}
*/


RESTUtil.submitData_Text = function( url, jsonData, successFunc, failFunc )
{		
	$.ajax({
	  type: "POST",
	  url: url,
	  data: JSON.stringify( jsonData ),
	  contentType: "text/plain; charset=utf-8",
	  success: function( msg ) {
		  successFunc();
		},
	  error: function( msg ) {
		  failFunc();
		}			   
	});
}

RESTUtil.submitData_URL = function( url, successFunc, failFunc )
{		
	$.ajax({
	  type: "POST",
	  url: url,
	  //data: JSON.stringify( jsonData ),
	  contentType: "text/plain; charset=utf-8",
	  success: function( msg ) {
		  successFunc();
		},
	  error: function( msg ) {
		  failFunc();
		}			   
	});
}


RESTUtil.submitData = function( jsonData, url, submitType, actionSuccess, actionError, loadingStart, loadingEnd)
{
	var jsonDataStr = "";

	if ( jsonData !== undefined )
	{
		jsonDataStr = JSON.stringify( jsonData );
	}
	
	return $.ajax({
		type: submitType
		,url: url
		,data: jsonDataStr
		,datatype: "text"
		,contentType: "application/json; charset=utf-8"
		,async: true
		,success: function( returnData)
		{
			var returnData_Json = {};
			
			try
			{
				returnData_Json = $.parseJSON( returnData );
			}
			catch(err) { }

			if ( actionSuccess !== undefined ) actionSuccess( returnData_Json );
		}
		,error: function( returnData )
		{
			if ( actionError !== undefined ) actionError( returnData );
		}
		,beforeSend: function( xhr ) {
			if ( loadingStart !== undefined ) loadingStart();
		}
	})
	.always( function( data ) {
		if ( loadingEnd !== undefined ) loadingEnd();
	});		
}
