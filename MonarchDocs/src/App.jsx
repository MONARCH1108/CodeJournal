import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Render from "./Render/Render";

function App() {
    const [content, setContent] = useState("");
    return (
        <div style={{ display: "flex" }}>
            <Sidebar
                onSelect={setContent}
            />
            <Render
                content={content}
            />
        </div>
    );
}
export default App;