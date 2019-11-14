import {List} from './models'

document.addEventListener("DOMContentLoaded", function() {
    const ToDoList = new List;

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

    const tbody = document.querySelector("tbody");

    ToDoList.tasks.forEach(obj => {
        const tr = document.createElement("tr");
        tbody.appendChild(tr)
        tr.id = obj.id;
        obj.status === "to-do" ? 
        (
            tr.appendChild(document.createElement("td")).innerHTML = "<input type='checkbox' class='is-done to-do'>"
            ) :
        (
            tr.appendChild(document.createElement("td")).innerHTML = "<input type='checkbox' class='is-done'>"
            );
        tr.appendChild(document.createElement("td")).innerText = obj.content;
        tr.appendChild(document.createElement("td")).innerHTML = "<button class='edit'>Edytuj";
        tr.appendChild(document.createElement("td")).innerHTML = "<button class='delete'>Usuń";
    });

    const isDoneChbxs = document.querySelectorAll(".is-done");

    isDoneChbxs.forEach(checkbox => {
        checkbox.addEventListener("click", function() {
            this.classList.toggle("to-do");
            this.classList.contains("to-do") ?
            (
                this.parentElement.nextElementSibling.style.textDecoration = "none",
                ToDoList.markAsUnCompleted(this.parentElement.parentElement.id)
                ) :
            (
                this.parentElement.nextElementSibling.style.textDecoration = "line-through",
                ToDoList.markAsUnCompleted(this.parentElement.parentElement.id)
                );
        });
    });

    const newTask = document.querySelector("input[name='new-task']");
    const addNewTaskBtn = document.querySelector(".add-new-task");

    addNewTaskBtn.addEventListener("click", function(event) {
        event.preventDefault();
        if (newTask.value) {
            ToDoList.add(newTask.value);
            const newestTask = ToDoList.tasks[ToDoList.tasks.length-1];
            const tr = document.createElement("tr");
            tbody.appendChild(tr);
            tr.id = newestTask.id;
            tr.appendChild(document.createElement("td")).innerHTML = "<input type='checkbox' class='is-done to-do'>";
            tr.appendChild(document.createElement("td")).innerText = newestTask.content;
            tr.appendChild(document.createElement("td")).innerHTML = "<button class='edit'>Edytuj";
            tr.appendChild(document.createElement("td")).innerHTML = "<button class='delete'>Usuń";
        };
    });

    const deleteTaskBtns = document.querySelectorAll(".delete");

    deleteTaskBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const taskToDelete = this.parentElement.parentElement;
            console.log(taskToDelete);
            ToDoList.delete(taskToDelete.id);
            tbody.removeChild(taskToDelete);
        });
    });

});