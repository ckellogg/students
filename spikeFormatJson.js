var o = {
    engine: "V8",
    color: "red",
    wheels: 4,
    tires: "bad",
    doors: "welded"
};

console.log(o['engine']);
console.log(o.engine);

var o2 = JSON.parse(JSON.stringify(o));
var str = JSON.stringify(o, null, 3);

console.log(JSON.stringify(o2));
console.log(str);
