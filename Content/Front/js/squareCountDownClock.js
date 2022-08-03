/*

# square count down clock jQuery Pluggin
#	open source script by Lordwiz
#
#	Author: Ajakaiye Taiwo Peter
#	Contact: boyiajas@gmail.com
#
# Created on 3/11/2020
# Copyright: Please feel free to modify, re-distribute and share 
#
*/

(function($){
	$.fn.squareCountDownClock = function(options) { //start of the squareCountDownClock jquery customer plugin function
		var element = this;

		let settings = $.extend({
			countdownDate: 'Nov 03, 2020 15:37:25',
			topColor: 'orange',
			bottomColor: null, 
			innerLabelColor: '#fff'
		}, options); 

		const FULL_DASH_ARRAY = 283;
	    const WARNING_THRESHOLD = 10;
	    const ALERT_THRESHOLD = 5;

	    // Start with an initial value of 20 seconds
	    const TIME_LIMIT1 = 60;
	    const TIME_LIMIT2 = 60;
	    const TIME_LIMIT3 = 60;
	    const TIME_LIMIT4 = 60;

	    // Set the date we're counting down to
	    var countDownInputDate = settings.countdownDate;//document.getElementById('countDownInputDate').innerHTML;
	    //alert(countDownInputDate);
	    const countDownDate = new Date(countDownInputDate).getTime();

	     // Initially, no time has passed, but this will count up
	    // and subtract from the TIME_LIMIT
	    let timePassed1 = 0;
	    let timePassed2 = 0;
	    let timePassed3 = 0;
	    let timePassed4 = 0;
	    let timeLeft1 = TIME_LIMIT1;
	    let timeLeft2 = TIME_LIMIT2;
	    let timeLeft3 = TIME_LIMIT3;
	    let timeLeft4 = TIME_LIMIT4;

	    let timerInterval = null;
	    const COLOR_CODES = {
	        color: settings.topColor
	    };

	    let remainingPathColor = COLOR_CODES;
	    
	    	element.html(' <div class="base-timer" id="day"> <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">'+ 
		    '<g class="base-timer__circle"> <rect class="base-timer__path-elapsed" x="10" y="10" width="80" height="80" /> </g>'+
	        '<path id="base-timer-path-remaining1" stroke-dasharray="480" class="base-timer__path-remaining  '+remainingPathColor.color+'"'+
	        '    d="M10,90 10,10 90,10 90 90,10 90,-80" style="fill:none;"></path> </svg>'+
	      	'<span id="base-timer-label1" class="base-timer__label" style="color:'+settings.innerLabelColor+'" >'+formatTimeLeft1(timeLeft1)+'</span>'+
	      	'<p class="text-center text-white">DAYS</p>'+
	    	'</div>'+

	    	'<div class="base-timer" id="hour"> <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">'+
		        '<g class="base-timer__circle"> <rect class="base-timer__path-elapsed" x="10" y="10" width="80" height="80" /></g>'+
		        '<path id="base-timer-path-remaining2" stroke-dasharray="480" class="base-timer__path-remaining '+remainingPathColor.color+'"'+
		            'd="M10,90 10,10 90,10 90 90,10 90,-80" style="fill:none;"></path></svg>'+
	      		'<span id="base-timer-label2" class="base-timer__label" style="color:'+settings.innerLabelColor+'">     <!-- Remaining time label -->'+formatTimeLeft2(timeLeft2)+'</span>'+
	      		'<p class="text-center text-white">HOURS</p>'+
	      	'</div>'+

	      	'<div class="base-timer" id="minutes"> <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">'+
		        '<g class="base-timer__circle"> <rect class="base-timer__path-elapsed" x="10" y="10" width="80" height="80" /></g>'+
		        '<path id="base-timer-path-remaining3" stroke-dasharray="480" class="base-timer__path-remaining '+remainingPathColor.color+'"'+
		            'd="M10,90 10,10 90,10 90 90,10 90,-80" style="fill:none;"></path></svg>'+
	      		'<span id="base-timer-label3" class="base-timer__label" style="color:'+settings.innerLabelColor+'">     <!-- Remaining time label -->'+formatTimeLeft4(timeLeft4)+'</span>'+
	      		'<p class="text-center text-white">MINUTES</p>'+
	      	'</div>'+

	      	'<div class="base-timer" id="seconds"> <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">'+
		        '<g class="base-timer__circle"> <rect class="base-timer__path-elapsed" x="10" y="10" width="80" height="80" /></g>'+
		        '<path id="base-timer-path-remaining4" stroke-dasharray="480" class="base-timer__path-remaining '+remainingPathColor.color+'"'+
		            'd="M10,90 10,10 90,10 90 90,10 90,-80" style="fill:none;"></path></svg>'+
	      		'<span id="base-timer-label4" class="base-timer__label" style="color:'+settings.innerLabelColor+'">     <!-- Remaining time label -->'+formatTimeLeft4(timeLeft4)+'</span>'+
	      		'<p class="text-center text-white">SECONDS</p>'+
	      	'</div>');

	      	//element.html = 'testing maeesage';

	      	//return element;
	     

    //startTimer(); //here we are starting the counter down timer

    element.onTimesUp = function (){
    	clearInterval(timerInterval);
    }

    element.startTimer = function (){
    	//element.renderPage();
    	
    	timerInterval = setInterval(() => {
        //alert("testing 2");
        
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // The amount of time passed increments by one
        timePassed1 = days += 1;
        timeLeft1 = days;//TIME_LIMIT1 - timePassed1;
        
        timePassed2 = timePassed2 += 1;
        timeLeft2 = hours;//TIME_LIMIT2 - timePassed2;
        
        timePassed3 = timePassed3 += 1;
        timeLeft3 = minutes;//TIME_LIMIT3 - timePassed3;
        
        timePassed4 = timePassed4 += 1;
        timeLeft4 = seconds;//TIME_LIMIT4 - timePassed4;
        
        // The time left label is updated
        //document.getElementById("base-timer-label1").innerHTML = formatTimeLeft1(timeLeft1);
        $('#base-timer-label1').html(formatTimeLeft1(timeLeft1));
        $('#base-timer-label2').html(formatTimeLeft1(timeLeft2));
        $('#base-timer-label3').html(formatTimeLeft1(timeLeft3));
        $('#base-timer-label4').html(formatTimeLeft1(timeLeft4));
        //document.getElementById("base-timer-label2").innerHTML = formatTimeLeft2(timeLeft2);
        //document.getElementById("base-timer-label3").innerHTML = formatTimeLeft3(timeLeft3);
        //document.getElementById("base-timer-label4").innerHTML = formatTimeLeft4(timeLeft4);
        
        element.setCircleDasharray1();
        element.setCircleDasharray2();
        element.setCircleDasharray3();
        element.setCircleDasharray4();
        

        if (timeLeft1 <= 0 && timeLeft2 <= 0 && timeLeft3 <= 0 && timeLeft4 <= 0) {
            
             // The time left label is updated
            //document.getElementById("base-timer-label1").innerHTML = formatTimeLeft1(0);
            //document.getElementById("base-timer-label2").innerHTML = formatTimeLeft2(0);
            //document.getElementById("base-timer-label3").innerHTML = formatTimeLeft3(0);
            //document.getElementById("base-timer-label4").innerHTML = formatTimeLeft4(0);
            $('#base-timer-label1').html(formatTimeLeft1(0));
	        $('#base-timer-label2').html(formatTimeLeft2(0));
	        $('#base-timer-label3').html(formatTimeLeft3(0));
	        $('#base-timer-label4').html(formatTimeLeft4(0));
          	element.onTimesUp();
           
           return element;
        }else{
        	return element;
          //setRemainingPathColor(timeLeft1);
        }
      }, 1000);
    }

    function formatTimeLeft1(time) {
      //method is used to round off the number passed as a parameter to its nearest integer in Downward direction
      // The largest round integer less than or equal to the result of time divided being by 60.
      const minutes = Math.floor(time / 60);
      
      // Seconds are the remainder of the time divided by 60 (modulus operator)
      let seconds = time % 60;
      
      // If the value of seconds is less than 10, then display seconds with a leading zero
      if (seconds < 10) {
        seconds = `0${seconds}`; 
      }

      // The output in MM:SS format
      //return `${minutes}:${seconds}`;
      return `${seconds}`;
    }

    function formatTimeLeft2  (time) {
      //method is used to round off the number passed as a parameter to its nearest integer in Downward direction
      // The largest round integer less than or equal to the result of time divided being by 60.
      const minutes = Math.floor(time / 60);
      
      // Seconds are the remainder of the time divided by 60 (modulus operator)
      let seconds = time % 60;
      
      // If the value of seconds is less than 10, then display seconds with a leading zero
      if (seconds < 10) {
        seconds = `0${seconds}`; 
      }

      // The output in MM:SS format
      //return `${minutes}:${seconds}`;
      return `${seconds}`;
    }

    function formatTimeLeft3 (time) {
      //method is used to round off the number passed as a parameter to its nearest integer in Downward direction
      // The largest round integer less than or equal to the result of time divided being by 60.
      const minutes = Math.floor(time / 60);
      
      // Seconds are the remainder of the time divided by 60 (modulus operator)
      let seconds = time % 60;
      
      // If the value of seconds is less than 10, then display seconds with a leading zero
      if (seconds < 10) {
        seconds = `0${seconds}`; 
      }

      // The output in MM:SS format
      //return `${minutes}:${seconds}`;
      return `${seconds}`;
    }

    function formatTimeLeft4 (time) {
      //method is used to round off the number passed as a parameter to its nearest integer in Downward direction
      // The largest round integer less than or equal to the result of time divided being by 60.
      const minutes = Math.floor(time / 60);
      
      // Seconds are the remainder of the time divided by 60 (modulus operator)
      let seconds = time % 60;
      
      // If the value of seconds is less than 10, then display seconds with a leading zero
      if (seconds < 10) {
        seconds = `0${seconds}`; 
      }

      // The output in MM:SS format
      //return `${minutes}:${seconds}`;
      return `${seconds}`;
    }

    element.calculateTimeFraction1 = function () {
      const rawTimeFraction = timeLeft1 / TIME_LIMIT1;
      return rawTimeFraction - (1 / TIME_LIMIT1) * (1 - rawTimeFraction);
    }
    element.calculateTimeFraction2 = function () {
      const rawTimeFraction = timeLeft2 / TIME_LIMIT1;
      return rawTimeFraction - (1 / TIME_LIMIT1) * (1 - rawTimeFraction);
    }
    element.calculateTimeFraction3 = function () {
      const rawTimeFraction = timeLeft3 / TIME_LIMIT1;
      return rawTimeFraction - (1 / TIME_LIMIT1) * (1 - rawTimeFraction);
    }
    element.calculateTimeFraction4 = function () {
      const rawTimeFraction = timeLeft4 / TIME_LIMIT1;
      return rawTimeFraction - (1 / TIME_LIMIT1) * (1 - rawTimeFraction);
    }

    element.setCircleDasharray1 = function () { 
      const circleDasharray = `${(
        element.calculateTimeFraction1() * FULL_DASH_ARRAY
      ).toFixed(0)} 320`; 
      //document
       // .getElementById("base-timer-path-remaining1")
       // .setAttribute("stroke-dasharray", circleDasharray);
        $('#base-timer-path-remaining1').attr('stroke-dasharray', circleDasharray);
    }
    element.setCircleDasharray2 = function () { 
      const circleDasharray = `${(
        element.calculateTimeFraction2() * FULL_DASH_ARRAY
      ).toFixed(0)} 320`; 
      //document
        //.getElementById("base-timer-path-remaining2")
        //.setAttribute("stroke-dasharray", circleDasharray);
        $('#base-timer-path-remaining2').attr('stroke-dasharray', circleDasharray);
    }
    element.setCircleDasharray3 = function () { 
      const circleDasharray = `${(
        element.calculateTimeFraction3() * FULL_DASH_ARRAY
      ).toFixed(0)} 320`; 
      //document
        //.getElementById("base-timer-path-remaining3")
        //.setAttribute("stroke-dasharray", circleDasharray);
        $('#base-timer-path-remaining3').attr('stroke-dasharray', circleDasharray);
    }
    element.setCircleDasharray4 = function () { 
      const circleDasharray = `${(
        element.calculateTimeFraction4() * FULL_DASH_ARRAY
      ).toFixed(0)} 320`; 
      //document
        //.getElementById("base-timer-path-remaining4")
        //.setAttribute("stroke-dasharray", circleDasharray);
        $('#base-timer-path-remaining4').attr('stroke-dasharray', circleDasharray);
    }
/*
    element.setRemainingPathColor = function (timeLeft1) {
      	const { alert, warning, info } = COLOR_CODES;
	    if (timeLeft1 <= alert.threshold) {
	        document
	          .getElementById("base-timer-path-remaining")
	          .classList.remove(warning.color);
	        document
	          .getElementById("base-timer-path-remaining")
	          .classList.add(alert.color);
	    } else if (timeLeft1 <= warning.threshold) {
	        document
	          .getElementById("base-timer-path-remaining")
	          .classList.remove(info.color);
	        document
	          .getElementById("base-timer-path-remaining")
	          .classList.add(warning.color);
	    }
    } */

	    //alert(countDownInputDate);
		//console.log($(this).text());

		return element;
	} //start of the startCountDownTimer jquery customer plugin function

})(jQuery);


