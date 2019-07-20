let chai = require('chai')
let assert = chai.assert

let getConfigFileFormat = require('../lib/getConfigFileFormat')

describe('getConfigFileFormat - функция поиска расширения (формата) ' + 
          'файла', () => {

  // Извлекаем каталог с тестами, что-то вроде ./test/ или ./tests/
  // const testCatalogPath = './test/'
  const testArg = process.argv[2]
  const testCatalogPath = testArg.slice(0, testArg.indexOf("*"))


  //-------------------------------------------------------------------------
  // Проверяем действительные файлы

  describe('Функция getConfigFileFormat должна найти следующие расширения ' +
            'для файлов', () => {

    const tst = [
      {name: 'config', result: '.toml'},
      {name: 'cfg', result: '.ini'}
    ]

    tst.forEach(function(test) {

      let name = test.name
      let expectedResult = test.result

      it(`Имя файла: ${name} => Расширение: '${expectedResult}'`,
      function(){
        const result = getConfigFileFormat(testCatalogPath + name)
        assert.equal(result, expectedResult)
      })
    })
  })


  //-------------------------------------------------------------------------
  // Проверяем недействительные файлы

  describe('Функция getConfigFileFormat не должна найти расширения ' +
            'для файлов', () => {

    const tst = [
      {name: '', result: ''},
      {name: 1, result: ''},
      {name: {}, result: ''},
      {name: 'conf', result: ''}
    ]

    tst.forEach(function(test) {

      let name = test.name
      let expectedResult = test.result

      it(`Имя файла: ${name} => Расширение: '${expectedResult}'`,
      function(){
        const result = getConfigFileFormat(testCatalogPath + name)
        assert.equal(result, expectedResult)
      })
    })
  })
})
