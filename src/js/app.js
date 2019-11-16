import {List} from './models'

document.addEventListener("DOMContentLoaded", function() {

    const ToDoList = new List;
    const tbody = document.querySelector("tbody");
    const newTask = document.querySelector("input[name='new-task']");
    const addNewTaskBtn = document.querySelector(".add-new-task");

    const displayTasks = function(obj) {
        const tr = document.createElement("tr");
        tbody.appendChild(tr);
        tr.id = obj.id;
        obj.status === "to-do" ? 
        (
            tr.appendChild(document.createElement("td")).innerHTML = "<input type='checkbox' class='task-status to-do'>"
            ) :
        (
            tr.appendChild(document.createElement("td")).innerHTML = "<input type='checkbox' class='task-status done'>"
            );
        tr.appendChild(document.createElement("td")).innerText = obj.content;
        tr.appendChild(document.createElement("td")).innerHTML = "<button class='edit'>Edytuj";
        tr.appendChild(document.createElement("td")).innerHTML = "<button class='delete'>Usuń";
    };

    const toggleEditSaveButton = function(button) {
        const buttonClass = button.classList;
        buttonClass.toggle("edit");
        buttonClass.toggle("save");
        buttonClass.contains("edit") ? 
        (
            button.innerText = "Edytuj"
            ) :
        (
            button.innerText = "Zapisz"
            );
    }


    const tasks = [
        'Wyświetlić zadania', 
        'Dodać możliwość dodania zadania', 
        'Dodać możliwość usunięcia zadania', 
        'Dodać możliwość edytowania zadania', 
        'Dodać możliwość oznaczenia zadania jako zakończone'
    ];

    tasks.forEach(task => {
        ToDoList.add(task);
    });

    ToDoList.tasks.forEach(obj => {
        displayTasks(obj);
    });


    tbody.addEventListener("click", event => {
        let target = event.target;
        let targetClass = target.classList
        if (targetClass.contains("task-status")) {
            let targetParent = target.parentElement;
            targetClass.toggle("to-do");
            targetClass.toggle("done")
            targetClass.contains("to-do") ?
            (
                targetParent.nextElementSibling.style.textDecoration = "none",
                ToDoList.markAsUnCompleted(targetParent.parentElement.id)
                ) :
            (
                targetParent.nextElementSibling.style.textDecoration = "line-through",
                ToDoList.markAsUnCompleted(targetParent.parentElement.id)
                );    
        }
        else if (targetClass.contains("delete")) {
            let taskToDelete = target.parentElement.parentElement;
            console.log(taskToDelete);
            ToDoList.delete(taskToDelete.id);
            tbody.removeChild(taskToDelete);
        }
        else if (targetClass.contains("edit") || targetClass.contains("save") || targetClass.contains("cancel")) {
            let targetParent = target.parentElement;
            let taskToEdit = targetParent.previousElementSibling;
            if (targetClass.contains("edit")) {
                toggleEditSaveButton(target);
                targetParent.appendChild(document.createElement("button")).classList.add("cancel")
                targetParent.lastElementChild.innerText = "Anuluj";
                const currentContent = taskToEdit.innerText;
                console.log(currentContent);
                taskToEdit.innerHTML = `<input type=text value="${currentContent}">`
            }
            else if (targetClass.contains("save")) {
                const newContent = taskToEdit.firstElementChild.value;
                toggleEditSaveButton(target);
                ToDoList.edit(targetParent.parentElement.id, newContent);
                taskToEdit.innerText = newContent;
                targetParent.removeChild(target.nextElementSibling);
            }
            else if (targetClass.contains("cancel")) {
                const currentContent = taskToEdit.firstElementChild.value;
                console.log(currentContent);
                toggleEditSaveButton(target.previousElementSibling);
                taskToEdit.innerText = currentContent;
                targetParent.removeChild(target);
            }
        }
    });


    addNewTaskBtn.addEventListener("click", function(event) {
        event.preventDefault();
        if (newTask.value) {
            ToDoList.add(newTask.value);
            const newestTask = ToDoList.tasks[ToDoList.tasks.length-1];
            displayTasks(newestTask);
        };
    });
});