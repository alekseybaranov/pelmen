/** 
 * Генератор объектов описания конфигурационных файлов
 * из управляющего оператора
 * 
 * @param fileSpec - файловая спецификация
 * @returns генерирует объекты описания конфигурационных файлов
 * 
 * @author Алексей Баранов
 * @version 1.0.0
*/
function* generateFile(fileSpec) {

  let ConfigFileQualifier = require('./ConfigFileQualifier')

  // Файловая спецификация должна быть либо массивом, либо объектом,
  // либо строкой

  if (! (Array.isArray(fileSpec) ||
         typeof fileSpec === 'object' || typeof fileSpec === 'string' ) ) {

    // В качестве спецификации передано не массив, не объект и не строка

    console.log('generateFile.js Некорректная спецификация конфигурационных ' +
                'файлов:')
    console.log(fileSpec)
    console.log('')
    return null
  }

  if (typeof fileSpec === 'string' || 
      (typeof fileSpec === 'object' && ! Array.isArray(fileSpec))) {

    // Файловая спецификация - строка или объект

    return new ConfigFileQualifier(fileSpec)
  }

  // Файловая спецификация - массив

  let len = fileSpec.length
  for (let i = 0; i < len; i++) {   // перебираем массив
    let flSpec = fileSpec[i]    // спецификатор конфигурационного файла

    let file

    if (typeof flSpec === 'string' || typeof flSpec === 'object') {
      // Файловый спецификатор - строка или объект
      // file = getFileFromString(flSpec)
      file = new ConfigFileQualifier(flSpec)

    } else {
      // всё остальное - ошибка
      console.log('generateFile.js Некорректный спецификатор ' +
                  'конфигурационного файла:')
      console.log(flSpec)
      console.log('')
      file = null
    }

    if (i === len - 1) {
      // Обрабатываем последний элемент массива
      return file   // используем return
    }

    // Обрабатываем не последний элемент массива
    yield file  // используем yield
  }
}

module.exports = generateFile