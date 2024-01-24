// 观察者模式
class Observer {
  constructor(name) {
    this.name = name
  }
  update(task) {
    console.log('发布 ' + task + ' 任务了！！！！！！');
  }
}

class Subject {
  constructor() {
    this.observerList = []
  }

  addObserver(observer) {
    this.observerList.push(observer);
  }

  notify(task) {
    console.log("发布五星任务");
    this.observerList.forEach(observer => observer.update(task))
  }
}

const subject = new Subject();
const stu1 = new Observer('弟子1');
const stu2 = new Observer('弟子2');
subject.addObserver(stu1);
subject.addObserver(stu2);
subject.notify('吃饭');
subject.notify('睡觉');