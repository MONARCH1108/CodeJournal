import {
    FiGithub,
    FiLinkedin,
    FiGlobe,
} from "react-icons/fi";

import "./Home.css";

function Home() {
    return (
        <main className="home">

            <section className="home-intro">

                <p className="home-label">
                    MONARCH CODEJOURNAL
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
                        href="https://www.linkedin.com/"
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

        </main>
    );
}

export default Home;