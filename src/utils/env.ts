/**
 * Retrieves the value of an environment variable.
 * @param {string} key - The key of the environment variable to retrieve.
 * @param {string} [defaultValue] - The default value to return if the environment variable is not set.
 * @returns {string | undefined} The value of the environment variable, or the default value if it's not set.
 */
export function env(key: string, defaultValue?: string) {
  if (import.meta.env[`VITE_${key}`])
    return import.meta.env[`VITE_${key}`]

  return defaultValue
}
