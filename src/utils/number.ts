/**
 * Converts a numeric value to a formatted price string.
 * @param {number} value - The numeric value to be converted to a price.
 * @returns {string} The formatted price string.
 */
export function toPrice(value: number) {
    // just for demo, сойдет;
    return value.toLocaleString('en-US',{
        style: 'currency',
        currency: 'USD'
    })
}
