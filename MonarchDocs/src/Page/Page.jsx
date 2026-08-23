import { useLocation } from "react-router-dom";
import Render from "../Render/Render";
import Home from "../Home/Home";

function Page() {

    const location = useLocation();

        // Homepage
    if (location.pathname === "/") {
        return <Home />;
    }

    const files = import.meta.glob(
        "../assets/Content/**/*.md",
        {
            query: "?raw",
            import: "default",
            eager: true,
        }
    );

    const pageName = decodeURIComponent(
        location.pathname.substring(1)
    );

    let content = "";

    Object.entries(files).forEach(([file, fileContent]) => {

        const parts = file.split("/");

        const contentIndex = parts.indexOf("Content");

        const pathParts = parts.slice(
            contentIndex + 1
        );

        const filePath = pathParts
            .map((part) =>
                part.replace(".md", "")
            )
            .join("/");

        if (filePath === pageName) {
            content = fileContent;
        }

    });

    return (
        <Render content={content} />
    );
}

export default Page;