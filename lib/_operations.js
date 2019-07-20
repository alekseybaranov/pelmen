// https://metanit.com/web/nodejs/5.1.php
//
// функция умножения, исключительно для отладки тестирования


module.exports.multiply = function(x,y){return x * y;}

module.exports.multiplyAsync = function (a, b, callback){
  setTimeout(function(){
      callback(a * b);
  }, 1000)
}