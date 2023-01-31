let toDoList = [];
let displayList = document.getElementById("taskList");

function addTask(newTask) {
    toDoList.push(newTask)
    document.getElementById("taskName").value = "";
    displayTask(newTask);
}

function displayTask(newTask) {
    let task = document.createElement("li");
    let checkbox = document.createElement("input");
    let displayText = document.createElement("label");
    let customCheckBox = document.createElement("span");
    let deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fa-solid fa-trash")
    deleteIcon.setAttribute("onclick",
        "deleteTask(this)");
    customCheckBox.setAttribute("class", "checkmark");
    displayText.innerText = newTask;
    displayText.setAttribute("class", "display-text");
    checkbox.type = "checkbox";
    checkbox.className = "check-box";
    checkbox.value = newTask;
    checkbox.setAttribute("onchange", "completedTask(value, checked, this)");
    displayText.appendChild(checkbox);
    displayText.appendChild(customCheckBox);
    task.appendChild(displayText);
    task.appendChild(deleteIcon);
    task.setAttribute("class", 'task-list');
    displayList.appendChild(task);
}

function displayCompletedTask() {

    if (null == document.getElementById("cosfdfdsafd")) {
        let div = document.createElement("div");
        let completedHeader = document.createElement("div");
        let completedButton = document.createElement("Button");
        div.className = "completed-container";
        div.id = "cosfdfdsafd"
        completedHeader.innerText = "Completed Task";
        div.appendChild(completedButton);
        div.appendChild(completedHeader);
        document.body.appendChild(div);
    }
}

function completedTask(value, checked, element) {
    if (checked) {
        console.log(element.prevoiusSibling);
        displayCompletedTask();
        deleteTask(element.parentNode);
    } else {
        displayTask(value);
    }
}

function deleteTask(value) {
    value.parentElement.remove();
}