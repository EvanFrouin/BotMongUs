
function setMute(){
  var datetime = new Date();
  $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
    console.log(data.geobytesremoteip);
  
    $.ajax({
      url: '/mute',
      type: 'POST',
      data: {
        sip : data.geobytesremoteip,
        date : datetime,
        utc : datetime.getTime()
      },
      success: getIP
    });
  });

}

function setUnMute(){
  var datetime = new Date();
  $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
    console.log(data.geobytesremoteip);
  
    $.ajax({
      url: '/unmute',
      type: 'POST',
      data: {
        sip : data.geobytesremoteip,
        date : datetime,
        utc : datetime.getTime()
      },
      success: getIP
    });
  });

}

function getPlayers(){
  var datetime = new Date();
  $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
    console.log(data.geobytesremoteip);
  
    $.ajax({
      url: '/getplayers',
      type: 'POST',
      data: {
        sip : data.geobytesremoteip,
        date : datetime,
        utc : datetime.getTime()
      },
      success: filling
    });
  });
}



function endGame(){
  var datetime = new Date();
  $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
    console.log(data.geobytesremoteip);
  
    $.ajax({
      url: '/endgame',
      type: 'POST',
      data: {
        sip : data.geobytesremoteip,
        date : datetime,
        utc : datetime.getTime()
      },
      success: getIP
    });
  });

}

function dead(player){
  var datetime = new Date();
  $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
    console.log(data.geobytesremoteip);
  
    $.ajax({
      url: '/dead',
      type: 'POST',
      data: {
        dead: player,
        sip : data.geobytesremoteip,
        date : datetime,
        utc : datetime.getTime()
      },
      success: getIP
    });
  });

}

function revive(player){
  var datetime = new Date();
  $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
    console.log(data.geobytesremoteip);
  
    $.ajax({
      url: '/revive',
      type: 'POST',
      data: {
        revive: player,
        sip : data.geobytesremoteip,
        date : datetime,
        utc : datetime.getTime()
      },
      success: getIP
    });
  });

}

function filling(jsonData){
  $.each(jsonData, function (key, val) {
    if(val != null){
      $("#"+key).text(val);
    }
  });

}

function getIP(jsonData){
  $.each(jsonData, function (key, val) {
    
  });
  console.log("OK")
  
}
