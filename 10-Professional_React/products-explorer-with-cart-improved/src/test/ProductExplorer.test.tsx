import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductExplorer from "../pages/ProductExplorer";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "../AppRoutes";

describe("ProductExplorer", () => {
  it("should show search label and input", () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <ProductExplorer />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("should show products", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <ProductExplorer />
      </MemoryRouter>,
    );

    expect(screen.getByText("Searching Products...")).toBeInTheDocument();

    expect(
      await screen.findByTestId("products-container-element"),
    ).toBeInTheDocument();
  });

  it("should search correctly", async () => {
    const user = userEvent.setup();
    // const handleFilter = vi.fn();

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <ProductExplorer />
      </MemoryRouter>,
    );

    const inputSearchElement = screen.getByLabelText("Search");

    await user.type(inputSearchElement, "powder");

    // expect(
    //   await screen.findByText("Fragrances")
    // ).toBeInTheDocument();

    expect(screen.getByText("Searching Products...")).toBeInTheDocument();

    expect(await screen.findByText("Powder Canister")).toBeInTheDocument();
  });
  it("should show products", async () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <ProductExplorer />
      </MemoryRouter>,
    );

    expect(screen.getByText("Searching Products...")).toBeInTheDocument();

    expect(
      await screen.findByTestId("products-container-element"),
    ).toBeInTheDocument();
  });

  it("should add product to cart", async () => {
    const user = userEvent.setup();
    // const handleFilter = vi.fn();

    render(
      <MemoryRouter initialEntries={["/products"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByText("Searching Products...")).toBeInTheDocument();

    expect(
      await screen.findByTestId("products-container-element"),
    ).toBeInTheDocument();

    // const addToCartButton = await screen.findByRole("button", {
    //   name: "Add To Cart",
    // });
    // const addToCartButton = await screen.findByRole("heading", {
    //   name: "Essence Mascara Lash Princess",
    // });
    const addToCartButton = await screen.findByTestId("add-to-cart-button-1");

    expect(addToCartButton).toBeInTheDocument();

    await user.click(addToCartButton);

    const cartNavLink = screen.getByTestId("cart-nav-link");

    expect(cartNavLink).toHaveTextContent("Cart (1)");

    await user.click(cartNavLink);

    const cartPage = screen.getByRole("heading", {
      name: "Cart",
    });

    const cartPageIsLoading = screen.getByText("Loading Cart...");

    expect(cartPage).toBeInTheDocument();
    expect(cartPageIsLoading).toBeInTheDocument();

    const cartItem = await screen.findByTestId("cart-item-card-1");

    expect(cartItem).toBeInTheDocument();
  });
});
