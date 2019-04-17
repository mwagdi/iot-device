import React from 'react';
import Reading from './Reading';

export default ({ readings }) => (
    <div className="readings-container flex-grow">
        {readings.map((reading,i) => <Reading reading={reading} key={i} />)}
    </div>
)