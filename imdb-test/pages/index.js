import Container from '@material-ui/core/Container';
import ImdbSearchInput from '../components/ImdbSearchInput';

export default function Home() {
  return (
    <Container maxWidth="sm" className="pt2">
      <ImdbSearchInput />
    </Container>
  );
}
