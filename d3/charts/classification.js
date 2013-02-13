/**
	Functions that attempt to automatically classify the attributes of a dataset.
	Many, many assumptions are made.

	Mazza define a number of steps, the ones of interest are: 1) Data Type 2) Dimensions 
	3) Data structure.

	1) Data Type;
		Quantitative, Ordinal, Nominal. Quantitative if a number, otherwise one of the
		other two. Deciding if data elements are ordinal or nominal appears to be a pretty
		hard problem.
	2) Dimensions:
		Univariate, Bivariate, Trivariate, Multivariate. The simplest was to do this is to 
		simply look at the size of each data element.
		Univariate: One dimension varies with respect to another. Or length = 2
*/
function Dataset(size, dimension, keys, types) {
	if ( !(this instanceof arguments.callee) ) 
   		throw new Error("Constructor called as a function");

	this.size = size;
	this.dimension = dimension;
	this.keys = keys;
	this.types = types;
}

/*REDUNEDNTDataset.prototype.toString = function() {
	return "Size: ";//+ this.size + " Dimensions: " + this.dimensions = " Keys: " + this.keys + " Types: " this.types; 
}*/



//http://phrogz.net/JS/classes/OOPinJS.html
function Classifier(data){
	if ( !(this instanceof arguments.callee) ) 
   		throw new Error("Constructor called as a function");

   	//Underscore is the convention for private in this language...
	this._row = data[0];

	this.size = data.length;
	this.dimension = this.countProperties(this._row);
	this.keys = d3.keys(this._row);
	this.types = this.determineTypes();

	var properties = new Dataset(this.size, this.dimension, this.keys, this.types);

}


//Adding functions to the prototype limits access permissions but is more efficient
Classifier.prototype.test = function() {
	console.log("Hello");
}

Classifier.prototype.countProperties = function(obj) { 
	var count = 0;

	for(var prop in obj) {
		if(obj.hasOwnProperty(prop))
			++count;
	}
	return count;
}

Classifier.prototype.isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}


Classifier.prototype.determineTypes = function() {
	var result = new Array(this.dimension);

	for(var i=0; i < this.dimension; i++) {

		var element = this._row[this.keys[i]];
		if (this.isNumber(element)) {
			result[i] = "quantitative";
		} else { //if element is categorical or nominal
			result[i] = "categorical";
		}

	}
	return result;
}

Classifier.prototype.getProperties = function() {
	return this.properties; //Even if the object is public you never know when a getter will save yous
}







/*function Classifier(data) {
	if ( !(this instanceof arguments.callee) ) 
   		throw new Error("Constructor called as a function");
	var element = data[0];

	this.length = data.length;
	this.keys = d3.keys(this.element);

	determine_type();

	this.test = function() {
		return "this is a public function";
	}


	function determine_type(data) {
		for(var i=0; i<this.length; i++) {
			console.log(data[i]);
			}
		}

	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}


}*/


	