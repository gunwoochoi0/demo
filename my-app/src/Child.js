// Child.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Child = ({ filter }) => {
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        console.log('Child rendered with filter:', filter);

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.example.com/items?filter=${filter}`);
                setFilteredItems(response.data);
            } catch (error) {
                console.error('Error fetching filtered items:', error);
            }
        };

        fetchData();
    }, [filter]);

    return (
        <div>
            <h3>Filtered Items</h3>
            <ul>
                {filteredItems.map(item => <li key={item}>{item}</li>)}
            </ul>
        </div>
    );
};

export default Child;