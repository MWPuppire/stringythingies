var xregexp = require('xregexp');
var stringutils = function() {};
stringutils.replace = function(input, replaced, output) {
    var cons = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'],
      vows = ['a', 'e', 'i', 'o', 'u'],
      tmp = "";
    if (replaced.indexOf("CON") != -1) {
        for (i = 0; i < cons.length; i++) {
            tmp = replaced.replace("CON", cons[i]);
            input = input.replace(tmp, cons[i] + output);
            tmp = replaced.replace("CON", cons[i].toUpperCase());
            input = input.replace(tmp, cons[i].toUpperCase() + output);
        };
    };
    if (replaced.indexOf("VOW") != -1) {
        for (i = 0; i < vows.length; i++) {
            tmp = replaced.replace("VOW", vows[i]);
            input = input.replace(tmp, vows[i] + output);
            tmp = replaced.replace("VOW", vows[i].toUpperCase());
            input = input.replace(tmp, vows[i].toUpperCase() + output);
        };
    };
    input = input.replace(replaced, output);
    return input;
};
stringutils.camelcase = function(string) {
    return string.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
};
stringutils.titleCase = function(string) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    };
    return splitStr.join(' '); 
};
stringutils.uppercaseFirst = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
stringutils.decamelize = function(string, seperator) {
    seperator = seperator || "_";
    const regex1 = xregexp('([\\p{Ll}\\d])(\\p{Lu})', 'g');
    const regex2 = xregexp('(\\p{Lu}+)(\\p{Lu}[\\p{Ll}\\d]+)', 'g');

    return string.replace(regex1, `$1${separator}$2`).replace(regex2, `$1${separator}$2`).toLowerCase();
};
stringutils.wrap = function(string, options) {
    options = options || {};
    if (string == null) return string;
    var width = options.width || 50;
    var indent = (typeof options.indent === 'string') ? options.indent : "    ";
    var newline = options.newline || "\n" + indent;
    var escape = (typeof options.escape === 'function') ? options.escape : function(str) {return str};
    var regexString = ".{1," + width + "}";
    if (options.cut !== true) regexString += '([\\s\u200B]+|$)|[^\\s\u200B]+?([\\s\u200B]+|$)';
    var re = new RegExp(regexString, 'g');
    var lines = string.match(re) || [];
    var result = indent + lines.map(function(line) {
        if (line.slice(-1) === '\n') line = line.slice(0, line.length - 1);
        return escape(line);
    }).join(newline);
    if (options.trim === true) result = result.replace(/[ \t]*$/gm, "");
    return result
};
stringutils.trim = function(string, chars) {
    string = string.toString();
    if (!string) return "";
    if (!chars) return string.replace(/\s+$/, "");
    chars = chars.toString();
    var letters = string.split(""),
      i = letters.length - 1;
    for (i; i >= 0; i--) {
        if (chars.indexOf(letters[i]) === -1) {
            return string.substring(0, i + 1);
        };
    };
    return string;
};
stringutils.toFunction = function(string) {
    return new Function("return " + string)();
};
stringutils.base64Encode = function(string) {
    return new Buffer(string).toString('base64');
};
stringutils.base64Decode = function(string) {
    return new Buffer(string, 'base64').toString('ascii');
};
stringutils.base64 = function(string, direction) {
    if (!direction) return stringutils.base64Encode(string);
    return stringutils.base64[direction](string);
};
stringutils.base64.encode = function(string) {return stringutils.base64Encode(string)}
stringutils.base64.decode = function(string) {return stringutils.base64Decode(string)}

module.exports = stringutils;
