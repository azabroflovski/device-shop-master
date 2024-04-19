import mitt from 'mitt'

export const alertBus = mitt<{
  REQUEST_LIMIT_ERROR: any
  NETWORK_ERROR: any
}>()
