import React from 'react';
import { Consumer } from '../AppContext';

export default ({ reading }) => (
    <Consumer>
        {({ toggleActive,readingsByName }) => (
            <div className={`reading ${readingsByName[reading].active ? "reading--active" : ""}`}>
                <h2 className="reading__name">{readingsByName[reading].name}</h2>
                <ul className="reading__details">
                    <li className="reading__details_item">
                        Unit: {readingsByName[reading].unit}
                    </li>
                    <li className="reading__details_item">
                        Value: {readingsByName[reading].value}
                    </li>
                    <li className="reading__details_item">
                        Timestamp: {readingsByName[reading].timestamp}
                    </li>
                    <li className="reading__details_item">
                        <span className="is-active">
                            {readingsByName[reading].active ? "Active" : "Inactive"}
                        </span>
                        <button
                        onClick={() => toggleActive(readingsByName[reading].name,!readingsByName[reading].active)}
                        className="btn">{readingsByName[reading].active ? "Deactivate" : "Activate"}</button>
                    </li>
                </ul>
            </div>
        )}
    </Consumer>
)