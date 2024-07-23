import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// API Key for OMDB API
const API_URL = 'http://www.omdbapi.com?apiKey=928ef867';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to fetch movies based on the search title
  const searchMovies = async (title) => {
    // Check if the title is not just whitespace
    if (title.trim()) {
      setLoading(true); // Show loading status
      try {
        // Fetch data from the API
        const response = await fetch(`${API_URL}&s=${title}`);
        // Convert the response to JSON
        const data = await response.json();
        // Update the movies state with the fetched data
        setMovies(data.Search || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]); // Set movies to empty array on error
      } finally {
        setLoading(false); // Hide loading status
      }
    } else {
      // If the title is empty or whitespace, clear the movies list
      setMovies([]);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };

  // Trigger search when user presses Enter or clicks the search button
  const handleSearch = () => {
    searchMovies(searchItem);
  };

  useEffect(() => {
    // Initial search or placeholder
    searchMovies('Disney');
  }, []);

  return (
    <div className="app">
      <h1>MovieWorld</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchItem}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={handleSearch}
        />
      </div>
      {loading ? (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      ) : movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
