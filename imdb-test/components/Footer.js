import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
  root: {
    borderColor: theme.palette.primary.main,
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer
      className={classnames('w-100 pl2 fixed bottom-0 bt h2 flex items-center', classes.root)}
    >
      Created by István Kozma
    </footer>
  );
}

export default Footer;
