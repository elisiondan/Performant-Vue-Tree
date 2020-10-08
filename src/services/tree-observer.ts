type callback = (payload: any) => void;
type id = string | number;

interface ITreeObserver {
    subscribe(id: id, callback: callback): void;
    notify(payload: any): void;
}

class TreeObserver implements ITreeObserver {
    subscribers = new Map<id, callback>();

    subscribe(id: id, callback: callback) {
      this.subscribers.set(id, callback);
    }

    notify(payload: any) {
      this.subscribers.forEach((callback) => {
        callback(payload);
      });
    }
}

const treeObserver = new TreeObserver();

export default treeObserver;
