import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

export const Search = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, []);
  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <h1>Search page</h1>
    </div>
  );
};
