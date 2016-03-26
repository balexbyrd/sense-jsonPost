var gid;
var eht;
var ewd;

function getCurrSel(qApp,urlP,cnt){	
	var str = {};
	qApp.getList("CurrentSelections", function(reply) {	 
		if(cnt != 2){
			$(':submit').attr("disabled", false);
			return false;
		}
		var selectionslist ="";	 
		var mySelectedFields = reply.qSelectionObject.qSelections;	 

		var mySelectedFields_arrayLength = mySelectedFields.length;
		
		for (var i = 0; i < mySelectedFields_arrayLength; i++) {			
			var fld = mySelectedFields[i].qField;
			var fvlu = mySelectedFields[i].qSelected;
			str[fld] = fvlu;
		};		
		var jsonTxt = JSON.stringify(str, null, '\t');
		cnt += 1;
		//jsonTxt = jsonTxt.replace(/"(\w+)"\s*:/g, '$1:'); // Removes quotes from keys				
		console.log(jsonTxt);
		AjaxCall(jsonTxt,urlP);		
	});
};

//http://jsonplaceholder.typicode.com/
//https://github.com/typicode/jsonplaceholder#how-to
function AjaxCall(jsonTxt,urlP){
	var pst = $.post(urlP, jsonTxt, function(data){ // Default = 'http://jsonplaceholder.typicode.com/posts'	  
	  $('.jsonText').append('<p>Request: '+jsonTxt+' | Response: <b>Success!</b></p>');
	})
	//http://api.jquery.com/jquery.post/
	.fail(function(){	
		$('.jsonText').append('<p>Request: '+jsonTxt+' | Response: <b>Failed!</b></p>');
	})
	$(':submit').attr("disabled", false);
};

define( ['jquery','js/qlik','./js/tipped','css!./css/tipped.css','css!./css/gcsStyle.css'], //
    function ($,qlik,tipped) {
        'use strict';
        return {
            definition: {
                type: "items",
                component: "accordion",
                items: {				
                    jsonURL: {
						ref: "props.urlPost",
						label: "JSON URL",
						type: "string",
						defaultValue: "http://jsonplaceholder.typicode.com/posts"
					},
                    bName: {
						ref: "props.bName",
						label: "Button Name",
						type: "string",
						defaultValue: "-Enter Button Name-"
					}					
                }
            },
            paint: function ( $element, layout) {								
				
				$element.empty();
				var id = layout.qInfo.qId + '_ext';
				var $Create = $( '#' + id );
				var qApp = qlik.currApp();
				var bName = layout.props.bName;			// Button Name
				var urlP = layout.props.urlPost;		// URL to post JSON to
				eht = $element.height();
				ewd = $element.width()/2;				
				
				var cnt = 1;
				$Create = $( document.createElement( 'div' ) );
				$Create.attr( 'id', id );			
				gid = "gcs_"+id;				
				$Create.html( '<button id="'+gid+'" class="button button1" button="submit" style="height:'+eht+'px;">'+bName+'</button><p id="gcs" class="jsonText"></p>' );
				$element.append( $Create );				 
				$(':submit').attr("disabled", false);

				tipped.create('#'+gid+'', 'Automatically get the fields and rows in the current selection toolbar and create a JSON post', { position: 'top',fadeIn: 400,fadeOut: 180, size: 'large',behavior: 'hide'});
				
				$('#'+gid).on('click', function() {
					cnt = 2;
					$(':submit').attr("disabled", true);					

					$('#'+gid+'').css({
							postion: 'absolute',
							top: 0,
							left: 0,
							width: ewd,
							height: eht
					});
					
					$('#gcs').css({
							top: 0,
							left: ewd
					});						
					getCurrSel(qApp,urlP,cnt);
				});
			}
        };
    });
