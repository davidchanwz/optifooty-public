import React, { useState } from 'react';
import './SearchBar.css'; // Ensure the CSS is imported

interface SearchBarProps {
    setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
        setSearchQuery(value);
    };

    const clearSearch = () => {
        setQuery('');
        setSearchQuery('');
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-bar"
                placeholder="Search players..."
                value={query}
                onChange={handleChange}
            />
            {query && (
                <button className="clear-button" onClick={clearSearch}>
                    &times;
                </button>
            )}
        </div>
    );
};

export default SearchBar;