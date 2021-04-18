///-------------------------------------------///
/// developer: CB Lombard
///
/// Template Form Object
///-------------------------------------------///
(function() {
	///-------------------------------------------///
	/// Template Parent function
	///-------------------------------------------///
	Template = function() {
        //define template properties
        this.property;
	};
	///-------------------------------------------///
	///          template Methods				  ///
	///-------------------------------------------///
	Template.prototype = {
       	constructor : Template,
        init: function () {
    		console.log('Template Object init');
        }, 
        // handle template functions
        tempFunc : function(event){


        },     
        //Remove current object from dom
        destroy: function () {
        	template = {};
        }
	};
	//creat new insadince of template object
	selector  = new Template();

})();