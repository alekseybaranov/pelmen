let chai = require('chai')
let assert = chai.assert

const getHandler = require('../lib/getConfigFileHandler')


describe('getHandler - функция получения обработчика', () => {

  //-------------------------------------------------------------------------
  // Проверяем действительные форматы

  describe('Проверяем обрабатываемые форматы', () => {

    const tomlHandler = require('toml') // обработчик файлов toml
    const trueFormats = ['.toml', 'toml', '.ini', 'ini']
    const expectedResult = tomlHandler
    trueFormats.forEach(function(format) {

      it(`Формат ${format} - обрабатываемый`,
      function(){
        const result = getHandler(format)
        assert.deepEqual(result, expectedResult)
      })
    })
  })


  //-------------------------------------------------------------------------
  // Проверяем недействительные форматы

  describe('Проверяем необрабатываемые форматы', () => {

    const falseFormats = [1, {}, '', '.txt', 'txt']
    const expectedResult = null
    falseFormats.forEach(function(format) {

      it(`Формат ${format} - необрабатываемый`,
      function(){
        const result = getHandler(format)
        assert.equal(result, expectedResult)
      })
    })
  })
})


