var x = document.getElementById("out");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}
// need to add function callback for error so I can have descriptive errors in CDT

function abbrState(input, to){

    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }
    }
}


jQuery(document).ready(function($) {

  $.get("https://ipinfo.io?token=2855c965e609d1", function(response) {
      state = (response.ip, response.region);
      abbr  = abbrState('' + state, 'abbr');
      city  = (response.ip, response.city);

      $.ajax({
      url : "https://api.wunderground.com/api/45bc33d3467bf2dc/geolookup/conditions/q/" + abbr +  "/" + city + ".json",
      dataType : "jsonp",
      success : function(parsed_json) {
      var city1 = parsed_json['location']['city'];
      var state1 = parsed_json['location']['state'];
      var weather = parsed_json['current_observation']['weather'];
      var x = weather.toLowerCase();
      var location = "&nbsp" + city1 + ", " + state1

          if (x.includes("cloud")) {
         document.getElementById('para').innerHTML = "Cloudy with a chance of bullshit"
      } else if (x.includes("overcast")) {
         document.getElementById('para').innerHTML = "Fifty fucking shades of grey."
      } else if (x.includes("rain")) {
         document.getElementById('para').innerHTML = "Its fucking raining."
      } else if (x.includes("clear")) {
         document.getElementById('para').innerHTML = "Suns out, get naked. Is that right?"
      } else {
         document.getElementById('para').innerHTML = "WTF is going on outside?"
      }
      document.getElementById('loc').innerHTML = city + ", " + abbr;
      }
    });
  }, "jsonp");

  var colors = ['#77DD77', '#779ECB', '#F49AC2', '#CB99C9'];
  var random_color = colors[Math.floor(Math.random() * (colors.length))];
  $('html, body').css('background-color', random_color);
});
