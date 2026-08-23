import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
    FiFolder,
    FiFileText,
    FiUser,
    FiGithub,
    FiLinkedin,
    FiGlobe,
} from "react-icons/fi";
import "./Sidebar.css";
function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();
    const files = import.meta.glob(
        "../assets/Content/**/*.md",
        {
            query: "?raw",
            import: "default",
            eager: true,
        }
    );
    const items = [];
    Object.entries(files).forEach(([file, content]) => {
        const parts = file.split("/");
        const contentIndex = parts.indexOf("Content");
        const pathParts = parts.slice(
            contentIndex + 1
        );
        let currentItems = items;
        pathParts.forEach((part, index) => {
            const isFile =
                index === pathParts.length - 1;
            let item = currentItems.find(
                (item) => item.label === part
            );
            if (!item) {
                item = {
                    key: pathParts
                        .slice(0, index + 1)
                        .join("/"),
                    label: isFile
                        ? part.replace(".md", "")
                        : part,
                    icon: isFile
                        ? <FiFileText />
                        : <FiFolder />,
                };
                if (!isFile) {
                    item.children = [];
                }
                currentItems.push(item);
            }
            if (isFile) {
                item.onClick = () => {
                    const pagePath = pathParts
                        .map((part) =>
                            part.replace(".md", "")
                        )
                        .join("/");
                    navigate(`/${pagePath}`);
                    if (onClose) {
                        onClose();
                    }
                };
            }
            if (!isFile) {
                currentItems = item.children;
            }
        });
    });
    return (
        <>
            {/* =========================
                MOBILE OVERLAY
               ========================= */}

            <div
                className={`sidebar-overlay ${
                    isOpen
                        ? "sidebar-overlay-open"
                        : ""
                }`}
                onClick={onClose}
            />

            {/* =========================
                SIDEBAR
               ========================= */}

            <div
                className={`sidebar ${
                    isOpen
                        ? "sidebar-open"
                        : ""
                }`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >

                {/* =========================
                    DOCUMENTATION
                   ========================= */}

                <div className="sidebar-title">
                    DOCUMENTATION
                </div>

                <Menu
                    mode="inline"
                    items={items}
                />

                {/* =========================
                    DEVELOPER LINKS
                   ========================= */}

                <div
                    className="sidebar-developer"
                    style={{
                        marginTop: "auto",
                        padding: "20px 10px 10px",
                    }}
                >

                    <div
                        className="sidebar-developer-title"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "12px",
                            fontSize: "11px",
                            letterSpacing: "0.08em",
                        }}
                    >

                        <FiUser />

                        ABOUT THE DEVELOPER

                    </div>

                    <div
                        className="sidebar-social-links"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >

                        {/* GitHub */}

                        <a
                            href="https://github.com/MONARCH1108"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            title="GitHub"
                        >
                            <FiGithub />
                        </a>

                        {/* LinkedIn */}

                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            title="LinkedIn"
                        >
                            <FiLinkedin />
                        </a>

                        {/* Portfolio */}

                        <a
                            href="https://abhayemani.netlify.app/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Portfolio"
                            title="Portfolio"
                        >
                            <FiGlobe />
                        </a>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Sidebar;