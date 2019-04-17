import React from 'react';

export default ({ status,close }) => (
    <div className="status flex-container justify-center align-center">
        <div className={`status__wrap ${status === "Error" ? "error" : ""}`}>
            {status === "Error" &&
            <button
            onClick={() => close()}
            className="status__close">&times;</button>}
            <p className="status__text">
                {status === "Error" ? "Error, Please try again" : status}
            </p>
        </div>
    </div>
)