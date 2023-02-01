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

function displayCompletedTask(taskValue) {

    if (null == document.getElementById("completedContainer")) {
        let completedContainer = document.createElement("div");
        let completedHeader = document.createElement("div");
        let completedBody = document.createElement("div");
        let completedIcon = document.createElement("i");
        let completedHeaderText = document.createElement("div");
        let completedTaskList = document.createElement("ul");
        completedContainer.id = "completedContainer";
        completedHeader.className = "completed-header";
        completedHeader.setAttribute("onclick", "collapsible()");
        completedBody.className = "completed-body";
        completedBody.id = "completedBody";
        completedIcon.className = "fas fa-angle-right";
        completedIcon.id = "collapseButton";
        completedHeaderText.className = "completed-header-text";
        completedHeaderText.id = "completed-header-text";
        completedHeaderText.innerText = "Completed";
        completedTaskList.id = "completedTaskList";
        completedHeader.appendChild(completedIcon);
        completedHeader.appendChild(completedHeaderText);
        completedBody.appendChild(completedTaskList);
        completedContainer.appendChild(completedHeader);
        completedContainer.appendChild(completedBody);
        document.body.appendChild(completedContainer);
    }
    addToCompletedList(taskValue);
}

function addToCompletedList(taskValue) {
    let displayCompletedList = document.getElementById("completedTaskList");
    let task = document.createElement("li");
    let checkbox = document.createElement("input");
    let displayText = document.createElement("label");
    let completedTask = document.createElement("del");
    let customCheckBox = document.createElement("span");
    let deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fa-solid fa-trash")
    deleteIcon.setAttribute("onclick",
        "deleteTask(this)");
    customCheckBox.setAttribute("class", "checkmark");
    completedTask.innerText = taskValue;
    displayText.setAttribute("class", "display-text");
    checkbox.type = "checkbox";
    checkbox.checked = "true";
    checkbox.className = "check-box";
    checkbox.value = taskValue;
    checkbox.setAttribute("onchange", "completedTask(value, checked, this)");
    displayText.appendChild(completedTask);
    displayText.appendChild(checkbox);
    displayText.appendChild(customCheckBox);
    task.appendChild(displayText);
    task.appendChild(deleteIcon);
    task.setAttribute("class", 'task-list');
    displayCompletedList.appendChild(task);
}

function completedTask(value, checked, element) {

    if (checked) {
        displayCompletedTask(value);
        removeTask(element.parentNode);
        updateCompleteCount();
    } else {
        displayTask(value);
        removeTask(element.parentNode);
        removeCompleteBlock();
        updateCompleteCount();
    }
}

function deleteTask(value) {
    if (confirm("Confirm delete")) {
        value.parentElement.remove();
        removeCompleteBlock();
        updateCompleteCount();
    }
}

function removeTask(value) {
    value.parentElement.remove();
    removeCompleteBlock();
    updateCompleteCount();
}

function removeCompleteBlock() {
    if (null != document.getElementById("completedContainer") && 0 === document.getElementById("completedTaskList").childElementCount) {
        document.getElementById("completedContainer").remove();
    }
}

function collapsible() {
    if ("fas fa-angle-down" == document.getElementById("collapseButton").className) {
        document.getElementById("collapseButton").className = "fas fa-angle-right";
        document.getElementById("completedBody").style.display = "none";
    } else {
        document.getElementById("collapseButton").className = "fas fa-angle-down";
        document.getElementById("completedBody").style.display = "block";
    }
}

function updateCompleteCount() {
    if (null != document.getElementById("completedContainer")) {
        document.getElementById("completed-header-text").innerText = "Completed  " + document.getElementById("completedTaskList").childElementCount;
    }
}