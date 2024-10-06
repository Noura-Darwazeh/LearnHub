// src/components/Search/SearchComponent.jsx
import React from 'react';
import {
    TextField,
    IconButton,
    InputAdornment,
  } from '@mui/material';
  import { Search, FilterList } from '@mui/icons-material';
  

  const SearchComponent = ({ handleSearch, searchType, setSearchType, handleKeyDown, searchTerm, setSearchTerm }) => {
    const toggleSearchType = () => {
      const nextType = searchType === 'title' ? 'subject'
        : searchType === 'subject' ? 'instructor'
          : searchType === 'instructor' ? 'startdate'
            : 'title';
      
      setSearchType(nextType);
    };
  
    return (
      <TextField
        label={`Search by ${searchType}`}
        variant="outlined"
        value={searchTerm} // Use searchTerm value from parent
        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm using setSearchTerm
        onKeyDown={handleKeyDown} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleSearchType}>
                <FilterList />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  };

export default SearchComponent; // Ensure default export is present
