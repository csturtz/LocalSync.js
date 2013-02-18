// Built with inspiration from Eli Grey's Object.watch polyfill at https://gist.github.com/eligrey/384583, revision 5

if (!Object.prototype.watch) {
  Object.defineProperty(Object.prototype, "watch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop, handler) {
			var
			  oldval = this[prop]
			, newval = oldval
			, getter = function () {
				return newval;
			}
			, setter = function (val) {
				oldval = newval;
                return newval = handler.call(this, prop, oldval, val);
			}
			;
			
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}

Storage.prototype.setData = function(key, value) {
    if (typeof value === "string") {
        this.setItem(key,value);
    } else {
        this.setItem(key, JSON.stringify(value));
    }
}

Storage.prototype.getData = function(key) {
    var rawValue = this.getItem(key);
    if (rawValue.indexOf('{') === 0 || rawValue.indexOf('[') === 0) {
        return JSON.parse(rawValue);
    } 
    return null;
}

if (!Object.prototype.localSync) {
    Object.prototype.localSync = function(prop,key) {
        this[prop] = localStorage.getData(key);
        this.watch(prop,function(prop,oldval,val){
            localStorage.setData(key,val);
            return val;
        });
    };
}

//example
//var obj = {};
//obj.localSync('val','chad.val1');
//obj.val = "test";
//console.log(localStorage.getData('chad.val1'));
//obj.val = {a:'b', b: 'c'};
//console.log(localStorage.getData('chad.val1'));
//obj.val = [1,2,3];
//console.log(localStorage.getData('chad.val1').length);


