/** 
 * Функция isFileExist проверяет существование файла
 * 
 * @param fileName - string Имя файла
 * @returns - boolean
 *          true  - файл существует
 *          false - в противном случае
 * 
 * @author Алексей Баранов
 * @version 1.0.0
*/
function isFileExist(fileName) {

  const fs = require('fs')

  if (typeof fileName !== 'string') {
    // В качестве имени файла передана не строка
    return false
  }

  try {
    const stats = fs.statSync (fileName)
    // Файл найден
    if (stats.isFile()) {
      // Файл найден и не является папкой
      return true
    } else {
      // Файл является папкой
      return false
    }
  } catch (err) {
    // Файл не найден
    return false
  }
}

module.exports = isFileExist