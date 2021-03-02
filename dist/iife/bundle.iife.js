var doormanjs=function(e){"use strict";var r=["string","array","object","number","boolean","date"],t={missingValuesAllowed:!1,extraValuesAllowed:!1};function n(e,r){return Object.keys(e).forEach((function(t){var n=e[t];!function(e,r){switch(e){case"boolean":return function(e){if("boolean"!=typeof e)throw new Error("The value: "+JSON.stringify(e)+" is not a Boolean");return!0}(r);case"string":return function(e){if("string"!=typeof e)throw new Error("The value: "+JSON.stringify(e)+" is not a String");return!0}(r);case"number":return function(e){if("number"!=typeof e)throw new Error("The value: "+JSON.stringify(e)+" is not a Number");return!0}(r);case"object":return o(r);case"date":return function(e){if(e instanceof Date==!1)throw new Error("The value: "+JSON.stringify(e)+" is not a Date");return!0}(r);case"array":return function(e){if(!Array.isArray(e))throw new Error("The value: "+JSON.stringify(e)+" is not a Array");return!0}(r);default:;}}(r[t],n)})),!0}function o(e){if("object"!=typeof e||Array.isArray(e)||e instanceof Date)throw new Error("The value: "+JSON.stringify(e)+" is not a Object");return!0}return e.validate=function(e){var a=e.target,i=e.schema,u=e.options,s=void 0===u?{}:u,c=Object.assign(t,s),f=c.extraValuesAllowed,l=c.missingValuesAllowed;return!!function(e){return o(e),Object.values(e).reduce((function(e,t){if(e&&!(e=r.includes(t)))throw new Error("The parameter of '"+t+"' is not recognized as a valid key,\n          Please use 'string', 'array', 'object', 'number' or 'boolean'");return e}),!0)}(i)&&(!!function(e){return o(e),!0}(a)&&(!(!f&&!function(e,r){var t=Object.keys(e),n=Object.keys(r).filter((function(e){return!t.includes(e)}));if(n.length)throw new Error("You have unaccounted missing values ["+n.toString()+"] on the target object");return!0}(a,i))&&(!(!l&&!function(e,r){var t=Object.keys(e),n=Object.keys(r),o=t.filter((function(e){return!n.includes(e)}));if(o.length)throw new Error("You have unaccounted extra values["+o.toString()+"] on the target object");return!0}(a,i))&&n(a,i))))},Object.defineProperty(e,"__esModule",{value:!0}),e}({});
