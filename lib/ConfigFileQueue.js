/** 
 * Класс ConfigFileQueue
 * 
 * Очередь конфигурационных файлов на обрабработку
 * 
*/
class ConfigFileQueue {
  constructor(path) {
    this.path = path    // путь к файлам, содержит путь к файлу
    this.queue = []     // массив очереди
    this.processed = {} // Список обработанных файлов
  }

  // Поставить в очередь
  enqueue(file) {
    
  }

  // Убрать из очереди
  dequeue() {

  }



}
