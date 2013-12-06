// ---------
// Object
// ---------
var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

function isPlainObject(obj) {
    if (!obj || toString.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval)
            return false;

    var has_own_constructor = hasOwn.call(obj, 'constructor');
    var has_is_property_of_method = hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
    // Not own constructor property must be Object
    if (obj.constructor && !has_own_constructor && !has_is_property_of_method)
            return false;

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    var key;
    for ( key in obj ) {}

    return key === undefined || hasOwn.call( obj, key );
};

Object.merge = function () {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
            deep = target;
            target = arguments[1] || {};
            // skip the boolean and the target
            i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && typeof target !== "function") {
            target = {};
    }

    for ( ; i < length; i++ ) {
            // Only deal with non-null/undefined values
            if ( (options = arguments[ i ]) != null ) {
                    // Extend the base object
                    for ( name in options ) {
                            src = target[ name ];
                            copy = options[ name ];

                            // Prevent never-ending loop
                            if ( target === copy ) {
                                    continue;
                            }

                            // Recurse if we're merging plain objects or arrays
                            if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = Array.isArray(copy)) ) ) {
                                    if ( copyIsArray ) {
                                            copyIsArray = false;
                                            clone = src && Array.isArray(src) ? src : [];

                                    } else {
                                            clone = src && isPlainObject(src) ? src : {};
                                    }

                                    // Never move original objects, clone them
                                    target[ name ] = extend( deep, clone, copy );

                            // Don't bring in undefined values
                            } else if ( copy !== undefined ) {
                                    target[ name ] = copy;
                            }
                    }
            }
    }

    // Return the modified object
    return target;
};

// Thanks, James Padosley (http://james.padolsey.com/javascript/deep-copying-of-objects-and-arrays/)
Object.copy = function (obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
}

// ---------
// Array
// ---------

// Thanks, Markus Amalthea Magnu of StackOverflow!
// http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
Array.random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
};

// ---------
// Math
// ---------

// Thanks, numerous posts on the Internet!
Math.randomInt = function (min, max) {
    return Math.round((max - min) * Math.random() + min);
};

// Thanks, numerous posts on the Internet!
Math.randomFloat = function (min, max) {
    return (max - min) * Math.random() + min;
};

// Thanks, Paul Irish: http://www.paulirish.com/2009/random-hex-color-code-snippets/
Math.randomColor = function () {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

// ---------
// Number
// ---------

// Thanks, numerous posts on the Internet!
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

// ---------
// Other
// ---------

// Thanks, Douglas Crockford!
// http://javascript.crockford.com/remedial.html
function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (Object.prototype.toString.call(value) == '[object Array]') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}