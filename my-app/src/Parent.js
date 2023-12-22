// Parent.jsx
import React from 'react';
import Child from './Child';

const Parent = ({ filter }) => {
    return (
        <div>
            <h2>Parent</h2>
            <Child filter={filter} />
        </div>
    );
};

export default Parent;