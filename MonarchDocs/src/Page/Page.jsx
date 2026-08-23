import { useLocation } from "react-router-dom";
import Render from "../Render/Render";

function Page() {

    const location = useLocation();

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

        const fileName = file
            .split("/")
            .pop()
            .replace(".md", "");

        if (fileName === pageName) {
            content = fileContent;
        }

    });

    return (
        <Render content={content} />
    );
}

export default Page;