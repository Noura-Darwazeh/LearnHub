import React from 'react';
import {
    TextField,
    IconButton,
    InputAdornment,
  } from '@mui/material';
  import { Search, FilterList } from '@mui/icons-material';
  
  /* This is a search component for the courses search and filter built  to used for courses search */

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
        value={searchTerm} 
        onChange={(event) => setSearchTerm(event.target.value)} 
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

export default SearchComponent; 
