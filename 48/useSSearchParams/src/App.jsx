import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import { useParams, useSearchParams } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/products" element={<h1>Products</h1>} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

function Product() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  setSearchParams({
    sid: "1234567",
    s2id: "7654321",
  });

  return (
    <div>
      <h1>Product</h1>
      <p>Product ID: {id}</p>
      {searchParams.get("sid") && (
        <>
          <p>Search ID: {searchParams.get("sid")}</p>
          <p>Search2 ID : {searchParams.get("s2id")}</p>
        </>
      )}
    </div>
  );
}
