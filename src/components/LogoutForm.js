import React, { useState } from 'react';

const LogoutForm =({ onLogout, errorMessage }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogout();
    }

    return (
        <section>
            <form className="logout-form" onSubmit={handleSubmit}>
                <button type="submit">Logout</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
        </section>
    )
}

export default LogoutForm;

