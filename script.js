let boardData = JSON.parse(localStorage.getItem("kanbanBoard")) || {
    todo: [],
    doing: [],
    done: []
};

function saveBoard() {
    localStorage.setItem("kanbanBoard", JSON.stringify(boardData));
}

function renderBoard() {
    ["todo", "doing", "done"].forEach(status => {
        const container = document.getElementById(status);
        container.innerHTML = "";

        boardData[status].forEach((task, index) => {
            const taskDiv = document.createElement("div");
            taskDiv.className = "task";
            taskDiv.draggable = true;

            taskDiv.innerHTML = `
                <span>${task}</span>
                <button onclick="removeTask('${status}', ${index})">×</button>
            `;

            taskDiv.addEventListener("dragstart", e => {
                e.dataTransfer.setData(
                    "text/plain",
                    JSON.stringify({ task, status, index })
                );
            });

            container.appendChild(taskDiv);
        });
    });
}

function addTask(status) {
    const task = prompt("Enter task name:");
    if (task) {
        boardData[status].push(task);
        saveBoard();
        renderBoard();
    }
}

function removeTask(status, index) {
    boardData[status].splice(index, 1);
    saveBoard();
    renderBoard();
}

function dropTask(e, newStatus) {
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    boardData[data.status].splice(data.index, 1);
    boardData[newStatus].push(data.task);
    saveBoard();
    renderBoard();
}

renderBoard();
