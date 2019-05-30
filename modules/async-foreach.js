/**
 * 
 * @param {Array<*>} array 
 * @param {Function} callback 
 */
async function asyncForEach(array, callback) {
  for (let idx = 0; idx < array.length; idx++) {
    await callback(array[ idx ], idx, array);
  }
}

export { asyncForEach };