import { useState, useContext } from 'react';
import { IMDB_API_KEY } from '../constants/imdb';
import { Markup } from 'interweave';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SearchContext } from '../providers/SearchProvider';

function MovieActionButtons({ wikiEntry, detailedMovie, depth }) {
  const [isLoading, setIsLoading] = useState(false);
  const search = useContext(SearchContext);

  const loadSimilarMovies = () => {
    if (search.relatedMovies[detailedMovie.id]) return;

    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${detailedMovie.id}/similar?api_key=${IMDB_API_KEY}&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) =>
        search.setRelatedMovies(
          Object.assign({}, search.relatedMovies, { [detailedMovie.id]: data.results })
        )
      )
      .then(() => setIsLoading(false));
  };

  return (
    <div className="mt2">
      <Markup content={wikiEntry.snippet} containerTagName="span" />
      <span>...</span>
      <div className="mt2">
        <div className="dib mr2">
          <Button color="primary" variant="outlined">
            <Link
              href={`http://en.wikipedia.org/?curid=${wikiEntry.pageid}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wiki
            </Link>
          </Button>
        </div>
        <div className="dib mr2">
          <Button color="primary" variant="outlined">
            <Link
              href={`https://imdb.com/title/${detailedMovie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              IMDB
            </Link>
          </Button>
        </div>
        {depth < 2 && (
          <Button color="primary" variant="outlined" onClick={loadSimilarMovies}>
            Show Similar Movies
          </Button>
        )}
      </div>
      {isLoading && <CircularProgress />}
    </div>
  );
}

export default MovieActionButtons;
