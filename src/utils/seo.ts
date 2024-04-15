/**
 * Returns a safe title string. If the input value is falsy, it returns a default value.
 * @param {string} value - The input value to be checked.
 * @param {string} [defaultValue='Loading...'] - The default value to return if the input value is falsy.
 * @returns {string} The safe title string.
 */
export function safeTitle(value: string, defaultValue: string = 'Loading...') {
    return value ? value : defaultValue
}
