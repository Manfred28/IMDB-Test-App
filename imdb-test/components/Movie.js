import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import classnames from 'classnames';
import { IMDB_API_KEY } from '../constants/imdb';
import MovieActionButtons from './MovieActionButtons';
import { SearchContext } from '../providers/SearchProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: theme.palette.primary.main,
  },
}));

function Movie({ movie, depth = 0 }) {
  const classes = useStyles();
  const [wikiEntry, setWikiEntry] = useState(null);
  const [detailedMovie, setDetailedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const search = useContext(SearchContext);

  const getDetails = () => {
    if (wikiEntry) return;

    setIsLoading(true);
    Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${IMDB_API_KEY}&language=en-US`
      ),
      fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&prop=info&inprop=url&srsearch=${encodeURIComponent(
          movie.title
        )}`
      ),
    ]).then((results) => {
      results[0].json().then((data) => setDetailedMovie(data));
      results[1].json().then((data) => setWikiEntry(data.query.search[0] || {}));
      setIsLoading(false);
    });
  };

  return (
    <div className={classnames('ba pa2 mt2 br2', classes.root)}>
      <div>
        <span className="mr1 b">Title:</span>
        <span className="mr2 pointer" onClick={getDetails}>
          {movie.title}
        </span>
        <span className="mr1 b">Popularity:</span>
        <span className="mr2">{movie.popularity}</span>
        <span className="mr1 b">Original Language:</span>
        <span>{movie.original_language}</span>
      </div>
      {isLoading && <CircularProgress />}
      {wikiEntry && <MovieActionButtons wikiEntry={wikiEntry} detailedMovie={detailedMovie} depth={depth} />}
      {search.relatedMovies[movie.id] && !search.relatedMovies[movie.id].length && (
        <div className="mt2">There are no related movies</div>
      )}
      {search.relatedMovies[movie.id] && (
        <div className="pl3">
          {search.relatedMovies[movie.id].map((relatedMovie) => (
            <Movie key={relatedMovie.id} movie={relatedMovie} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Movie;
