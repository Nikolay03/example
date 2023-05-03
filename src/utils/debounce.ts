export default function debounce (func: (args?: any) => any, wait: number): () => void {
  let timeout

  return function executedFunction () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments

    function later () {
      timeout = null
      func.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
