export function env(key: string, defaultValue?: string) {
    if (import.meta.env['VITE_' + key]) {
        return import.meta.env['VITE_' + key]
    }

    return defaultValue
}
