class List {
    constructor() {
        this.tasks = [];
        this.numberOfTasks = 0;
    };
    
    display() {

    };

    add(task) {
        this.numberOfTasks += 1;
        this.task.push({id: this.numberOfTasks, content: task});
    };

    remove(task) {
        this.numberOfTasks -= 1;
    };

    edit(task) {

    };

    markAsCompleted(task) {

    };

};

export {List};