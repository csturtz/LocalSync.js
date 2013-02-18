
// shim for Object.watch - directly from Eli Grey's gist (revision 5) at https://gist.github.com/eligrey/384583
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

// utility method to set any value (object, array, string, number, etc) into local storage
Storage.prototype.setData = function(key, value) {
    if (typeof value === "string") {
        this.setItem(key,value);
    } else {
        this.setItem(key, JSON.stringify(value));
    }
}

// utility method to read any value (object, array, string, number, etc) from local storage
Storage.prototype.getData = function(key) {
    var rawValue = this.getItem(key);
    if (rawValue.indexOf('{') === 0 || rawValue.indexOf('[') === 0) {
        return JSON.parse(rawValue);
    } 
    return null;
}

// add the localSync() method to the Object prototype
if (!Object.prototype.localSync) {
    Object.prototype.localSync = function(prop,key) {
        this[prop] = localStorage.getData(key);
        this.watch(prop,function(prop,oldval,val){
            localStorage.setData(key,val);
            return val;
        });
    };
}

// TODO
// provide Object.unwatch
// provide way to turn off the sync
// test the getData/setData utility methods

