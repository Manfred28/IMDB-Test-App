import { createContext, useState } from 'react';

export const SearchContext = createContext({
  results: [],
  setResults: () => {},
  relatedMovies: {},
  setRelatedMovies: () => {},
});

function SearchProvider({ children }) {
  const [results, setResults] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState({});

  return (
    <SearchContext.Provider
      value={{
        results,
        setResults,
        relatedMovies,
        setRelatedMovies,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
