import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get("/api/products");
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }, []);
  if (error) {
    return <h4>Something went wrong</h4>;
  }
  // if (loading) {
  //   return <h4>Loading...</h4>;
  // }
  return (
    <>
      <h1>Axios api</h1>
      <h2>Number of products are: {products.length} </h2>
    </>
  );
}

export default App;
