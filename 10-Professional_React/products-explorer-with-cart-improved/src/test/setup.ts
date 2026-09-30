import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from 'vitest';
import { useCartStore } from '../stores/useCartStore';

beforeEach(() => {
  useCartStore.setState(useCartStore.getInitialState());
});

afterEach(() => {
  cleanup();
  useCartStore.setState(useCartStore.getInitialState());
  vi.restoreAllMocks();
});