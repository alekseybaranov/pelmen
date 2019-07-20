let chai = require('chai')
let assert = chai.assert

const ConfigFileQualifier = require("../lib/ConfigFileQualifier")


describe('ConfigFileQualifier.js', () => {

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
        fileName: tstCPath + 'config.toml', // имя файла
        generalizedFileName: '',            // обобщённое имя файла
        fileFormat: '.toml',                // формат файла
        isReadyForProcessing: true,         // готовность файла к обработке
        handler: tomlHandler                // обработчик
      }

      const result = new ConfigFileQualifier(tstCPath + spec)
      assert.deepEqual(result, expectedResult)
    })

    // ------------------------------------------------------------
    it(`Спецификатор: 'config.TOML'`,
    function(){
      const spec = 'config.TOML'
      const expectedResult = {
        fileName: tstCPath + 'config.TOML', // имя файла
        generalizedFileName: '',            // обобщённое имя файла
        fileFormat: '.TOML',                // формат файла
        isReadyForProcessing: true,         // готовность файла к обработке
        handler: tomlHandler                // обработчик
      }

      const result = new ConfigFileQualifier(tstCPath + spec)
      assert.deepEqual(result, expectedResult)
    })

    // ------------------------------------------------------------
    it(`Спецификатор: 'config'`,
    function(){
      const spec = 'config'
      const expectedResult = {
        fileName: tstCPath + 'config.toml',       // имя файла
        generalizedFileName: tstCPath + 'config', // обобщ. имя файла
        fileFormat: '.toml',            // формат файла
        isReadyForProcessing: true,     // готовность файла к обработке
        handler: tomlHandler            // обработчик
      }

      const result = new ConfigFileQualifier(tstCPath + spec)
      assert.deepEqual(result, expectedResult)
    })

    // ------------------------------------------------------------
    it(`Спецификатор: 'config.ini'`,
    function(){
      const spec = 'config.ini'
      const expectedResult = {
        fileName: tstCPath + 'config.ini', // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '.ini',             // формат файла
        isReadyForProcessing: true,     // готовность файла к обработке
        handler: tomlHandler            // обработчик
      }

      const result = new ConfigFileQualifier(tstCPath + spec)
      assert.deepEqual(result, expectedResult)
    })

    // ------------------------------------------------------------
    it(`Спецификатор: 'cfg'`,
    function(){
      const spec = 'cfg'
      const expectedResult = {
        fileName: tstCPath + 'cfg.ini', // имя файла
        generalizedFileName: tstCPath + 'cfg',  // обобщённое имя файла
        fileFormat: '.ini',             // формат файла
        isReadyForProcessing: true,     // готовность файла к обработке
        handler: tomlHandler            // обработчик
      }

      const result = new ConfigFileQualifier(tstCPath + spec)
      assert.deepEqual(result, expectedResult)
    })

    // ------------------------------------------------------------
    it(`Спецификатор: {fileName: 'cfg.cfg', fileFormat: 'toml'}`,
    function(){
      const spec = {fileName: tstCPath + 'cfg.cfg', fileFormat: 'toml'} 
      const expectedResult = {
        fileName: tstCPath + 'cfg.cfg', // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '.toml',            // формат файла
        isReadyForProcessing: true,     // готовность файла к обработке
        handler: tomlHandler            // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })

    // ------------------------------------------------------------
    it(`Спецификатор: {fileName: 'cfg', fileFormat: '.toml'}`,
    function(){
      const spec = {fileName: tstCPath + 'cfg', fileFormat: '.toml'} 
      const expectedResult = {
        fileName: tstCPath + 'cfg',     // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '.toml',            // формат файла
        isReadyForProcessing: true,     // готовность файла к обработке
        handler: tomlHandler            // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })

    // ------------------------------------------------------------
    it(`Спецификатор: {fileName: 'cfg', fileFormat: '.TOML'}`,
    function(){
      const spec = {fileName: tstCPath + 'cfg', fileFormat: '.TOML'} 
      const expectedResult = {
        fileName: tstCPath + 'cfg',     // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '.TOML',            // формат файла
        isReadyForProcessing: true,     // готовность файла к обработке
        handler: tomlHandler            // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })








  })

  describe('Проверяем недействительные спецификаторы' +
            '', () => {
    
    // ------------------------------------------------------------
    // 
    it(`Спецификатор: 1
        Имя файла - не строка`,
    function(){
      const spec = 1
      const expectedResult = {
        fileName: '',                   // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '',                 // формат файла
        isReadyForProcessing: false,    // готовность файла к обработке
        handler: null                   // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })
    
    // ------------------------------------------------------------
    // 
    it(`Спецификатор: ''
        Имя файла - пустая строка`,
    function(){
      const spec = ''
      const expectedResult = {
        fileName: '',                   // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '',                 // формат файла
        isReadyForProcessing: false,    // готовность файла к обработке
        handler: null                   // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })
    
    // ------------------------------------------------------------
    // 
    it(`Спецификатор: '   '
        Имя файла - три пробела`,
    function(){
      const spec = '   '
      const expectedResult = {
        fileName: '',                   // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '',                 // формат файла
        isReadyForProcessing: false,    // готовность файла к обработке
        handler: null                   // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })
    
    // ------------------------------------------------------------
    // 
    it(`Спецификатор: 'config.cfg'
        Файл существует, но нет обработчика для его расширения`,
    function(){
      const spec = tstCPath + 'config.cfg'
      const expectedResult = {
        fileName: tstCPath + 'config.cfg',  // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '',                 // формат файла
        isReadyForProcessing: false,    // готовность файла к обработке
        handler: null                   // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })
    
    // ------------------------------------------------------------
    // 
    it(`Спецификатор: {fileName: 1, fileFormat:'toml'}
        Имя файла не строка`,
    function(){
      const spec = {fileName: 1, fileFormat: 'toml'} 
      const expectedResult = {
        fileName: '',                   // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '',                 // формат файла
        isReadyForProcessing: false,    // готовность файла к обработке
        handler: null                   // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })
    
    // ------------------------------------------------------------
    it(`Спецификатор: {fileName: '  ', fileFormat: 'toml'}
        Имя файла - два пробела`,
    function(){
      const spec = {fileName: '  ', fileFormat: 'toml'} 
      const expectedResult = {
        fileName: '',                   // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '',                 // формат файла
        isReadyForProcessing: false,    // готовность файла к обработке
        handler: null                   // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })
    
    // ------------------------------------------------------------
    it(`Спецификатор: {fileName: 'cfg.toml', fileFormat: 'toml'}
        Файла с указанным именем не существует`,
    function(){
      const spec = {fileName: 'cfg.toml', fileFormat: 'toml'} 
      const expectedResult = {
        fileName: 'cfg.toml',           // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '',                 // формат файла
        isReadyForProcessing: false,    // готовность файла к обработке
        handler: null                   // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })
    
    // ------------------------------------------------------------
    it(`Спецификатор: {fileName: 'cfg.ini', fileFormat: 1}
        В качестве формата файла указано число`,
    function(){
      const spec = {fileName: tstCPath + 'cfg.ini', fileFormat: 1} 
      const expectedResult = {
        fileName: '',                   // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '',                 // формат файла
        isReadyForProcessing: false,    // готовность файла к обработке
        handler: null                   // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })
    
    // ------------------------------------------------------------
    it(`Спецификатор: {fileName: 'cfg.cfg', fileFormat: 'cfg'}
        Обработчик формата файла не найден`,
    function(){
      const spec = {fileName: tstCPath + 'cfg.cfg', fileFormat: 'cfg'} 
      const expectedResult = {
        fileName: tstCPath + 'cfg.cfg', // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '.cfg',             // формат файла
        isReadyForProcessing: false,    // готовность файла к обработке
        handler: null                   // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })
    
    // ------------------------------------------------------------
    it(`Спецификатор: {fileName: 'cfg.toml', fileFormat: 'toml'}
        Файла с указанным именем не существует`,
    function(){
      const spec = {fileName: tstCPath + 'cfg.toml', fileFormat: 'toml'} 
      const expectedResult = {
        fileName: tstCPath + 'cfg.toml', // имя файла
        generalizedFileName: '',        // обобщённое имя файла
        fileFormat: '',                 // формат файла
        isReadyForProcessing: false,    // готовность файла к обработке
        handler: null                   // обработчик
      }

      const result = new ConfigFileQualifier(spec)
      assert.deepEqual(result, expectedResult)
    })
  })
})
