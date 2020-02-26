angular.module('core')
  .filter('redirect', function () {
    return function (url) {
      window.location = url;
    };
  })
  .filter('capitalize', function () {
    return function (text) {
      if(text.indexOf(' ') !== -1){
        var tempStr;
        tempStr = text.split(" ");

        for(i=0; i<tempStr.length; i++){
          tempStr[i] = tempStr[i].substring(0,1).toUpperCase() + tempStr[i].substring(1);
        }
        return tempStr.toString().replace(/,/g, ' ');
      }
      return text.substring(0,1).toUpperCase() + text.substring(1);
    }
  });
