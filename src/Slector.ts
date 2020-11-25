
import Stateful from './Stateful';
import { RefValue } from './interface';

type SelectorGenerator<T> = (content: { get: (dep: Stateful<T>) => RefValue<T> }) => T;

export default class Selector<V> extends Stateful<V> {
  constructor(private readonly generate: SelectorGenerator<V>) {
    super(undefined as never);
    this.value = generate({ get: (dep) => this.addSub(dep) });
  }

  private registerDeps = new Set<Stateful<V>>();

  private addSub(dep: Stateful<V>) {
    if (!this.registerDeps.has(dep)) {
      dep.subscribe(() => this.updateSecector());
      this.registerDeps.add(dep);
    }
    return dep.snapshot();
  }

  private updateSecector() {
    this.update(this.generate({ get: (dep) => this.addSub(dep) }));
  }
}

export function selector<V>(value: {
  key: string; // TODO:唯一标识
  get: SelectorGenerator<V>;
}): Selector<V> {
  return new Selector(value.get);
}
