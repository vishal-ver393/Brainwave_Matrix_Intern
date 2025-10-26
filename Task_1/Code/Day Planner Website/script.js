// Display current date
const currentDayEl = document.getElementById("currentDay");
const today = new Date();
currentDayEl.textContent = today.toDateString();

// Time slots (9 AM - 5 PM)
const hours = [
    "9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM"
];

const plannerEl = document.querySelector(".planner");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

// Create time blocks
hours.forEach(hour => {
    const block = document.createElement("div");
    block.className = "time-block";

    const label = document.createElement("div");
    label.className = "time-label";
    label.textContent = hour;

    const input = document.createElement("input");
    input.className = "task-input";
    input.type = "text";
    input.value = tasks[hour] || "";

    // Mark completed tasks
    if (tasks[hour + "_completed"]) {
        input.classList.add("completed");
    }

    const button = document.createElement("button");
    button.className = "save-btn";
    button.textContent = "Save";

    // Save button click event
    button.addEventListener("click", () => {
        tasks[hour] = input.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    // Double-click to mark completed
    input.addEventListener("dblclick", () => {
        input.classList.toggle("completed");
        tasks[hour + "_completed"] = input.classList.contains("completed");
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    block.appendChild(label);
    block.appendChild(input);
    block.appendChild(button);

    plannerEl.appendChild(block);
});
