const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Create a task`,
            },
            {
                value: '2',
                name: `${'2.'.green} Show tasks`,
            },
            {
                value: '3',
                name: `${'3.'.green} Show completed tasks`,
            },
            {
                value: '4',
                name: `${'4.'.green} Show pending tasks`,
            },
            {
                value: '5',
                name: `${'5.'.green} Complete tasks`,
            },
            {
                value: '6',
                name: `${'6.'.green} Delete a task`,
            },
            {
                value: '0',
                name: `${'0.'.green} Exit`,
            },

        ]
    }
]

const inquirerMenu = async() => {
    console.clear();

    console.log('==================================\n       Select an option\n==================================\n'.green);

    const { option } = await inquirer.prompt(menuOpts);
    return option;
}

const pause = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue.`
        }
    ]
    await inquirer.prompt(question);
}

const readInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'text',
            message
        }
    ]
    const { text } = await inquirer.prompt(question);
    return text;
}

const listTasksToDelete = async (tasks) => {

    const question = {
        type: 'list',
        name: 'id',
        message: 'Borrar',
    };
    
    question.choices = tasks.map((task, idx) => ({
        value: task.id,
        name: `${(idx +1 +'.').green} ${task.desc}`
    }));

    question.choices.unshift({
        value: 0,
        name: `${'0.'.green} Cancelar`
    });

    const { id } = await inquirer.prompt(question);
    return id;
}

const confirmTaskToDelete = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const completeTasksList = async (tasks) => {

    const question = {
        type: 'checkbox',
        name: 'ids',
        message: 'Selections',
    };
    
    question.choices = tasks.map((task, idx) => ({
        value: task.id,
        name: `${(idx +1 +'.').green} ${task.desc}`,
        checked: !!task.completed
    }));

    const { ids } = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listTasksToDelete,
    confirmTaskToDelete,
    completeTasksList
}
