// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PromiseWorker from 'promise-worker';

jest.mock('promise-worker');

class Worker {
  constructor(stringUrl) {
    this.url = stringUrl;
    this.onmessage = () => {};
  }

  postMessage(msg) {
    this.onmessage(msg);
  }
}

window.Worker = Worker;
