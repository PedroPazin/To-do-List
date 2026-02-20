const modal = document.querySelector(".task-modal");
const form = document.getElementById("taskForm");
const deadlineDateInput = document.getElementById("deadlineDate");

function openModal() {
    modal.classList.add("open");
}

function closeModal() {
    modal.classList.remove("open");
    form.reset();
}

function showDeadlineDate() {
    deadlineDateInput.classList.toggle("open");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    createTask(e);
    closeModal();
});

class Task {
    constructor(title, description, hasDeadline, deadlineDate, isDaily) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.hasDeadline = hasDeadline;
        this.deadlineDate = deadlineDate;
        this.isDaily = isDaily;
        this.isCompleted = false;
        this.createdAt = new Date();
    }
}

let tasks = [];

function createTask(e) {
    const title = e.target[0].value;
    const description = e.target[1].value;
    const hasDeadline = e.target[2].checked;
    const deadlineDate = e.target[3].value;
    const isDaily = e.target[4].checked;

    const newTask = new Task(
        title,
        description,
        hasDeadline,
        deadlineDate,
        isDaily,
    );

    tasks.push(newTask);
    renderTasks();
}

function deleteTask(taskId) {
    tasks.forEach((task, index) => {
        if ((taskId == task.id)) {
            tasks.splice(index, 1);
        }
    });

    renderTasks();
}

function renderTasks() {
    const container = document.querySelector(".task-list");
    container.innerHTML = "";

    tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const title = document.createElement("h1");
        title.textContent = task.title;

        const description = document.createElement("p");
        description.classList.add("description");
        description.textContent = task.title;

        const deadlineDate = document.createElement("span");
        deadlineDate.textContent = formatDate(task.deadlineDate);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        taskDiv.appendChild(title);
        taskDiv.appendChild(description);
        if (task.hasDeadline) {
            taskDiv.appendChild(deadlineDate);
        }
        taskDiv.appendChild(deleteButton);
        container.appendChild(taskDiv);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
