import { createClient } from '@supabase/supabase-js'

/**
 * Creates an API client instance for interacting with a Supabase.
 * @returns The API client instance.
 */
export const supabase = createClient('https://ukcadoakepqgjkfspbki.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrY2Fkb2FrZXBxZ2prZnNwYmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2ODkxODEsImV4cCI6MjAyODI2NTE4MX0.Jj0mDYWEOsJQGXu8-DarCrlRgxytRwHoX5Epa9iDk3Y')
