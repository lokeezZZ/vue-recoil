# vue-recoil &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/lokeezZZ/vue-recoil/master/LICENSE)

Recoil is an experimental set of utilities for state management with Vue 3.0.

## Installation

The Recoil package lives in [npm](https://www.npmjs.com/). To install the latest stable version, run the following command:

```shell
npm install --save vue-recoil
```

## How to use

```js
// `./store/atom.js`
import {atom} from 'vue-recoil';
export const atomState = atom({
  key: 'counter',
  default: 1,
});
```

```js
// `.vue`
import {defineComponent} from 'vue';
import {useRecoilState} from 'vue-recoil';
import {atomState} from './store/atom';

export default defineComponent({
  setup() {
    let [count, setCount] = useRecoilState(atomState);
    const increment = () => {
      setCount(count + 1);
    };
    return {
      count,
      increment,
    };
  },
});
```

### License

Recoil is [MIT licensed](./LICENSE).
