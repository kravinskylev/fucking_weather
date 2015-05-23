jQuery(document).ready(function($) {
  $.ajax({
  url : "https://api.wunderground.com/api/45bc33d3467bf2dc/geolookup/conditions/q/CO/Denver.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var city = parsed_json['location']['city'];
  var state = parsed_json['location']['state'];
  var weather = parsed_json['current_observation']['weather'];
  var x = weather.toLowerCase();
  var location = "&nbsp" + city + ", " + state

      if (x.includes("cloud")) {
     document.getElementById('para').innerHTML = "Cloudy with a chance of bullshit"
  } else if (x.includes("overcast")) {
     document.getElementById('para').innerHTML = "Fifty fucking shades of grey."
  } else if (x.includes("rain")) {
     document.getElementById('para').innerHTML = "Cloudy with a chance of bullshit"
  } else if (x.includes("clear")) {
     document.getElementById('para').innerHTML = "Suns out, get naked. Is that right?"
  } else {
     document.getElementById('para').innerHTML = "WTF is going on outside?"
  }
  document.getElementById('loc').innerHTML = location;

  document.getElementById("loc").style.color = "#515151";
  }

});
});
