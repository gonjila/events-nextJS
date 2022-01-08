import React from "react";

function PageNotFound() {
    const Styled = {
        color: "red",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div style={Styled}>
            <h1>Page Not Found!</h1>
        </div>
    );
}

export default PageNotFound;
