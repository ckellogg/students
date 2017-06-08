var x = [7, 23, 145, 5421];
var y = '00000' + '5';
y.substr(-4, 4);
var z1 = y.substr(-4, 4);
var z2 = function(num) {
    var y = '0000' + num;
    return y.slice(-4);
    return ('' + 6).length;
}

zeroPads = ['0000', '000', '00', '0', ''];
var foo = 236;
var index = ('' + foo).length;

console.log(zeroPads[index] + foo);
console.log(x.map(z2));
