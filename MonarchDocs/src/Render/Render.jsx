import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import parseImages from "../Parser/ImageParser";
import Mermaid from "./Mermaid";
import "./Render.css";

function Render({ content }) {
    const parsedContent = parseImages(content);

    const components = {
        pre(props) {
            const { children, ...rest } = props;
            delete rest.node;
            const childArray = Array.isArray(children) ? children : [children];
            const isMermaid = childArray.some(
                (child) =>
                    child?.props?.className &&
                    /language-mermaid\b/.test(child.props.className)
            );
            if (isMermaid) {
                return children;
            }
            return <pre {...rest}>{children}</pre>;
        },
        code(props) {
            const { children, className, ...rest } = props;
            delete rest.node;
            const match = /language-mermaid\b/.exec(className || "");
            if (match) {
                return <Mermaid code={String(children).replace(/\n$/, "")} />;
            }
            return (
                <code className={className} {...rest}>
                    {children}
                </code>
            );
        },
    };

    return (
        <main className="render">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={components}
            >
                {parsedContent}
            </ReactMarkdown>
        </main>
    );
}

export default Render;