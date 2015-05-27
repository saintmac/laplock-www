/**
 * Created by saintmac on 26/05/15.
 */

jQuery(document).ready(function($){
    //open the lateral panel
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

    var $number = $('#number');
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
