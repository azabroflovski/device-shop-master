import mitt from 'mitt'

interface Events {
  REQUEST_LIMIT_ERROR: any
}

export const alertBus = mitt<Events>()
