const { inquirerMenu,
        pause,
        readInput,
        listTasksToDelete,
        confirmTaskToDelete,
        completeTasksList } = require('./helpers/inquirer');

const Tasks = require('./models/tasks');
const { saveDB, readDB } = require('./helpers/saveFile');

require('colors');
console.clear();

const main = async () => {

    const tasks = new Tasks();
    const tasksRead = readDB();

    if (tasksRead) {

        tasks.loadTasks(tasksRead);
    }
    let opt = '';

    do{

        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Type a task: ');
                tasks.createTask(desc);
                break;
            case '2':
                console.log(tasks.listCompleted());
                break;
            case '3':
                console.log(tasks.listCompletedOrPending(true));
                break;
            case '4':
                console.log(tasks.listCompletedOrPending(false));
                break;
            case '5':
                const ids = await completeTasksList(tasks.listArr);
                if(ids) {
                    tasks.toggleCompleted(ids);
                }

                break;
            case '6':
                const id = await listTasksToDelete(tasks.listArr);
                if(id != 0) {
                    const ok = await confirmTaskToDelete('Are you sure?');
                    if(ok)
                        tasks.deleteTask(id);
                        console.log('Task deleted');
                }
                break;

        }

        await pause();
        saveDB(tasks.listArr);

    } while(opt != '0');
}

main();