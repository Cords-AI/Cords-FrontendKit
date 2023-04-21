export function serialize(obj, prefix = null) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      if (typeof v === 'object' && !Object.keys(v).length) {
        v = true;
      }
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        k + "=" + encodeURIComponent(v));
    }
  }
  return str.join('&');
}

// export function deserialize(queryString, prefix = null): object {
//   const components = queryString.split('&');
//   const result = {};
//   components.forEach((component) => {
//     const row = component.split('=');
//     const key = row[0];
//     const matches = key.match(/(.*)\[(.*)]/);
//     if(matches) {
//       const objKey = matches[1];
//       result[objKey] = result[objKey] || {};
//       const property = matches[2];
//       const value = row[1];
//       // TODO: handle simple values
//       result[objKey][property] = result[objKey][property] || [];
//       result[objKey][property].push(value);
//       return;
//     }
//     const value = row[1];
//     if (!result[key]) {
//       result[key] = value;
//       return;
//     }
//     if (!Array.isArray(result[key])) {
//       result[key] = [result[key]];
//     }
//     result[key].push(value);
//   });
//   return result;
// }
