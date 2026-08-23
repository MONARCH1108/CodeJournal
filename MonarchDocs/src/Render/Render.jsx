import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./Render.css";

function Render({ content }) {
    return (
        <main className="render">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </main>
    );
}

export default Render;