import React from "react";

export default function Nav({ register, login, logout, loading, user }) {
  return (
    <nav>
      <div className="website-name">
        <h1>Fountend Simplified</h1>
      </div>
      <div className="sign-in">
        <button onClick={register} className="btn sign-in--btn">
          Register
        </button>
        <button onClick={login} className="btn sign-in--btn">
          Login
        </button>
        <div className="display-user hide">
          <button onClick={logout} className="btn logout-btn">
            {user && user.email
              ? loading
                ? "Loading..."
                : user.email[0].toUpperCase()
              : null}
          </button>
        </div>
      </div>
    </nav>
  );
}
