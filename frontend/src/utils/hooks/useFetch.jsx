
import { useState, useEffect } from 'react';

function useFetch(categoryName = '') {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const url = categoryName
      ? `https://fakestoreapi.com/products/category/${categoryName}?limit=5`
      : `https://fakestoreapi.com/products`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
        console.log(data)
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, [categoryName]);

  return { products, isLoading, error };
}

export default useFetch;