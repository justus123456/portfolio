document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('important-form');
    const inputField = document.getElementById('idk');

    if (form && inputField) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const task = inputField.value.trim();
            if (task) {
                // Retrieve existing tasks from local storage
                let tasks = JSON.parse(localStorage.getItem('tasks'));

                // Check if tasks is an array
                if (!Array.isArray(tasks)) {
                    tasks = []; // Initialize as an empty array if it's not
                }

                // Add new task to the array
                tasks.push(task);

                // Save updated tasks back to local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));

                // Clear input field
                inputField.value = '';

                // Redirect to display page
                window.location.href = 'sow.html';
            }
        });
    }
});
