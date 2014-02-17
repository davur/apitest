
function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function nl2br(str) {
	return String(str).replace(/\\n/g, '<br>');
}

function supportsLocalStorage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

var history = [];
function loadHistory() {
	if (!supportsLocalStorage()) { return false; }

	history = $.parseJSON(localStorage['apitest.history']);
}
function saveToHistory(url, data, type, statusText) {
	if (!supportsLocalStorage()) { return false; }

	history.push({
			url:url,
			data:data,
			type:type,
			statusText:statusText
	});

	while (history.length > 10) {
		history.shift();
	}

	localStorage['apitest.history'] = JSON.stringify(history);
}

function showHistory() {
	if (!supportsLocalStorage()) { return false; }

	$("#history").empty();

	for (i=0; i<history.length; i++)
	{
		$("<pre>"+htmlEntities(JSON.stringify(history[i], null, 3))+"</pre>").prependTo("#history");
	}
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

	$('.btn').button();
	loadHistory();
	showHistory();

// 	if (history.length > 0) {
// 		latest = history[history.length-1];
// 		$("#url").val(latest.url);
// 		$("#data").val(JSON.stringify(latest.data, null, 3));
// 		$(".requesttype").attr("checked","").parent().removeClass('active');
// 		$(".requesttype[value=" + latest.type + "]").attr("checked","checked").parent().addClass('active');
// 	}
// 	else
// 	{
		var origin = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port : '')+'/';
		$("#url").val(origin);
// 	}

// 	// Disable Ctrl+R and Cmd+R
// 	// http://stackoverflow.com/questions/7738139/catch-commandr-in-safari-with-jquery
// 	$(document).keydown(disableRefresh);
// 	$(document).keyup(function (e) {
// 		which = e.which || e.keyCode;
// 		delete keys[which];
// 	});


	$( "form").on("submit", function(ev) {
		ev.preventDefault();

		url = $("#url").val();
		data = $.parseJSON($('#data').val());
		requestType = $(".requesttype:checked").val();

		$.ajax({
			type: requestType,
			url: url,
			data: data,
			dataType: "json"
		})
		.done(function(res) {
				$("<pre>"+htmlEntities(JSON.stringify(res, null, 3))+"</pre>").prependTo("#result");

				//$("#result").prepend("<hr>").prepend($("<div>" + htmlEntities(JSON.stringify(res, null, 3))+"</div>"));
				//$("textarea").focus();
		}).complete(function(jqXHR) {
			saveToHistory(url,data,requestType,jqXHR.status + ' - ' + jqXHR.statusText);
			showHistory();
		});
	});
	$( ".requesttype").parent().on("click", function(ev) {
		$("form").submit();
	});

	$("#history pre").on('click', function(){
		var $this = $(this),
			entry = $.parseJSON($this.text());
		$("#url").val(entry.url);
		$("#data").val(JSON.stringify(entry.data, null, 3));
		$(".requesttype").attr("checked","").parent().removeClass('active');
		$(".requesttype[value=" + entry.type + "]").attr("checked","checked").parent().addClass('active');
	});
	$("#history pre:first").click();
});
