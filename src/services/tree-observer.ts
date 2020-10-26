type callback = (payload: any) => void;
type id = string | number;

/**
 * The tree observer holds subscribers to a tree. When notified,
 * the notification payload is send to all subscribers
 * Generally, you should get by with notify only.
 */
interface ITreeObserver {
    /**
     * Subscribe a callback method that is executed with each notify
     */
    subscribe(id: id, callback: callback): void;
    /**
     * Notify all subscribers about a new event
     * @param payload any object that should be tailored-made for targeted evaluator
     */
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
