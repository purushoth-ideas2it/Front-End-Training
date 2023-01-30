let toDoList = [];
let displayList = document.getElementById("taskList");

function addTask(newTask) {
    toDoList.push(newTask)
    alert("Task Added Successfuly");
    document.getElementById("taskName").value = "";
    displayTask(newTask);
}

function displayTask(newTask) {
    let task = document.createElement("li");
    let checkbox = document.createElement("input");
    let displayText = document.createElement("label");
    displayText.innerText = newTask;
    checkbox.type = "checkbox";
    checkbox.setAttribute("class", "check-box");
    checkbox.setAttribute("value", newTask);
    task.appendChild(checkbox);
    task.appendChild(displayText);
    task.setAttribute("class", 'task-list');
    displayList.appendChild(task);
}