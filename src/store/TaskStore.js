/* eslint-disable no-shadow */
import {observable, action, makeObservable} from 'mobx';
import {getRealm} from '../services/realm';
import {configure} from 'mobx';

configure({
  enforceActions: 'never',
});

class taskStore {
  tasks = [];

  constructor() {
    makeObservable(this, {
      tasks: observable,
      addTask: action,
      deleteTask: action,
    });
  }

  // async getAllTasks(task) {
  //   const realm = await getRealm();

  //   const data = realm.objects('Task').sorted('_id', true);
  //   this.tasks = [
  //     ...this.tasks,
  //     {
  //       ...data,
  //       _id: String(new Date().getTime()),
  //       date: new Date().toLocaleDateString('pt-BR'),
  //     },
  //   ];
  // }

  async addTask(task) {
    const realm = await getRealm();

    this.tasks = [
      ...this.tasks,
      {
        ...task,
        _id: String(new Date().getTime()),
        date: new Date().toLocaleDateString('pt-BR'),
      },
    ];
    realm.write(() => {
      tasksStore.tasks.forEach(values => {
        realm.create('Task', values, true);
      });
    });

    // console.log(tasksStore.tasks);
  }

  async deleteTask(_id) {
    this.tasks = this.tasks.filter(task => task._id !== _id);
    const realm = await getRealm();
    // const _id = data._id;
    realm.write(() => {
      // realm.delete(realm.objectForPrimaryKey('Task', _id));
      realm.delete(realm.objects('Task').sorted('_id', true));
    });
  }

  async EditTask(item) {
    const realm = await getRealm();
    let task = tasksStore.tasks.find(task => task._id === item._id);
    task.title = item.title;
    task.description = item.description;
    task.image = item.image;
    task.date = new Date().toLocaleDateString('pt-BR');

    realm.write(() => {
      let myTask = realm.objectForPrimaryKey('Task', item._id);
      myTask.title = item.title;
      myTask.description = item.description;
    });

    // console.log(tasksStore.tasks);
  }
}

export const tasksStore = new taskStore();
