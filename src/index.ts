import {
  reactive, computed, onUnmounted,
} from 'vue';
import { RefValue } from './interface';
import Atom from './Atom';
import Stateful from './Stateful';

export function useRecoilValue<T>(state: Stateful<T>): RefValue<T> {
  const value = reactive({
    value: state.snapshot(),
  });
  const snapshot = computed(() => value.value);
  const { dissconnect } = state.subscribe(() => {
    // console.log('subscribe')
    value.value = state.snapshot()
  });
  onUnmounted(() => {
    dissconnect();
    // console.log('recoil unmount', state);
  });
  return snapshot as RefValue<T>;
}

export function useRecoilState<T>(atom: Atom<T>): [T, (value: T) => void] {
  const value = useRecoilValue<T>(atom);
  return [value as T, (newValue) => {
    atom.setState(newValue);
    // console.log('atom', atom);
  }];
}
