let tasks = JSON.parse(localStorage.getItem("smartStudyTasks")) || [];

function addTask() {
    const subject = document.getElementById("subject").value.trim();
    const task = document.getElementById("task").value.trim();
    const date = document.getElementById("date").value;

    if (subject === "" || task === "" || date === "") {
        alert("Please fill in all fields.");
        return;
    }

    const newTask = {
        id: Date.now(),
        subject: subject,
        task: task,
        date: date,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();

    document.getElementById("subject").value = "";
    document.getElementById("task").value = "";
    document.getElementById("date").value = "";

    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(item => {
        const taskElement = document.createElement("div");

        taskElement.className =
            "task-item" + (item.completed ? " completed" : "");

        taskElement.innerHTML = `
            <strong>${item.subject}</strong>
            <p>${item.task}</p>
            <small>📅 ${item.date}</small>

            <div class="task-buttons">
                <button onclick="toggleTask(${item.id})">
                    ${item.completed ? "Undo" : "Done"}
                </button>

                <button class="delete-btn" onclick="deleteTask(${item.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(taskElement);
    });

    updateProgress();
}

function toggleTask(id) {
    const task = tasks.find(item => item.id === id);

    if (task) {
        task.completed = !task.completed;
        saveTasks();
        displayTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(item => item.id !== id);
    saveTasks();
    displayTasks();
}

function updateProgress() {
    const progressText = document.getElementById("progressText");
    const progressBar = document.getElementById("progressBar");

    if (tasks.length === 0) {
        progressText.textContent = "0% completed";
        progressBar.value = 0;
        return;
    }

    const completedTasks =
        tasks.filter(item => item.completed).length;

    const percentage =
        Math.round((completedTasks / tasks.length) * 100);

    progressText.textContent =
        `${percentage}% completed (${completedTasks}/${tasks.length} tasks)`;

    progressBar.value = percentage;
}

function saveTasks() {
    localStorage.setItem("smartStudyTasks", JSON.stringify(tasks));
}

displayTasks();