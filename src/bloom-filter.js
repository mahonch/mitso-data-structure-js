const { NotImplementedError } = require("../extensions/index.js");

module.exports = class BloomFilter {
  /**
   * @param {number} size - the size of the storage.
   */
  constructor(size) {
    this.size = size;
    this.store = this.createStore(size);
  }

  /**
   * @param {string} item
   */
  insert(item) {
    const hashValues = this.getHashValues(item);
    hashValues.forEach((value) => {
      this.store[value] = true;
    });
  }

  /**
   * @param {string} item
   * @return {boolean}
   */
  mayContain(item) {
    const hashValues = this.getHashValues(item);
    return hashValues.every((value) => this.store[value]);
  }

  /**
   * Creates the data store for our filter.
   * We use this method to generate the store in order to
   * encapsulate the data itself and only provide access
   * to the necessary methods.
   *
   * @param {number} size
   * @return {Object}
   */
  createStore(size) {
    return new Array(size).fill(false);
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash1(item) {
    // Implement your hashing function 1
    return item.length % this.size;
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash2(item) {
    // Implement your hashing function 2
    return item.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % this.size;
  }

  /**
   * @param {string} item
   * @return {number}
   */
  hash3(item) {
    // Implement your hashing function 3
    let hash = 0;
    for (let i = 0; i < item.length; i++) {
      const charCode = item.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
    }
    return Math.abs(hash) % this.size;
  }

  /**
   * Runs all 3 hash functions on the input and returns an array of results.
   *
   * @param {string} item
   * @return {number[]}
   */
  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)];
  }
};

const BloomFilter = require('./bloom-filter');

const filter = new BloomFilter(10);

// Проверяем создание хранилища данных и наличие методов
console.log(filter.store instanceof Array); // Ожидаем true
console.log(filter.store.length); // Ожидаем 10
console.log(typeof filter.insert === 'function'); // Ожидаем true
console.log(typeof filter.mayContain === 'function'); // Ожидаем true

// Проверяем, что хэш-функции работают детерминированно
const item = 'test';
const hash1 = filter.hash1(item);
const hash2 = filter.hash2(item);
const hash3 = filter.hash3(item);
console.log(hash1 === filter.hash1(item)); // Ожидаем true
console.log(hash2 === filter.hash2(item)); // Ожидаем true
console.log(hash3 === filter.hash3(item)); // Ожидаем true

// Проверяем, что метод getHashValues создает массив из трех хэшей для входного элемента
const hashValues = filter.getHashValues(item);
console.log(hashValues instanceof Array); // Ожидаем true
console.log(hashValues.length); // Ожидаем 3

// Проверяем вставку элемента и проверку наличия вставленного элемента
filter.insert(item);
console.log(filter.mayContain(item)); // Ожидаем true
filter.mayContain('Bruce Wayne');
