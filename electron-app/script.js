const modal = document.querySelector(".task-modal");
const form = document.getElementById("taskForm");

function openModal() {
    modal.classList.add("open");
}

function closeModal() {
    modal.classList.remove("open");
    form.reset();
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    createTask(e);    
    closeModal();
})

class Task {
    constructor(title, hasDeadline, deadlineDate, isDaily) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.hasDeadline = hasDeadline;
        this.deadlineDate = deadlineDate;
        this.isDaily = isDaily;
        this.isCompleted = false;
        this.createdAt = new Date();
    }
}

let tasks = []

function createTask(e) {
    const title = e.target[0].value;
    const hasDeadline = e.target[1].checked;
    const deadlineDate = e.target[2].value;
    const isDaily = e.target[3].checked;

    const newTask = new Task(title, hasDeadline, deadlineDate, isDaily)

    tasks.push(newTask)
    console.log(tasks);
    renderTasks();
}

function renderTasks() {
    const container = document.querySelector(".task-list");
    container.innerHTML = "";

    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const title = document.createElement("h1");
        title.textContent = "Task:" + task.title;

        const deadlineDate = document.createElement("span");
        deadlineDate.textContent = formatDate(task.deadlineDate);

        taskDiv.appendChild(title);
        taskDiv.appendChild(deadlineDate);
        container.appendChild(taskDiv);
    })
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}
