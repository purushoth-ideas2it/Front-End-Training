let toDoList = [];
let displayList = document.getElementById("taskList");

function addTask(newTask) {
    if ("" != newTask) {
        toDoList.push(newTask)
        document.getElementById("taskName").value = "";
        displayTask(newTask);
    } else {
        alert("Cannot Add Empty Task");
    }
}

function displayTask(newTask) {
    let task = document.createElement("li");
    let checkbox = document.createElement("input");
    let displayTextContainer = document.createElement("label");
    let displayText = document.createElement("span");
    displayText.innerText = newTask;
    let customCheckBox = document.createElement("span");
    let editIcon = document.createElement("i");
    let deleteIcon = document.createElement("i");
    editIcon.className = "far fa-edit";
    editIcon.setAttribute("onclick", "editTask(this)");
    deleteIcon.setAttribute("class", "fa-solid fa-trash")
    // deleteIcon.setAttribute("onclick",
    // "deleteTask(this)");
    customCheckBox.setAttribute("class", "checkmark");
    // displayText.innerText = newTask;
    displayText.setAttribute("class", "display-text");
    checkbox.type = "checkbox";
    checkbox.className = "check-box";
    checkbox.value = newTask;
    checkbox.setAttribute("onchange", "completedTask(value, checked, this)");
    displayTextContainer.appendChild(checkbox);
    displayTextContainer.appendChild(customCheckBox);
    task.appendChild(displayTextContainer);
    task.appendChild(displayText);
    task.appendChild(editIcon);
    task.appendChild(deleteIcon);
    task.setAttribute("class", 'task-list');
    displayList.addEventListener('click', display);
    displayList.appendChild(task);
}

function editTask(element) {
    saveButton = document.createElement("button");
    cancelButton = document.createElement("i");
    cancelButton.className = "fa fa-times";
    cancelButton.setAttribute("onclick", "cancel(this.previousSibling)");
    saveButton.id = "save-button";
    saveButton.innerText = "SAVE";
    saveButton.setAttribute("onclick", "updateTask(this)");
    element.style.display = "none";
    element.nextSibling.style.display = "none";
    element.previousSibling.contentEditable = true;
    element.previousSibling.style.outline = "none";
    element.previousSibling.focus();
    element.parentElement.appendChild(saveButton);
    element.parentElement.appendChild(cancelButton);
}

function updateTask(element) {
    let task = element.previousSibling.previousSibling.previousSibling.innerText;
    if (0 == task.length) {
        alert("cannot Update Task");
        element.previousSibling.previousSibling.previousSibling.focus();
        return;
    }
    element.previousSibling.style.display = "block";
    element.previousSibling.previousSibling.style.display = "block";
    element.previousSibling.previousSibling.previousSibling.contentEditable = false;
    element.nextSibling.remove();
    element.remove();
}

function cancel(element) {
    let editTaskElement = element.previousSibling.previousSibling.previousSibling;
    editTaskElement.contentEditable = false;
    editTaskElement.innerText = editTaskElement.previousSibling.firstChild.value;
    element.previousSibling.style.display = "block";
    element.previousSibling.previousSibling.style.display = "block";
    element.nextSibling.remove();
    element.remove();
}

function display(event) {
    if (event.target.className == "fa-solid fa-trash") {
        let x = showWarning;
        console.log(x);
        if (x) {
            deleteTask(event.target.parentNode)
        }
    }
}

function displayCompletedTask(taskValue) {

    if (null == document.getElementById("completedContainer")) {
        let completedContainer = document.createElement("div");
        let completedHeader = document.createElement("div");
        let completedBody = document.createElement("div");
        let completedIcon = document.createElement("i");
        let completedHeaderText = document.createElement("div");
        let completedTaskList = document.createElement("ul");
        completedTaskList.addEventListener('click', display);
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
    // deleteIcon.setAttribute("onclick",
    //     "deleteTask(this)");
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
        value.remove();
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

function showWarning() {
    let popupcontainer = document.createElement("div");
    let displayText = document.createElement("span");
    let confirmButton = document.createElement("button");
    let cancelButton = document.createElement("button");
    popupcontainer.id = "popupContainer";
    displayText.id = "displayContainer";
    confirmButton.id = "confirmButton";
    confirmButton.setAttribute('onclick', 'confirmDelete()');
    confirmButton.innerText = "Confirm";
    cancelButton.innerText = "Cancel";
    cancelButton.id = "cancelButton"
    displayText.innerText = "CONFIRM DELETE";
    popupcontainer.appendChild(displayText);
    popupcontainer.appendChild(confirmButton);
    popupcontainer.appendChild(cancelButton);
    document.body.appendChild(popupcontainer);
}

function confirmDelete() {
    document.getElementById("popupContainer").remove();
    let x = true;
    return x;
}