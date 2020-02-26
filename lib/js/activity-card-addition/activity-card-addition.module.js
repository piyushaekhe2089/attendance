'use strict';
// Define the `activityLinkAtp` module
angular.module('activityCardAddition', [
    'xeditable',
    'project',
    'circleList',
    'siteList'
])
.run(['editableOptions', 'editableThemes', function(editableOptions, editableThemes){
    editableOptions.theme = 'bs3';
    editableThemes.bs3.inputClass = 'input-lg';
    editableThemes.bs3.buttonsClass = 'btn btn-sm';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-sm" style="margin-top:6px">'
                                      +  '<i class="fa ti-check"></i>'
                                      +  '</button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" class="btn btn-secondary btn-sm" style="margin-top:6px" ng-click="$form.$cancel()">'
                                      +  '<i class="fa ti-close"></i>'
                                      +  '</button>';
/*    editableOptions.submitButtonTitle = "Submit";
    editableOptions.cancelButtonTitle = "Cancel";
    editableOptions.cancelButtonAriaLabel = "Cancel";
*/    
//    editableOptions.displayClearButton = true;
}]);
