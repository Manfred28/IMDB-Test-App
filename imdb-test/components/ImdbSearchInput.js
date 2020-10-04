import TextField from '@material-ui/core/TextField';
import { IMDB_API_KEY } from '../constants/imdb';
import debounce from 'lodash/debounce';

function ImdbSearchInput() {
  const onChange = React.useCallback(
    debounce((text) => {
      if (!text) return;

      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${IMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${text}`
      )
        .then((response) => response.json())
        .then((data) => console.log(data));
    }, 500),
    []
  );

  return (
    <TextField
      variant="outlined"
      className="w-100"
      placeholder="Enter a movie title"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default ImdbSearchInput;
