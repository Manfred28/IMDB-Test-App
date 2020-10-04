import { useCallback, useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IMDB_API_KEY } from '../constants/imdb';
import debounce from 'lodash/debounce';
import { SearchContext } from '../providers/SearchProvider';

function ImdbSearchInput() {
  const [isLoading, setIsLoading] = useState(false);
  const search = useContext(SearchContext);

  const onChange = useCallback(
    debounce((text) => {
      if (!text) return;

      setIsLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${IMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${text}`
      )
        .then((response) => response.json())
        .then((data) => search.setResults(data.results))
        .then(() => setIsLoading(false));
    }, 500),
    []
  );

  return (
    <div>
      <TextField
        variant="outlined"
        className="w-100"
        placeholder="Enter a movie title"
        onChange={(e) => onChange(e.target.value)}
      />
      {isLoading && <CircularProgress />}
    </div>
  );
}

export default ImdbSearchInput;
