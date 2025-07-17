import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
    title = "Title",
    description = "Description",
    className = "",
    children
}) => {
    return (
        <>
            <Menu />
            <header className="jumbotron text-center bg-light py-4 mb-4">
                <h2 className="display-5">{title}</h2>
                <p className="lead">{description}</p>
            </header>
            <main className={`container-fluid ${className}`}>
                {children}
            </main>
        </>
    );
};

export default Layout;
