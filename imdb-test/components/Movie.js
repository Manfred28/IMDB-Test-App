import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import { Markup } from 'interweave';

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: theme.palette.primary.main,
  },
}));
function Movie({ movie }) {
  const classes = useStyles();
  const [wikiEntry, setWikiEntry] = useState(null);

  const wikiSearch = () => {
    if (wikiEntry) return;

    fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(
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
        <span className="mr2 pointer" onClick={wikiSearch}>
          {movie.title}
        </span>
        <span className="mr1 b">Popularity:</span>
        <span className="mr2">{movie.popularity}</span>
        <span className="mr1 b">Original Language:</span>
        <span>{movie.original_language}</span>
      </div>
      {wikiEntry && (
        <div className="mt2">
          <Markup content={wikiEntry.snippet} containerTagName="div" />
        </div>
      )}
    </div>
  );
}

export default Movie;
