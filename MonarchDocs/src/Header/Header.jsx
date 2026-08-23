import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiGithub, FiMenu, FiX } from "react-icons/fi";

import "./Header.css";

function Header() {
    const navigate = useNavigate();

    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState("");

    const files = import.meta.glob(
        "../assets/Content/**/*.md",
        {
            query: "?raw",
            import: "default",
            eager: true,
        }
    );

    const results = Object.entries(files).filter(
        ([file, content]) => {
            const fileName = file.split("/").pop();

            return (
                fileName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                content
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }
    );

    function handleSearchClick(file) {
        const parts = file.split("/");
        const fileName = parts[parts.length - 1];
        const pageName = fileName.replace(".md", "");

        navigate(`/${pageName}`);

        setSearch("");
        setSearchOpen(false);
    }

    function handleGithubClick() {
        window.open(
            "https://github.com/MONARCH1108",
            "_blank"
        );
    }

    return (
        <header className="header">

            <div className="header-logo">
                MONARCHDOCS
            </div>

            <div className="header-actions">

                <button
                    className="header-icon"
                    onClick={() =>
                        setSearchOpen(!searchOpen)
                    }
                >
                    {searchOpen ? <FiX /> : <FiSearch />}
                </button>

                <button
                    className="header-icon"
                    onClick={handleGithubClick}
                >
                    <FiGithub />
                </button>

                <button className="header-icon">
                    <FiMenu />
                </button>

            </div>

            {searchOpen && (
                <div className="search-container">

                    <input
                        type="text"
                        placeholder="Search documentation..."
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        autoFocus
                    />

                    {search && (
                        <div className="search-results">

                            {results.length === 0 ? (
                                <div className="search-empty">
                                    No results found
                                </div>
                            ) : (
                                results.map(([file]) => {

                                    const fileName =
                                        file
                                            .split("/")
                                            .pop()
                                            .replace(".md", "");

                                    return (
                                        <button
                                            key={file}
                                            onClick={() =>
                                                handleSearchClick(file)
                                            }
                                        >
                                            {fileName}
                                        </button>
                                    );
                                })
                            )}

                        </div>
                    )}

                </div>
            )}

        </header>
    );
}

export default Header;