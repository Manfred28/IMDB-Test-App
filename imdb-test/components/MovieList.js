import { useContext } from 'react';
import Movie from './Movie';
import { SearchContext } from '../providers/SearchProvider';

function MovieList() {
  const search = useContext(SearchContext);

  return (
    <div className="mt4">
      {search.results.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
