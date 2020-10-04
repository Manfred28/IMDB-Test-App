import Container from '@material-ui/core/Container';
import ImdbSearchInput from '../components/ImdbSearchInput';
import MovieList from '../components/MovieList';

export default function Home() {
  return (
    <Container maxWidth="sm" className="pt2">
      <ImdbSearchInput />
      <MovieList />
    </Container>
  );
}
