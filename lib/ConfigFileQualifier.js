/** 
 * Класс ConfigFileQualifier
 * 
 * @param fileSpec - спецификатор - строка или объект
 * Спецификатор-строка может быть в виде имени файла - 'config.ini'
 * или в виде обобщённого имени файла (без расширения) - 'config'
 * 
 * Спецификатор-объект должен иметь структуру:
 *  .fileName     - имя файла (строка, точное имя файла)
 *  .fileFormat   - формат файла (строка, например 'ini' или '.ini')
 * 
 * @returns Объект описания конфигурационного файла:
 *  .fileName             - имя файла
 *  .generalizedFileName  - обобщённое имя файла, если спецификатор файла
 *                          был задан строкой без указания расширения файла
 *  .fileFormat           - формат файла
 *  .isReadyForProcessing - файл готов к обработке
 *  .handler              - обработчик
 * 
 * @author Алексей Баранов
 * @version 1.0.0
*/
let ConfigFileQualifier = function(fileSpec) {

  // Создаём пустую заготовку объекта описания конфигурационного файла

  this.fileName = ''                     // имя файла
  this.generalizedFileName = ''          // обобщённое имя файла
  this.fileFormat = ''                   // формат файла
  this.isReadyForProcessing = false      // файл не готов к обработке
  this.handler = null                    // обработчик не установлен

  // Обрабатываем спецификатор

  if (typeof fileSpec !== 'string' && typeof fileSpec !== 'object') {
    // Недопустимый тип файлового спецификатора

    console.log('Недопустимый тип файлового спецификатора:')
    console.log(fileSpec)
    return
  }

  if (typeof fileSpec === 'object') {
    // Файловая спецификация - объект


    // обрабатываем спецификатор-объект
    fromObject(this, fileSpec)
    return 
  }

  if (typeof fileSpec === 'string') {
    // Файловый спецификатор - строка
    fromString(this, fileSpec)
    return 
  }
}


/** 
 * Формирует объект описания конфигурационного файла
 * по спецификатору - объекту
 * 
 * @param obj      - формируемый объект
 * @param fileSpec - спецификатор - объект
 * 
 * Спецификатор-объект должен иметь структуру:
 *  .fileName     - имя файла (строка, точное имя файла)
 *  .fileFormat   - формат файла (строка, например 'ini' или '.ini')
 * 
 * Объект описания конфигурационного файла:
 *  .fileName             - имя файла
 *  .generalizedFileName  - обобщённое имя файла, если оно задано строкой
 *  .fileFormat           - формат файла
 *  .isReadyForProcessing - файл готов к обработке
 *  .handler              - обработчик
 * 
 * @author Алексей Баранов
 * @version 1.0.0
*/
function fromObject(obj, fileSpec) {
  const isFileExist = require("./isFileExist")
  const getHandler = require('./getConfigFileHandler')

  // Конфигурационный файл задан объектом
  // Проверяем корректность переданного имени конфигурационного файла

  let fileName = fileSpec.fileName
  if (typeof fileName !== 'string') {
    // Либо в спецификаторе нет параметра fileName,
    // либо в качестве имени файла передана не строка

    console.log('Недействительное имя файла:')
    console.log(fileSpec)
    return
  }

  // В параметре имени файла передана строка

  fileName = fileName.trim()
  if (fileName === '') {
    // Не задано имя файла

    console.log('Не задано имя файла:')
    console.log(fileSpec)
    return
  }

  // Имя файла передано корректно
  // Проверяем наличие файла

  if (! isFileExist(fileName)) {
    // Файл не найден

    console.log(`Файл '${fileName}' не найден!`)
    console.log(fileSpec)

    obj.fileName = fileName
    return
  }

  // Проверяем корректность переданного формата файла

  let fileFormat = fileSpec.fileFormat
  if (typeof fileFormat !== 'string') {
    // Либо в спецификаторе нет параметра fileFormat,
    // либо в качестве формата файла передана не строка

    console.log('Недействительный формат файла:')
    console.log(fileSpec)

    // Внимание! Имя файла не возвращаем, потому, что файл не обрабатывался
    return
  }

  // В параметре формата файла передана строка

  fileFormat = fileFormat.trim()
  if (typeof fileFormat === '') {
    // Не задан формат файла

    console.log('Не задан формат файла:')
    console.log(fileSpec)

    obj.fileName = fileName
    return
  }

  // Формат файла передан

  if (fileFormat.slice(0, 1) !== '.') {
    fileFormat = '.' + fileFormat   // добавляем в начало формата точку
  }
  let handler = getHandler(fileFormat)

  if (handler === null) {
    // Обработчик формата файла не найден

    console.log('Не найден обработчик формата файла:')
    console.log(fileSpec)

    obj.fileName = fileName
    obj.fileFormat = fileFormat
    return
  }

  // Файл найден, обработчик найден

  obj.fileName = fileName
  obj.generalizedFileName = ''
  obj.fileFormat = fileFormat
  obj.handler = handler
  obj.isReadyForProcessing = true
}


/** 
   * Формирует объект описания конфигурационного файла
   * по спецификатору - строке
   * 
   * @param obj      - формируемый объект
   * @param fileSpec - спецификатор - строка
   * 
   * Объект описания конфигурационного файла:
   *  .fileName             - имя файла
   *  .generalizedFileName  - обобщённое имя файла, если оно задано строкой
   *  .fileFormat           - формат файла
   *  .isReadyForProcessing - файл готов к обработке
   *  .handler              - обработчик
   * 
   * @author Алексей Баранов
   * @version 1.0.0
  */
function fromString(obj, fileName) {
  const getHandler = require('./getConfigFileHandler')
  const getFormat = require('./getConfigFileFormat')

  // конфигурационный файл задан строкой

  fileName = fileName.trim()

  if (fileName === '') {
    // Не задано имя файла
    console.log('Не задано имя файла:')
    return
  }

  // Имя файла задано
  // Проверяем, есть ли у файла расширение
  let pos = fileName.lastIndexOf('.')
  if (pos > 0) {
    // нашли точку в названии файла, предполагаем, что есть расширение файла
    let extension = fileName.slice(pos)
    obj.handler = getHandler(extension)
    if (obj.handler !== null) {
      // нашли формат файла по расширению
      obj.fileName = fileName
      obj.fileFormat = extension
      obj.isReadyForProcessing = true
      return
    }
  }

  // либо расширения нет, либо для расширения не указан обработчик
  
  let extension = getFormat(fileName) // ищем формат файла
  if (extension === '') {
    // не нашли формат файла
    obj.fileName = fileName
    obj.generalizedFileName = ''
    obj.fileFormat = extension
    obj.handler = null
    obj.isReadyForProcessing = false

    console.log(`Невозможно обработать файл: ${fileName}`)
    return
  }

  // нашли формат файла
  obj.fileName = fileName + extension
  obj.generalizedFileName = fileName
  obj.fileFormat = extension
  obj.handler = getHandler(extension)
  obj.isReadyForProcessing = true
}

module.exports = ConfigFileQualifier