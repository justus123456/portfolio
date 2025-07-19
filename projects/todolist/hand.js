document.addEventListener('DOMContentLoaded', () => {
    const result = document.querySelector('.repeat');

    if (result) {
        // Retrieve tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        if (tasks.length > 0) {
            // Create list items from tasks with delete buttons, including numbering
            result.innerHTML = tasks.map((task, index) => `
                <li>
                    ${index + 1}. ${task} 
                    <span><button class="del" data-index="${index}">Delete</button></span>
                </li>
            `).join('');
        } else {
            result.innerHTML = '<li>No tasks found.</li>';
        }

        // Handle delete button clicks
        result.addEventListener('click', (event) => {
            if (event.target.classList.contains('del')) {
                const index = event.target.getAttribute('data-index');
                
                // Retrieve the existing tasks
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

                // Remove the task at the specified index
                tasks.splice(index, 1);

                // Save the updated tasks back to local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));

                // Re-render the list
                result.innerHTML = tasks.map((task, index) => `
                    <li>
                        ${index + 1}. ${task} 
                        <span><button class="del" data-index="${index}">Delete</button></span>
                    </li>
                `).join('');
            }
        });
    } else {
        console.error('Element with class "repeat" not found.');
    }
});
