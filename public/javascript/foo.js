// document.getElementById('logout_button').style.display = 'none';
$(document).ready(function(){
	console.log($('.bootstrap-iso form').length);
        var date_input=$('input[name="date"]'); //our date input has the name "date"
        var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        date_input.datepicker({
            format: 'mm/dd/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        });
        var uri = window.location.toString();
	    if (uri.indexOf("?") > 0) {
	        var clean_uri = uri.substring(0, uri.indexOf("?"));
	        console.log(clean_uri);
	        window.history.replaceState({}, document.title, clean_uri);
	    }
    })

$('.error_message').hide();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('info');
    // console.log("dsssd");
    if(myParam) {

    	$('.error_message').text(myParam);
        $('.error_message').show();
}

