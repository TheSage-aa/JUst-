/**
 * MMKV-backed storage adapter for Zustand's persist middleware.
 * Offline-first per Book VIII SS52 architecture note: all app state must
 * be readable/writable with zero network dependency.
 */
import { createMMKV } from "react-native-mmkv";
import type { StateStorage } from "zustand/middleware";

export const mmkv = createMMKV({ id: "saabi-app-storage" });

export const zustandMmkvStorage: StateStorage = {
  getItem: (name) => mmkv.getString(name) ?? null,
  setItem: (name, value) => mmkv.set(name, value),
  removeItem: (name) => {
    mmkv.remove(name);
  },
};
