import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import parseImages from "../Parser/ImageParser";

import "./Render.css";

function Render({ content }) {

    const parsedContent = parseImages(content);

    return (
        <main className="render">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {parsedContent}
            </ReactMarkdown>
        </main>
    );
}

export default Render;