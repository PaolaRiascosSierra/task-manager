
const Task = require('./task')
const colors = require('colors');

class Tasks {

    _list = {};

    get listArr() {
        const list = [];

        Object.keys(this._list).forEach(key => {
            list.push(this._list[key]);
        });

        return list;
    }

    constructor() {
        this._list = {};
    }

    loadTasks(tasks) {

        tasks.forEach(task => {
            this._list[task.id] = task;
        })
    }

    createTask(desc = '') {

        const task = new Task(desc);

        this._list[task.id] = task;
    }

    listCompleted() {

        const listCompleted = this.listArr.reduce((accumulator, task, i) => {

            const index = i + 1;
            const { desc, completed } = task;
            const status = completed ?
                'Completed'.green :
                'Pending'.red

            accumulator += `\n${(index + '.').green} ${desc} :: ${status}`;

            return accumulator;
        }, '')

        return listCompleted;
    }

    listCompletedOrPending(completedTasks = true) {

        const listCompleted = this.listArr.reduce((accumulator, task) => {

            const { desc, completed } = task;
            const checkCompleted = Boolean(completed);

            if (completedTasks != checkCompleted) return accumulator;

            const status = completed ?
                completed.green :
                'Pending'.red

            const index = accumulator.counter += 1;
            accumulator.tasks += `\n${(index + '.').green} ${desc} :: ${status}`;

            return accumulator;
        }, { tasks: '', counter: 0 })

        return listCompleted.tasks;
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    toggleCompleted(ids = []) {
        
        const idsObject = ids.reduce((accumulator, id) => ({...accumulator, [id]: id}), {});

        this.listArr.forEach(task => {
            if(idsObject[task.id]) {
                if(!task.completed) {
                    task.completed = new Date().toISOString();
                }
            } else {
                task.completed = null;
            }
            
        });
    }

}

module.exports = Tasks;