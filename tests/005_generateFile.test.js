let chai = require('chai')
let assert = chai.assert

const generateFile = require('../lib/generateFile')


describe('generateFile.js', () => {

  // Извлекаем каталог с тестами, что-то вроде ./test/ или ./tests/
  const tstArg = process.argv[2]
  const tstCPath = tstArg.slice(0, tstArg.indexOf("*"))

  // обработчик файлов toml
  const tomlHandler = require('toml')

  describe('Проверяем действительные спецификаторы' +
            '', () => {
    
    // ------------------------------------------------------------
    it(`Спецификатор: 'config.toml'`,
    function(){
      const spec = 'config.toml'
      const expectedResult = {
        done: true,
        value: {
          fileName: tstCPath + 'config.toml', // имя файла
          generalizedFileName: '',            // обобщённое имя файла
          fileFormat: '.toml',                // формат файла
          isReadyForProcessing: true,         // готовность файла к обработке
          handler: tomlHandler                // обработчик
        }
      }

      const generator = generateFile(tstCPath + spec)
      const result = generator.next()
      assert.deepEqual(result, expectedResult, 'первый шаг')
    })

    // ------------------------------------------------------------
    it(`Спецификатор: {fileName: 'cfg.cfg', fileFormat: 'toml'}`,
    function(){
      const spec = {fileName: tstCPath + 'cfg.cfg', fileFormat: 'toml'} 

      const expectedResult = {
        done: true,
        value: {
          fileName: tstCPath + 'cfg.cfg', // имя файла
          generalizedFileName: '',        // обобщённое имя файла
          fileFormat: '.toml',            // формат файла
          isReadyForProcessing: true,     // готовность файла к обработке
          handler: tomlHandler            // обработчик
        }
      }

      const generator = generateFile(spec)
      const result = generator.next()
      assert.deepEqual(result, expectedResult, 'первый шаг')
    })

    // ------------------------------------------------------------
    it(`Спецификатор: ['config.toml',
                       {fileName: 'cfg.cfg', fileFormat: 'toml'}]`,
    function(){
      const spec = [
        tstCPath + 'config.toml',
        {fileName: tstCPath + 'cfg.cfg', fileFormat: 'toml'}
      ]

      const generator = generateFile(spec)

      const expectedResult1 = {
        done: false,
        value: {
          fileName: tstCPath + 'config.toml', // имя файла
          generalizedFileName: '',            // обобщённое имя файла
          fileFormat: '.toml',                // формат файла
          isReadyForProcessing: true,         // готовность файла к обработке
          handler: tomlHandler                // обработчик
        }
      }
      const result1 = generator.next()
      assert.deepEqual(result1, expectedResult1, 'первый шаг')

      const expectedResult2 = {
        done: true,
        value: {
          fileName: tstCPath + 'cfg.cfg', // имя файла
          generalizedFileName: '',        // обобщённое имя файла
          fileFormat: '.toml',            // формат файла
          isReadyForProcessing: true,     // готовность файла к обработке
          handler: tomlHandler            // обработчик
        }
      }
      const result2 = generator.next()
      assert.deepEqual(result2, expectedResult2, 'второй шаг')
    })
  })

  describe('Проверяем недействительные спецификаторы' +
            '', () => {

    // ------------------------------------------------------------
    it(`Спецификатор: 1
                      Имя файла - не строка и не объект и не массив`,
    function(){
      const spec = 1
      const expectedResult = {
        done: true,
        value: null
      }

      const generator = generateFile(spec)
      const result = generator.next()
      assert.deepEqual(result, expectedResult, 'первый шаг')
    })


    // ------------------------------------------------------------
    it(`Спецификатор: ['config.toml',
                       1,
                       {fileName: 'cfg.cfg', fileFormat: 'toml'}]`,
    function(){
      const spec = [
        tstCPath + 'config.toml',
        1,
        {fileName: tstCPath + 'cfg.cfg', fileFormat: 'toml'}
      ]

      const generator = generateFile(spec)

      const expectedResult1 = {
        done: false,
        value: {
          fileName: tstCPath + 'config.toml', // имя файла
          generalizedFileName: '',            // обобщённое имя файла
          fileFormat: '.toml',                // формат файла
          isReadyForProcessing: true,         // готовность файла к обработке
          handler: tomlHandler                // обработчик
        }
      }
      const result1 = generator.next()
      assert.deepEqual(result1, expectedResult1, 'первый шаг')

      const expectedResult2 = {
        done: false,
        value: null
      }
      const result2 = generator.next()
      assert.deepEqual(result2, expectedResult2, 'первый шаг')

      const expectedResult3 = {
        done: true,
        value: {
          fileName: tstCPath + 'cfg.cfg', // имя файла
          generalizedFileName: '',        // обобщённое имя файла
          fileFormat: '.toml',            // формат файла
          isReadyForProcessing: true,     // готовность файла к обработке
          handler: tomlHandler            // обработчик
        }
      }
      const result3 = generator.next()
      assert.deepEqual(result3, expectedResult3, 'второй шаг')
    })
  })

})
