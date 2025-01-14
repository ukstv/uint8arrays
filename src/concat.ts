import { allocUnsafe } from './alloc.js'
import { asUint8Array } from './util/as-uint8array.js'

/**
 * Returns a new Uint8Array created by concatenating the passed Uint8Arrays
 */
export function concat (arrays: Uint8Array[], length?: number): Uint8Array {
  if (globalThis.Buffer != null) {
    return asUint8Array(globalThis.Buffer.concat(arrays, length))
  }

  if (length == null) {
    length = arrays.reduce((acc, curr) => acc + curr.length, 0)
  }

  const output = allocUnsafe(length)
  let offset = 0

  for (const arr of arrays) {
    output.set(arr, offset)
    offset += arr.length
  }

  return asUint8Array(output)
}
