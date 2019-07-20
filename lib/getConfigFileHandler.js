/** 
 * Возвращает обработчик конфигурационного файла
 * по строке, определяющей формат файла или расширение файла
 * 
 * @param format - string формат или расширение файла
 * @returns - function обработчик конфигурационного файла
 *            null - если обработчик не найден
 * 
 * @author Алексей Баранов
 * @version 1.0.0
*/
getConfigFileHandler = function (format) {

  const fileFormats = require('../lib/fileFormats')
  
  if (typeof format !== 'string') {
    // В качестве формата файла передана не строка
    return null
  }

  // В качестве формата файла передана строка
  format = format.trim().toLowerCase()

  if (format[0] !== '.') {
    format = '.' + format     // если необходимо, то добавляем точку в начало
  }

  // ищем формат среди расширений, так как это более полный поиск
  let result = fileFormats.extensions[format] 

  if (result === undefined) {
    result = null   // если не нашли, то вместо обработчика возвращаем null
  }

  return result
}

module.exports = getConfigFileHandler