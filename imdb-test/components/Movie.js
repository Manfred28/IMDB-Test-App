import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import classnames from 'classnames';
import { Markup } from 'interweave';
import { IMDB_API_KEY } from '../constants/imdb';

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: theme.palette.primary.main,
  },
}));
function Movie({ movie }) {
  const classes = useStyles();
  const [wikiEntry, setWikiEntry] = useState(null);
  const [detailedMovie, setDetailedMovie] = useState(null);
  const getDetails = () => {
    if (wikiEntry) return;

    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${IMDB_API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((data) => setDetailedMovie(data));

    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&prop=info&inprop=url&srsearch=${encodeURIComponent(
        movie.title
      )}`
    )
      .then((response) => response.json())
      .then((data) => setWikiEntry(data.query.search[0]));
  };

  return (
    <div className={classnames('ba pa2 mb2 br2', classes.root)}>
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
      {wikiEntry && (
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
        </div>
      )}
    </div>
  );
}

export default Movie;
