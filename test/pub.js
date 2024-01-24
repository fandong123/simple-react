class Pub {
  constructor() {
    this.events = {}
  }
  subScribe(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn)
  }
  pulish(eventName, data) {
    if (!this.events[eventName]) {
      console.log('请先订阅事件');
      return;
    }
    this.events[eventName].forEach(cb => {
      cb(data)
    })
  }
  unSubscribe(eventName) {
    if (!this.events[eventName]) {
      console.log('未订阅事件');
      return;
    }
    delete this.events[eventName]
  }
}

const pub = new Pub();
pub.subScribe('name', name => {
  console.log('My Name Is ' + name);
})

pub.pulish('name', '张三')
pub.unSubscribe('name')
pub.pulish('name', '张三')
pub.unSubscribe('name', '张三')