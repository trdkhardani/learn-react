import { describe, it, expect, type ExpectStatic } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
// import Cart from "../pages/Cart";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "../AppRoutes";

const initialActions = async (expect: ExpectStatic, user: UserEvent) => {
  expect(screen.getByText("Searching Products...")).toBeInTheDocument();

  expect(
    await screen.findByTestId("products-container-element"),
  ).toBeInTheDocument();

  const addToCartButtonOne = await screen.findByTestId("add-to-cart-button-1");
  const addToCartButtonTwo = await screen.findByTestId("add-to-cart-button-2");
  const addToCartButtonThree = await screen.findByTestId(
    "add-to-cart-button-3",
  );

  expect(addToCartButtonOne).toBeInTheDocument();
  expect(addToCartButtonTwo).toBeInTheDocument();
  expect(addToCartButtonThree).toBeInTheDocument();

  await user.click(addToCartButtonOne);
  await user.click(addToCartButtonTwo);
  await user.click(addToCartButtonThree);

  const cartNavLink = screen.getByTestId("cart-nav-link");

  expect(cartNavLink).toHaveTextContent("Cart (3)");

  await user.click(cartNavLink);

  const cartPage = screen.getByRole("heading", {
    name: "Cart",
  });

  const cartPageIsLoading = screen.getByText("Loading Cart...");

  expect(cartPage).toBeInTheDocument();
  expect(cartPageIsLoading).toBeInTheDocument();

  const cartItemOne = await screen.findByTestId("cart-item-card-1");
  const cartItemTwo = await screen.findByTestId("cart-item-card-2");
  const cartItemThree = await screen.findByTestId("cart-item-card-3");

  expect(cartItemOne).toBeInTheDocument();
  expect(cartItemTwo).toBeInTheDocument();
  expect(cartItemThree).toBeInTheDocument();
};

describe("Cart", () => {
  it("should update the cart total when changing quantities", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    await initialActions(expect, user);

    const addCartItemOneQuantityButton = screen.getByTestId(
      "cart-item-card-add-quantity-button-1",
    );

    await user.click(addCartItemOneQuantityButton);

    const totalItemsInCartElement = screen.getByTestId("total-items-in-cart-element");

    expect(totalItemsInCartElement).toHaveTextContent("Total (4 items)");
  });

  it("should update the cart when a product is removed/deleted", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    await initialActions(expect, user);

    const deleteCartItemOneButton = screen.getByTestId(
      "cart-item-card-delete-product-button-1",
    );

    await user.click(deleteCartItemOneButton);

    const totalItemsInCartElement = screen.getByTestId(
      "total-items-in-cart-element",
    );

    expect(totalItemsInCartElement).toHaveTextContent("Total (2 items)");
  });
});
