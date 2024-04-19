/**
 * Factory function that creates a required validation rule with a custom error message.
 * @param {string} message The custom error message for the required rule.
 */
export function requiredRuleFactory(message: string) {
  return {
    required: true,
    message,
  }
}
