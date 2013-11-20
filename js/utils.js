Math.randomInt = function (min, max) {
    return Math.round((max - min) * Math.random() + min);
};
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};
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