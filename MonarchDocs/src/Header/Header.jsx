import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="header-logo">
                MONARCHDOCS
            </div>
            <div className="header-actions">
                <div className="header-search">
                    Search
                </div>
                <div className="header-github">
                    GitHub
                </div>
                <div className="header-menu">
                    ☰
                </div>
            </div>
        </header>
    );
}

export default Header;