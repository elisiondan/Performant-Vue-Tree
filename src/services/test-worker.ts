/* eslint-disable no-restricted-globals */

class MessageManager {
    private readonly message: string;

    public constructor(message: string) {
      this.message = message;
    }

    public sayHello(location: string): void {
      console.log(`Hello from ${location}!`);
    }

    public printMessage(): void {
      console.log(`MESSAGE: ${this.message}`);
    }
}

let messageManager: MessageManager | null = null;

function executeFunction<T extends MessageManager>(target: T, func: keyof T, args: any): void {
  (target[func] as unknown as Function)(args);
}

addEventListener('message', (e) => {
  const message = e.data || e;

  switch (message.type) {
    case 'init':
      messageManager = new MessageManager(message.args);
      break;

    case 'exec':
      if (messageManager) {
        executeFunction(messageManager, message.func, message.args);
      }
      break;

    default:
      break;
  }
});
