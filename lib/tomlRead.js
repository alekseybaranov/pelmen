/** 
 * Функция чтения информации из файла в формате TOML
 * @param fileName - имя файла
 * @returns возвращает объект заполненный информацией из файла
 * 
 * @autor Алексей Баранов
 * @version 1.0
*/
function tomlRead(fileName) {
  const fs = require('fs')
  const toml = require('toml')
  let data
  let obj = {}

  // Чтение файла
  try {
    data = fs.readFileSync(fileName, 'utf-8')
  } catch (err) {
    console.error("\nОшибка при чтении файла: '" + err.path + 
                  "'\n" + err.message + "\n")
  }

  // Парсинг информации в формате TOML
  try {
    obj = toml.parse(data)
  } catch (err) {
    console.error("\nОшибка при чтении файла в формате TOML: '" + fileName +
                  "'\nОшибка парсинга в строке " + err.line + 
                  ", столбце " + err.column + ": \n" + err.message + "\n")
  }

  return obj
}

module.exports = tomlRead