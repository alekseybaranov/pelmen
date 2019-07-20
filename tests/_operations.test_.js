// Mocha
// https://metanit.com/web/nodejs/5.1.php
// https://habr.com/ru/post/314978/

// Chai
// http://kronus.me/category/%d0%bf%d1%80%d0%be%d0%b3%d1%80%d0%b0%d0%bc%d0%bc%d0%b8%d1%80%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5/javascript-%d0%bf%d1%80%d0%be%d0%b3%d1%80%d0%b0%d0%bc%d0%bc%d0%b8%d1%80%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5/chai/
// http://ask.imagetube.xyz/394/%D0%BA%D0%B0%D0%BA-%D1%81%D1%80%D0%B0%D0%B2%D0%BD%D0%B8%D0%B2%D0%B0%D1%82%D1%8C-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B-%D0%B2-javascript

var operations = require("../lib/_operations");
 
it("умножение двух чисел", function(){
     
    var expectedResult = 15;
    var result = operations.multiply(3, 5);
    if(result!==expectedResult){
        throw new Error(`Ожидаемый результат ${expectedResult}, однако получено ${result}`);
    }
});

it("асинхронное умножение двух чисел", function(done){
     
    var expectedResult = 12;
    operations.multiplyAsync(4, 3, function(result){
        if(result!==expectedResult){
            throw new Error(`Ожидаемый результат ${expectedResult}, однако получено ${result}`);
        }
        done();
    });
});