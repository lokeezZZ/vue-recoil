declare type BaseTypes = string | number | boolean;

declare type Builtin = Function | Date | Error | RegExp;

declare type CollectionTypes = IterableCollections | WeakCollections;

declare type IterableCollections = Map<any, any> | Set<any>;

declare type WeakCollections = WeakMap<any, any> | WeakSet<any>;

declare type UnwrappedObject<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};

declare type UnwrapRefSimple<T> = T extends Builtin | CollectionTypes | BaseTypes ? T : T extends Array<any> ? {[K in keyof T]: UnwrapRefSimple<T[K]>;} : T extends object ? UnwrappedObject<T> : T;

export declare type UnwrapRef<T> = T extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<T>;

export declare interface Ref<T> {
  value: T;
}

export declare type RefValue<T> = T | Ref<T> | UnwrapRef<T>;

export interface Dissconnect {
  dissconnect: () => void;
}

