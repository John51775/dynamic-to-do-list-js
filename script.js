document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // --- Function to load tasks from Local Storage ---
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = do not save again
    }

    // --- Function to add a task ---
    function addTask(taskText, save = true) {
        // If taskText is not passed (from input), get it from input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Remove task logic
        removeBtn.onclick = () => {
            taskList.removeChild(li);

            // Update Local Storage after removal
            const tasks = [];
            taskList.querySelectorAll('li').forEach(item => {
                tasks.push(item.firstChild.textContent);
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear input field
        taskInput.value = "";
    }

    // --- Load tasks on page load ---
    loadTasks();

    // --- Event listener for Add Task button ---
    addButton.addEventListener('click', () => addTask());

    // --- Event listener for Enter key ---
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});