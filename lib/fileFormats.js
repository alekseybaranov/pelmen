/** 
 * fileFormats
 * 
 * Здесь определяются форматы обрабатываемых конфигурационных файлов
 * и список расширений обрабатываемых конфигурационных файлов
 * 
 * @author Алексей Баранов
 * @version 1.0.0
*/

const tomlHandler = require('toml') // обработчик файлов toml


// ----------------------------------------------------------------------------
// обрабатываемые форматы конфигурационных файлов

let formats = {                   // список обработчиков (форматов)
  toml: tomlHandler
}

// ----------------------------------------------------------------------------
// обрабатываемые расширения конфигурационных файлов

let extensions = {                // список расширений
  '.toml': formats.toml,
  '.ini': formats.toml
}

module.exports.formats = formats
module.exports.extensions = extensions