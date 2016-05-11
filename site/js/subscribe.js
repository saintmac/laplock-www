/**
 * Created by saintmac on 26/05/15.
 */

jQuery(document).ready(function($){
    //open the lateral panel
    var queryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]], pair[1] ];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }
        return query_string;
    } ();

    var $number = $('#number');

    if (queryString.phone) {
        console.log("we have a phone: " + queryString.phone)
        $number.val(queryString.phone)
    }




    var $button = $('.stripe-button-el');
    var $buttonText = $($button.children('span')[0]);

    var buttonText = $buttonText.html();

    var disableButton = function() {
        $button.attr('disabled', 'disabled');
        $buttonText.html('Please enter a valid phone number');
    };

    var enableButton = function() {
        $button.removeAttr('disabled');
        $buttonText.html(buttonText);
    };


    var stripR = /[^0-9]/gi

    var cleanNumber = function(number) {
        return number.replace(stripR, '');
    };

    var validNumber = function(number) {
        number = number.trim();
        if(number.indexOf('+') === 0) {
            number = cleanNumber(number);
            return (number.length > 8);
        }
        else
            return false;
    };

    $number.keyup(function() {
        var number = $number.val();
        if(validNumber(number)) {
            enableButton();
        }
        else {
            disableButton();
        }
    });

    $button.click(function(){
        number = cleanNumber($number.val());
        mixpanel.alias(number);
        mixpanel.track('payment started', {'$phone': number});
        mixpanel.people.set({'$phone': number});
        mixpanel.people.set_once('payment started', 0);
        mixpanel.people.increment('payment started');
    });

    if (!validNumber($number.val()))
        disableButton();









});
