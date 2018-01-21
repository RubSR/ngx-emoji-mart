import * as store from './store';

const DEFAULTS = [
  '+1',
  'grinning',
  'kissing_heart',
  'heart_eyes',
  'laughing',
  'stuck_out_tongue_winking_eye',
  'sweat_smile',
  'joy',
  'scream',
  'disappointed',
  'unamused',
  'weary',
  'sob',
  'sunglasses',
  'heart',
  'poop',
];

let frequently, initialized;
let defaults = {};

function init() {
  initialized = true;
  frequently = store.get('frequently');
}

export function add(emoji) {
  if (!initialized) {
    init();
  }
  const { id } = emoji;

  if (!frequently) {
    frequently = defaults;
  }
  if (!frequently[id]) {
    frequently[id] = 0;
  }
  frequently[id] += 1;

  store.set('last', id);
  store.set('frequently', frequently);
}

export function get(perLine) {
  if (!initialized) {
    init();
  }
  if (!frequently) {
    defaults = {};

    const result = [];

    for (let i = 0; i < perLine; i++) {
      defaults[DEFAULTS[i]] = perLine - i;
      result.push(DEFAULTS[i]);
    }
    return result;
  }

  const quantity = perLine * 4;
  const frequentlyKeys = [];

  for (const key of Object.keys(frequently)) {
    if (frequently.hasOwnProperty(key)) {
      frequentlyKeys.push(key);
    }
  }

  const sorted = frequentlyKeys
    .sort((a, b) => frequently[a] - frequently[b])
    .reverse();
  const sliced = sorted.slice(0, quantity);

  const last = store.get('last');

  if (last && sliced.indexOf(last) === -1) {
    sliced.pop();
    sliced.push(last);
  }

  return sliced;
}
