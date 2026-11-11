import { useEffect, useState, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "loose",
    fontFamily: "var(--font-mono)",
    darkMode: true,
    themeVariables: {
        darkMode: true,
        background: "#161619",
        primaryColor: "#1e1e22",
        primaryTextColor: "#e8e6e3",
        primaryBorderColor: "#c9a96e",
        lineColor: "#c9a96e",
        secondaryColor: "#161619",
        tertiaryColor: "#0e0e10",
        edgeLabelBackground: "#1e1e22",
        textColor: "#e8e6e3",
    },
});

let diagramIdCounter = 0;

function Mermaid({ code }) {
    const [svg, setSvg] = useState("");
    const [error, setError] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        const uniqueId = `mermaid-diagram-${++diagramIdCounter}-${Date.now()}`;

        const renderDiagram = async () => {
            try {
                const trimmedCode = code ? code.trim() : "";
                if (!trimmedCode) {
                    if (isMounted) {
                        setSvg("");
                        setError(null);
                    }
                    return;
                }

                const { svg: renderedSvg, bindFunctions } = await mermaid.render(
                    uniqueId,
                    trimmedCode
                );

                if (isMounted) {
                    setSvg(renderedSvg);
                    setError(null);
                }

                if (bindFunctions && containerRef.current) {
                    bindFunctions(containerRef.current);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err?.message || String(err));
                    setSvg("");
                }
                const leftover =
                    document.getElementById(uniqueId) ||
                    document.getElementById(`d${uniqueId}`);
                if (leftover) {
                    leftover.remove();
                }
            }
        };

        renderDiagram();

        return () => {
            isMounted = false;
            const leftover =
                document.getElementById(uniqueId) ||
                document.getElementById(`d${uniqueId}`);
            if (leftover) {
                leftover.remove();
            }
        };
    }, [code]);

    if (error) {
        return (
            <div className="mermaid-error">
                <div className="mermaid-error-header">
                    Mermaid Rendering Error
                </div>
                <div className="mermaid-error-message">
                    {error}
                </div>
                <pre>
                    <code>{code}</code>
                </pre>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="mermaid-container"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}

export default Mermaid;

