import {
    FiGithub,
    FiLinkedin,
    FiGlobe,
} from "react-icons/fi";
import "./Home.css";

function Home() {
    return (
        <main className="home">

            {/* Grid background */}
            <div className="home-grid-bg" />

            {/* Corner marks */}
            <div className="home-corner home-corner--tl" />
            <div className="home-corner home-corner--tr" />
            <div className="home-corner home-corner--bl" />
            <div className="home-corner home-corner--br" />

            {/* Content */}
            <section className="home-intro">
                <p className="home-label">
                    Monarch CodeJournal
                </p>
                <h1>
                    Building, learning,
                    <br />
                    documenting.
                </h1>
                <p className="home-description">
                    I'm Abhay, a developer interested in
                    software, AI, and building things.
                    This journal is where I document
                    what I learn and create.
                </p>

                <div className="home-separator" />

                <div className="home-links">
                    <a
                        href="https://github.com/MONARCH1108"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FiGithub />
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/e-y-s-v-s-abhay"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FiLinkedin />
                        LinkedIn
                    </a>
                    <a
                        href="https://abhayemani.netlify.app/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FiGlobe />
                        Portfolio
                    </a>
                </div>
            </section>

            {/* Technical metadata annotation */}
            <div className="home-meta">
                v1.0 — 2026
                <br />
                48.8566° N, 2.3522° E
            </div>

        </main>
    );
}
export default Home;