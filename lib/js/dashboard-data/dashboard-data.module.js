'use strict';
// Define the `dashboardData` module
angular.module('dashboardData', [
	'dashboard',
	'mapboxgl-directive'
])
.run([function () {
	mapboxgl.accessToken = 'pk.eyJ1IjoicGl5dXNoYWVraGUiLCJhIjoiY2p2ZjM5aTlmMjgybzQ0bXkzemllMm0yNSJ9.iOWtU4HZwizXqr3CCKH7vg';
	var google_api_key = "AIzaSyCzEdQihoBOCqscqtcC6mfIOCVtyhtm-OA"; //"AIzaSyCcfT7M0ULoFYMp_aX2xX9pm2TxluUVQ8M";
  }]);

  // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCcfT7M0ULoFYMp_aX2xX9pm2TxluUVQ8M