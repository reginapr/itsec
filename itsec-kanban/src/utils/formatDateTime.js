/**
 * Format a date string"
 * @param {string|Date} input
 * @returns {string}
 */
export function formatDateTime(input) {
    const date = input instanceof Date ? input : new Date(input);
    let formatted = date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    formatted = formatted.replace(/\s*at\s*/i, ' ');
    return formatted.replace(/\b(am|pm)\b/i, match => match.toUpperCase());
}
