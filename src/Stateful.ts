import { Dissconnect, RefValue } from './interface';

export default class Stateful<T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(protected value: RefValue<T>) { }

  private listeners = new Set<(value: RefValue<T>) => void>();

  private emit() {
    // eslint-disable-next-line no-restricted-syntax
    for (const listener of Array.from(this.listeners.values())) {
      listener(this.snapshot());
    }
  }

  protected update(value: RefValue<T>) {
    if (this.value !== value) {
      this.value = value;
      this.emit();
    }
  }

  snapshot(): RefValue<T> {
    return this.value;
  }

  subscribe(callback: (value: RefValue<T>) => void): Dissconnect {
    this.listeners.add(callback);
    return {
      dissconnect: () => {
        // console.log('dissconnect');
        this.listeners.delete(callback);
      },
    };
  }
}
