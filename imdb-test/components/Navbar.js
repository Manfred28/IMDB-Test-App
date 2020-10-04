import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classnames('w-100 h3 flex justify-center items-center', classes.root)}>
      <Link href="/" onClick={(event) => event.preventDefault()}>
        <h1 className="ma0 white">IMDB Test App</h1>
      </Link>
    </div>
  );
}

export default Navbar;
