// w2.js
console.log('w2.js')
var $ = require('jquery');
$('.w2[data-idf="w2"]').on('click', function () {
    alert('click ' + $(this).data('idf'));
});