import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from 'vitest';
import { useCartStore } from '../stores/useCartStore';

beforeEach(() => {
  useCartStore.setState(useCartStore.getInitialState());
});

afterEach(() => {
  cleanup();
  useCartStore.setState(useCartStore.getInitialState());
});