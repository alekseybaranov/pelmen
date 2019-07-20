let chai = require('chai')
let assert = chai.assert

let isFileExist = require("../lib/isFileExist")

let expectedResult
let result

// Извлекаем каталог с тестами, что-то вроде ./test/ или ./tests/
// const testCatalogPath = './test/'
const testCatalogPath = process.argv[2].slice(0, process.argv[2].indexOf("*"))


describe('isFileExist.js', () => {
  describe('Тесты функции проверки существования файла', () => {

    //-------------------------------------------------------------------------
    it('В качестве имени файла передана не строка',
      function(){
      
      let file = 1
      expectedResult = false

      result = isFileExist(file)

      assert.equal(result, expectedResult)
    })

    //-------------------------------------------------------------------------
    it('Файл config.toml существует',
      function(){
      
      let file = testCatalogPath + 'config.toml'
      expectedResult = true

      result = isFileExist(file)

      assert.equal(result, expectedResult)
    })

    //-------------------------------------------------------------------------
    it('Файла cfg.toml не существует',
      function(){
      
      let file = testCatalogPath + 'cfg.toml'
      expectedResult = false

      result = isFileExist(file)

      assert.equal(result, expectedResult)
    })

    //-------------------------------------------------------------------------
    it('Файла folder не существует - это каталог',
      function(){
      
      let file = testCatalogPath + 'folder'
      expectedResult = false

      result = isFileExist(file)

      assert.equal(result, expectedResult)
    })

  })
})
