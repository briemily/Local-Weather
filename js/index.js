$(document).ready(function() {

	var api = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=";
	var key = "&APPID=039a3eef2532be1a795994145b70dc46&units=imperial";
	var APIurl = "";
	var city = "";

	$.getJSON('http://ip-api.com/json/?callback=?', function(json) {
		city = json.city;
		getData();
	});

	$("#citySubmit").click(function() {
		city = document.getElementById("loc").value;
		getData();
	});

	$('#loc').keypress(function(e) {
		if (e.which == 13) {
			e.preventDefault();
			city = document.getElementById("loc").value;
			getData();
		}
	});

	function getData() {
		var JSONurl = api + city + key;
		console.log(JSONurl);

		$.getJSON(JSONurl, function(json) {

			var locationHTML = json.name;
			$("#location").html(locationHTML);

			var tempHTML = Math.round(json.main.temp) + "&deg; F";
			$("#temp").html(tempHTML);

			var cloudHTML = json.clouds.all + " %";
			$("#clouds").html(cloudHTML);

			var windHTML = json.wind.speed + " mph";
			$("#wind").html(windHTML);

			var icon = "<i class=\"owf owf-" + json.weather[0].id + " owf-3x\"></i>";
			$("#icon").html(icon);

			var action = 1;

			$("#convert").on("click", convertTemp);

			function convertTemp() {
				if (action == 1) {
					tempHTML = Math.round((Math.round(json.main.temp) - 32) * (5 / 9)) + "&deg; C";
					$("#temp").html(tempHTML);
					$("#convert").html("&deg; F");
					action = 2;
				} else {
					tempHTML = Math.round(json.main.temp) + "&deg; F";
					$("#temp").html(tempHTML);
					$("#convert").html("&deg; C");
					action = 1;
				}
			}

			var condHTML = json.weather[0].description;
			$("#conditions").html(condHTML);
		});
	}

});
