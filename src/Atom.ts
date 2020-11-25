
import { RefValue } from './interface';

import Stateful from './Stateful';

export default class Atom<T> extends Stateful<T> {
  public setState(value: RefValue<T>) {
    super.update(value);
  }
}

export function atom<T>(value: {
  key: string;
  default: T & RefValue<T>;
}): Atom<T> {
  return new Atom(value.default);
}
