
/* Controllers */
// 
// var apitestApp = angular.module('apitestApp', []);
// 
// apitestApp.controller('CallHistoryCtrl', function($scope) {
//   $scope.call_history = [];
// 
//   $scope.call_url = '';
//   $scope.call_data = '{}';
// });





function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function nl2br(str) {
	return String(str).replace(/\\n/g, '<br>');
}


// var keys = {};
// function disableRefresh(e) {
// 	which = e.which || e.keyCode;
// 	keys[which] = true;
// 
// 	//CTRL+R on a PC    
// 	if(keys[17] && keys[82])
// 	{
// 		console.log('Don\'t refresh');
// 		return false;
// 	}   
// 
// 	//COMMAND+R an a Mac    
// 	if(keys[81] && keys[91])
// 	{
// 		console.log('Don\'t refresh');
// 		return false;
// 	}       
// }

var url;

$( document ).ready(function(){

// 	// Disable Ctrl+R and Cmd+R
// 	// http://stackoverflow.com/questions/7738139/catch-commandr-in-safari-with-jquery
// 	$(document).keydown(disableRefresh);
// 	$(document).keyup(function (e) {
// 		which = e.which || e.keyCode;
// 		delete keys[which];
// 	});


	$( "#gogogo").on("click", function(ev) {
		ev.preventDefault();

		url = "http://dav.local/~davurclementsen/oznews/backend/users/add.json";
		url = $("#url").val();
		data = {"name":"bob"};
		data = $.parseJSON($('#data').val());

		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: function(res) {
				console.log(res);
				$("<pre>"+htmlEntities(JSON.stringify(res, null, 3))+"</pre>").prependTo("#result");

				//$("#result").prepend("<hr>").prepend($("<div>" + htmlEntities(JSON.stringify(res, null, 3))+"</div>"));
				//$("textarea").focus();
			},
			dataType: "json"
		});	
	});
});
