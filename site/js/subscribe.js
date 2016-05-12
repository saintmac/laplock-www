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




    var $buttonM = $($('.stripe-button-el')[0]);
    var $buttonY = $($('.stripe-button-el')[1]);
    var $buttonText = $($buttonM.children('span')[0]);

    var buttonText = $buttonText.html();

    var disableButton = function() {
        $buttonM.attr('disabled', 'disabled');
        $buttonText.html('Please enter a valid phone number');
        $('.yearly').addClass('hidden');
        $buttonY.hide()
    };

    var enableButton = function() {
        $buttonM.removeAttr('disabled');
        $buttonText.html(buttonText);
        $('.yearly').removeClass('hidden');
        $buttonY.show()
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

    plans = {
        monthly: "4s623j63ttkk1tr",
        yearly: "tbji6jqt6fye2nf"
    };

    trackPayment = function(plan) {
        return function () {
            $plan_id = $('#plan_id');
            plan_id = plans[plan];
            $plan_id.attr('value', plan_id)
            console.log('setting up', plan_id)

            number = cleanNumber($number.val());
            mixpanel.alias(number);
            mixpanel.track('payment started', {'$phone': number, 'plan': plan});
            mixpanel.people.set({'$phone': number});
            mixpanel.people.set({plan: plan});
            mixpanel.people.set_once('payment started', 0);
            mixpanel.people.increment('payment started');
        };
    };

    $buttonM.click(trackPayment('monthly'));
    $buttonY.click(trackPayment('yearly'));

    if (!validNumber($number.val()))
        disableButton();

    //$yearlyBox = $('#yearly')
    //$yearlyBox.change(function() {
    //    yearly = $yearlyBox.is(':checked')
    //    console.log((yearly?'yearly':'monthly') + ' plan');
    //    $button.
    //});









});
