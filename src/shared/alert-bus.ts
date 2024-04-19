import mitt from 'mitt'

/**
 * Event bus for handling alerts.
 */
export const alertBus = mitt<{
  /**
   * Event emitted when there's a request limit error.
   * @param data - Data related to the request limit error.
   */
  REQUEST_LIMIT_ERROR: any

  /**
   * Event emitted when there's a network error.
   * @param data - Data related to the network error.
   */
  NETWORK_ERROR: any
}>()
