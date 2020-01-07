/**
 *
 * @param {String} string
 * @param {'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'} [algorithm]
 *
 */
export async function hash(string, algorithm='SHA-1') {
  let encoder = new TextEncoder();
  let resultArrBuff = await window.crypto.subtle.digest(algorithm, encoder.encode(string));
  let hashArr = Array.from(new Uint8Array(resultArrBuff)).map((b) => {
    return b.toString(16);
  });
  return hashArr.join('');
};
