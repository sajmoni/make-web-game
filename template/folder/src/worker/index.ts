import { MessageType } from '/enum'

onmessage = ({ data: { type, payload: _ } }): void => {
  switch (type) {
    case MessageType.TO_WORKER.INITIALIZE_WORKER:
      // @ts-expect-error
      postMessage({
        type: MessageType.FROM_WORKER.WORKER_INITIALIZED,
        payload: { hello: 'world' },
      })
      break

    default:
      break
  }
}
