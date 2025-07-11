// Global List
let tasks = [];

// Function to add a task
function addTask() {
	event.preventDefault();
    const taskInput = document.getElementById('tambah_tugas');
    const dueDateInput = document.getElementById('tanggal');

    // Validate inputs
    if (taskInput.value === '' || dueDateInput.value === '') {
        alert('Harap isi semua kolom.');
    } else {
        // Create a new task object
        const newTask = {
            id: Date.now(), // Unique ID based on current timestamp
            task: taskInput.value,
            dueDate: dueDateInput.value,
            completed: false
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Clear the input fields
        taskInput.value = '';
        dueDateInput.value = '';

        // Log the new task (for demonstration purposes)
        displayTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list
    tasks.forEach(element => {
        const taskItem = `
		<tr>
			<td id="" class="px-4 py-3">${element.task}</td>
			<td id="" class="px-4 py-3">${element.dueDate}</td>
			<td id="" class="px-4 py-3"><input type="checkbox" ${element.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${element.id})">
            </td>
			<td id="" class="px-4 py-3">
				<button class="bg-red-500 text-white p-1 rounded" onclick="deleteTask(${element.id})">Hapus</button>
			</td>
		</tr>
        `;
        taskList.innerHTML += taskItem;
    });
}

// Function to delete a specific task
function deleteTask(id) {
    // Find the index of the task to delete
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        // Remove the task from the tasks array
        tasks.splice(taskIndex, 1);
        displayTasks(); // Refresh the displayed task list
    }
}

// Function to delete all task
function deleteAllTasks() {
    tasks = []; // Clear the tasks array
    displayTasks(); // Refresh the displayed task list
}

function toggleTaskCompletion(id) {
    // Find the task by ID
    const task = tasks.find(task => task.id === id);
    if (task) {
        // Toggle the completed status
        task.completed = !task.completed;
        displayTasks(); // Refresh the displayed task list
    }
}

function filterCompletedTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    const completedTasks = tasks.filter(task => task.completed); // Get completed tasks

    completedTasks.forEach(element => {
        const taskItem = `
        <tr>
            <td class="px-4 py-3">${element.task}</td>
            <td class="px-4 py-3">${element.dueDate}</td>
            <td class="px-4 py-3">${element.completed ? 'Selesai' : 'Proses'}</td>
            <td class="px-4 py-3">
                <button class="bg-red-500 text-white p-1 rounded" onclick="deleteTask(${element.id})">Hapus</button>
            </td>
        </tr>
        `;
        taskList.innerHTML += taskItem;
    });
}
