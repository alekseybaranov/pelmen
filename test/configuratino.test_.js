let chai = require('chai')
let assert = chai.assert

let configuration = require("../lib/configuration")

let expectedResult
let result

// console.log('\nprocess.argv:\n');
// console.log(process.argv);
// console.log('\nprocess.env:\n');
// console.log(process.env);


describe('configuration.js', () => {
  describe('Тесты формирования объекта конфигурации', () => {
  })

  describe('Тесты возвращаемой функции доступа к конфигурационным ' +
           'параметрам', () => {

    let defaultParameters = {
      configFile : 'configuration',
      express : {
        port : 3030,
        defaultLayout: 'main',
        layoutsDir: '/views/layouts/',
        partialsDir: '/views/partials/',
      }
    }
    let getConfigParameter = configuration(defaultParameters)

    // console.log(getConfigParameter())
    // console.log('express' in defaultParameters)
    // console.log('express.port' in defaultParameters)
    // console.log(defaultParameters['express.port'])
    // console.log(defaultParameters['express']['port'])

    it('Запрос без параметра возвращает копию объекта конфигурации',
      function(){
      
      expectedResult = {
        //configFile : 'configuration',
        express : {
          port : 3030,
          defaultLayout: 'main',
          layoutsDir: '/views/layouts/',
          partialsDir: '/views/partials/',
        }
      }
      result = getConfigParameter()

      assert.deepEqual(result, expectedResult)
    })

    it('Запрос с undefined в качестве параметра возвращает копию объекта ' +
      'конфигурации',
      function(){
      
      let param = undefined
      expectedResult = {
        //configFile : 'configuration',
        express : {
          port : 3030,
          defaultLayout: 'main',
          layoutsDir: '/views/layouts/',
          partialsDir: '/views/partials/',
        }
      }
      result = getConfigParameter(param)

      assert.deepEqual(result, expectedResult)
    })

    it('Запрос с пустой строкой в качестве параметра возвращает копию ' +
      'объекта конфигурации',
      function(){
      
      let param = ''
      expectedResult = {
        //configFile : 'configuration',
        express : {
          port : 3030,
          defaultLayout: 'main',
          layoutsDir: '/views/layouts/',
          partialsDir: '/views/partials/',
        }
      }
      result = getConfigParameter(param)

      assert.deepEqual(result, expectedResult)
    })

    it('Запрос со строкой, состоящей из пробелов, в качестве параметра ' +
       'возвращает копию объекта конфигурации',
      function(){
      
      let param = '    '
      expectedResult = {
        //configFile : 'configuration',
        express : {
          port : 3030,
          defaultLayout: 'main',
          layoutsDir: '/views/layouts/',
          partialsDir: '/views/partials/',
        }
      }
      result = getConfigParameter(param)

      assert.deepEqual(result, expectedResult)
    })

    // В случае, если в качестве имени запрашиваемого параметра
    // передана не строка, то возвращается undefined.

    it('Если в качестве параметра передана не строка, ' +
       'то возвращается undefined',
      function(){
      
      let param = 123
      expectedResult = undefined
      result = getConfigParameter(param)

      assert.equal(result, expectedResult)
    })

    // В случае, если запрашиваемого параметра нет в объекте
    // конфигурации, то возвращается undefined.

    it('Если запрашиваемого параметра нет в объекте конфигурации, то ' +
       'возвращается undefined',
      function(){
      
      let param = 'config'
      expectedResult = undefined
      result = getConfigParameter(param)

      assert.equal(result, expectedResult)
    })

    it('Если запрашиваемый параметр есть, то возвращается его значение',
      function(){
      
      let param = 'express.defaultLayout'
      expectedResult = 'main'
      result = getConfigParameter(param)

      assert.deepEqual(result, expectedResult)
    })

    it('Пробельные символы в начале и конце наименования параметра ' +
       'не влияют на поиск',
      function(){
      
      let param = '  express.defaultLayout   '
      expectedResult = 'main'
      result = getConfigParameter(param)

      assert.deepEqual(result, expectedResult)
    })

    it('Запрашиваем свойство подобъекта',
      function(){
      
      let param = 'express.port'
      expectedResult = 3030
      result = getConfigParameter(param)

      assert.deepEqual(result, expectedResult)
    })

    it('Запрашиваем несуществующее свойство подобъекта',
      function(){
      
      let param = 'express.porte'
      expectedResult = undefined
      result = getConfigParameter(param)

      assert.deepEqual(result, expectedResult)
    })

    // В случае, если запрашиваемый параметр - объект, то возвращается
    // копия объекта, чтобы исключить возможность изменения объекта
    // конфигурации.
    it('Если запрашиваемый параметр - объект, то возвращается его копия',
      function(){
      
      let param = 'express'
      expectedResult = {
        port : 3030,
        defaultLayout: 'main',
        layoutsDir: '/views/layouts/',
        partialsDir: '/views/partials/',
      }
      result = getConfigParameter(param)
      assert.deepEqual(result, expectedResult)
    })

    it('Изменения полученного параметра-объекта, не передаются в конфигурацию',
      function(){
      
      let param = 'express'
      expectedResult = {
        port : 3030,
        defaultLayout: 'main',
        layoutsDir: '/views/layouts/',
        partialsDir: '/views/partials/',
      }

      intermediate = getConfigParameter(param)  // получаем объект
      intermediate.port = 1234                  // изменяем объект

      // изменения не передаются в конфигурацию
      result = getConfigParameter(param)
      assert.deepEqual(result, expectedResult)
    })
  })
})