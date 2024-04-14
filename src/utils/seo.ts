export function safeTitle(value: string, defaultValue: string = 'Loading...') {
    return value ? value : defaultValue
}
