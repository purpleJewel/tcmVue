'use strict'

import sock from './sockjs.js';
import stomp from './stomp.js';

let IXW = {};

function _baseFailFn(data){
	console.log(data);
}

IXW.ajax = (name, params, cbFn, failFn) => {
	$.ajax({
		url: '/path/to/file',
		type: 'default GET (Other values: POST)',
		dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		data: params,
	})
	.done(function(data) {
		cbFn(data);
	})
	.fail(function(data) {
		if (failFn && typeof(failFn) === Function)
			return failFn(data.err);
		_baseFailFn(data);
	})
	.always(function(data) {
		console.log("complete");
	});
};

IXW.websocket = (name, params, cbFn, failFn) => {
	// var ws = new SockJS(baseUrl);
	// var client = Stomp.over(ws);
	// client.connect({}, function(frame) {
 //        client.subscribe('/topic/greetings', function(greeting){
 //        	var str = document.getElementById("loginbox").innerHTML;
 //        	str += JSON.parse(greeting.body).content + '<br/>';
 //            document.getElementById("loginbox").innerHTML = str;
 //        });
 //    }, function(err) {
 //    	 alert(err);  
 //    });
};

exports.ajax = IXW.ajax;

exports.websocket = IXW.websocket;