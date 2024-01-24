class SleepPublisher {
  constructor() {
    this.cbs = []
  }

  subScribe(cb) {
    this.cbs.push(cb);
  }

  publish() {
    this.cbs.forEach(cb => cb())
  }

  unSubScribe(cb) {
    this.cbs.filter(c => c !== cb)
  }
}

function sleep(time) {
  return new Promise((resolve) => {
    const sleepPublisher = new SleepPublisher()
    const cb = () => {
      resolve();
      sleepPublisher.unSubScribe(cb);
    }
    sleepPublisher.subScribe(cb);
    setTimeout(() => {
      sleepPublisher.publish()
    }, time);
  })
}