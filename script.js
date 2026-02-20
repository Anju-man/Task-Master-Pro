/*PROJECT: Task Master Pro 
   AUTHOR: [ANJUM]
   DATE: 2024
   DESCRIPTION: A dynamic to-do list with local storage and auto-changing backgrounds.*/
window.onload = function() {
    const saved = JSON.parse(localStorage.getItem("myTasks")) || [];
    saved.forEach(task => {
        const ul = document.getElementById('taskList');
        const li = document.createElement('li');
        li.innerHTML = `<span>${task}</span><button class="delete-btn" onclick="this.parentElement.remove(); saveTasks();">X</button>`;
        ul.appendChild(li);
    });
    document.body.style.backgroundColor = colors[saved.length % colors.length];
    colorIndex = saved.length; 
};
const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff"];
let colorIndex = 0;
function addTask() {
    const input = document.getElementById('taskInput');
    const taskValue = input.value;

    if (taskValue.trim() === "") {
        alert("Please type a task first!");
        return;
    }

    const ul = document.getElementById('taskList');
    const li = document.createElement('li');
    
    li.innerHTML = `
        <span>${taskValue}</span>
        <button class="delete-btn" onclick="this.parentElement.remove(); saveTasks();">X</button>
    `;
    
    ul.appendChild(li);
    input.value = "";
    saveTasks();//<---
    document.body.style.backgroundColor = colors[colorIndex % colors.length];
    colorIndex++;
} // This is the final bracket for addTask()

// This allows the "Enter" key to work
function handleKeyPress(event) {
    if (event.key === "Enter") {
        addTask();
    }
}
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li span').forEach(span => {
        tasks.push(span.innerText);
    });
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}
function clearAll() {
    if (confirm("Are you sure you want to delete ALL tasks?")) {
        // Clears the list from the screen
        document.getElementById('taskList').innerHTML = "";
        
        // Clears the data from your computer's memory
        localStorage.removeItem("myTasks");
        
        // Resets the color starting point
        colorIndex = 0;
        document.body.style.backgroundColor = colors[0];
        
        // Updates the saved state
        saveTasks();
    }
}
