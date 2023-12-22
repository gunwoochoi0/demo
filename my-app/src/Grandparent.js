// Grandparent.jsx
import React, { useState } from 'react';
import Parent from './Parent';

const Grandparent = () => {
    const [filter, setFilter] = useState('');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <h1>Filter Items</h1>
            <input type="text" value={filter} onChange={handleFilterChange} />
            <Parent filter={filter} />
        </div>
    );
};

export default Grandparent;