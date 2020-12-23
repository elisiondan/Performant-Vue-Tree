import PromiseWorker from 'promise-worker';

export default class WorkerService {
  promiseWorker: PromiseWorker;

  worker: Worker;

  /**
   * Create new promise worker service
   * @param worker Worker object with module option
   */
  constructor(worker: Worker) {
    this.promiseWorker = new PromiseWorker(worker);
    this.worker = worker;
  }

  /**
   * Async method to communicate with the worker thread.
   * @param data (object, array, string, number) will be stringified and passed to the worker
   * @return Promise resolved with worker response
   */
  async postMessage<T>(data: any): Promise<T> {
    try {
      const result = await this.promiseWorker.postMessage(data);
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Terminate the existing worker, when it's not needed anymore.
   */
  destroy() {
    this.worker.terminate();
  }
}
