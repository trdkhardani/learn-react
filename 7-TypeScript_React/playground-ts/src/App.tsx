import { useRef, useState } from "react";
import "./App.css";
import FinalExercise from './FinalExercise';

// type Product = {
//   id: number;
//   title: string;
//   price: number;
//   // category: string;
// };

type User = {
  id: number;
  name: string;
};

type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type ProductState =
  | {
      status: "loading";
    }
  | {
      status: "success";
      products: Product[];
    }
  | {
      status: "error";
      message: string;
    }
  | {
      status: "empty";
    };

// alcringe
type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
};

type ProductUpdate = Partial<Product>;
type ProductUpdatePick = Pick<Product, "id" | "title" | "price">;
type ProductUpdateOmit = Omit<Product, "description">

function getFirst<T>(items: T[]): T {
  return items[0];
}

const products: Product[] = [
  {
    id: 1,
    title: "laptop",
    price: 15000,
  },
  {
    id: 2,
    title: "mouse",
    price: 5000,
  },
  {
    id: 3,
    title: "monitor",
    price: 10000,
  },
]

const users: User[] = [
  {
    id: 1,
    name: "lala",
  },
  {
    id: 2,
    name: "lili",
  },
  {
    id: 3,
    name: "lulu",
  },
]

const getFirstProduct = getFirst(products);
const getFirstUser = getFirst(users);

console.log(getFirstProduct);
console.log(getFirstUser);

function findById<T extends {id: number}>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({items, renderItem}: ListProps<T>) {
  return (
    <ul>
      {
        items.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))
      }
    </ul>
  )
}

function assertNever(value: never): never {
  throw new Error(`Unhandled state: ${value}`)
}

function ProductList() {
  const products: Product[] = [
    {
      id: 1,
      title: "Laptop",
      price: 1500,
    },
    {
      id: 2,
      title: "Mouse",
      price: 25,
    },
  ];

  const [state, setState] = useState<ProductState>({ status: "loading" });

  const hasError = false; // just pretend it is error

  const pretendThisIsUseEffect = () => {
    // pretend this conditional is a reversed try catch
    if (hasError) {
      setState({
        status: "error",
        message: "Failed to fetch products",
      });
    } else {
      setState({
        status: "success",
        products: products,
      });
    }
  };

  /** no exhaustive checking */
  // if (state.status === "loading") return <p>Loading...</p>;

  // if (state.status === "error") return <p>{state.message}</p>;

  // return (
  //   <>
  //     <ul>
  //       {state.products.map((product) => (
  //         <li key={product.id}>{product.title}</li>
  //       ))}
  //     </ul>
  //   </>
  // );

  /** with exhaustive checking */
  switch (state.status) {
    case "loading":
      return <p>Loading...</p>;

    case "error":
      return <p>{state.message}</p>;

    case "empty":
      return <p>No products found</p>;

    case "success":
      return (
        <ul>
          {state.products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      );

    default:
      return assertNever(state)
  }
}

async function fetchProducts(): Promise<ProductResponse> {
  return {
    products: [
      {
        id: 1,
        title: "Laptop",
        price: 1500,
        category: "laptops",
      },
    ],
    total: 194,
    skip: 0,
    limit: 20,
  };
}

function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // ...
  // relatedProducts.map((prod) => prod.id)
  // product?.id
}

function SearchForm() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitted");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("enter");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} onKeyDown={handleKeyDown} />

      <button type="submit">Search</button>
    </form>
  );
}

function App() {
  // const [count, setCount] = useState(0)

  // return <SearchForm />;
  return <FinalExercise />
}

export default App;
