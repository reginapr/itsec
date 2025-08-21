/**
 * Fetch tasks from an API endpoint.
 * @returns {Promise<Array>} Array of task objects
 */
export async function fetchTasks() {
    const response = await fetch('https://mocki.io/v1/9d95ef57-dd7b-496b-84c6-871b61b1b9a7'); 
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return await response.json();
}
