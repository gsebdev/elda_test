export class Logger {
  private readonly context: string;

  constructor(context: string) {
    this.context = context;
  }

  log(message: string, data?: unknown): void {
    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] [${this.context}] [LOG] ${message}`,
      data ? JSON.stringify(data) : '',
    );
  }

  warn(message: string, data?: unknown): void {
    const timestamp = new Date().toISOString();
    console.warn(
      `[${timestamp}] [${this.context}] [WARN] ${message}`,
      data ? JSON.stringify(data) : '',
    );
  }

  error(message: string, error?: Error): void {
    const timestamp = new Date().toISOString();
    console.error(
      `[${timestamp}] [${this.context}] [ERROR] ${message}`,
      error?.message || error?.toString() || '',
    );
    if (error?.stack) {
      console.error(error.stack);
    }
  }

  debug(message: string, data?: unknown): void {
    if (process.env.NODE_ENV !== 'production') {
      const timestamp = new Date().toISOString();
      console.log(
        `[${timestamp}] [${this.context}] [DEBUG] ${message}`,
        data ? JSON.stringify(data) : '',
      );
    }
  }
}
