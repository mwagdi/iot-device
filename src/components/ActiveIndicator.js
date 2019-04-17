import React from 'react';

export default ({ active,total }) => (
    <div className="indicator">
        <div className="indicator__bar">
            <div
            style={{ width: `${(active / total) * 100}%` }}
            className="indicator__bar_active"></div>
        </div>
        <div className="indicator__numbers flex-container justify-space-between">
            <span><b>{active}</b> Active</span>
            <span><b>{total - active}</b> Inactive</span>
        </div>
    </div>
)