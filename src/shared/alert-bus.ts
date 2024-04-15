import mitt from 'mitt'

type Events = {
    REQUEST_LIMIT_ERROR: any
}

export const alertBus = mitt<Events>()
