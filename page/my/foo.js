var $ = require('jquery');
console.log('foo.js')
$(function () {
    require('/widget/w1/w1');
    require('/widget/w2/w2');
});