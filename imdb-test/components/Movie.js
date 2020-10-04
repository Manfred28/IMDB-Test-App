import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: theme.palette.primary.main,
  },
}));
function Movie({ movie }) {
  const classes = useStyles();

  return (
    <div className={classnames('ba pa2 mb2 br2', classes.root)}>
      <span className="mr1 b">Title:</span>
      <span className="mr2">{movie.title}</span>
      <span className="mr1 b">Popularity:</span>
      <span className="mr2">{movie.popularity}</span>
      <span className="mr1 b">Original Language:</span>
      <span>{movie.original_language}</span>
    </div>
  );
}

export default Movie;
