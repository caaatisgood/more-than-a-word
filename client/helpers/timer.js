function Timer(cb, delay) {
  let timerId, start, remaining = delay

  this.pause = () => {
    window.clearTimeout(timerId)
    remaining -= new Date() - start
  }

  this.resume = () => {
    start = new Date()
    window.clearTimeout(timerId)
    timerId = window.setTimeout(cb, remaining)
  }

  this.getCompleted = () => {
    return new Date() - start
  }

  this.clear = () => {
    window.clearTimeout(timerId)
  }

  this.resume()
}

export default Timer