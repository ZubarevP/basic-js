const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */

function transform(a) {
  if(!Array.isArray(a)) {
    throw new Error('\'arr\' parameter must be an instance of the Array!');
  }
  let result = [];
  let flag = true;
  for(let i = 0; i < a.length; i++) {
    switch(a[i]){
      case "--discard-next": 
        flag ? i++ : null; 
        flag = false;
        break;
      case "--discard-prev": 
        result.length > 1 && flag ? result.pop() : null; 
        flag = false;
        break;
      case "--double-next" : 
        i + 1 < a.length && flag ? result.push(a[i + 1]) : null; 
        flag = false;
        break;
      case "--double-prev" : 
        i - 1 >= 0 && flag ? result.push(a[i - 1]): null; 
        flag = false;
        break;
      default: 
        flag = true;
        result.push(a[i]);
    }
  }
  return result;
}

module.exports = {
  transform
};
