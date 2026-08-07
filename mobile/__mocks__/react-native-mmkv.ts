/**
 * Jest manual mock for react-native-mmkv. The real package eagerly imports
 * react-native-nitro-modules (a native TurboModule) at the top of its
 * createMMKV.js file, even though its own internal isTest() branch would
 * otherwise select a mock implementation -- that import happens before
 * isTest() is ever checked, so it still throws in a plain Jest/Node
 * environment with no native modules available. This manual mock replaces
 * the whole package for tests with a minimal in-memory implementation that
 * satisfies src/state/storage.ts's actual usage (set/getString/remove).
 */
export function createMMKV(_config?: { id?: string }) {
  const store = new Map<string, string>();
  return {
    set: (key: string, value: string | number | boolean) => {
      store.set(key, String(value));
    },
    getString: (key: string) => store.get(key),
    remove: (key: string) => {
      store.delete(key);
    },
    getAllKeys: () => Array.from(store.keys()),
    clearAll: () => store.clear(),
  };
}
