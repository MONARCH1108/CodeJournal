import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Page from "./Page/Page";

function App() {
    return (
        <BrowserRouter>
            <div style={{ display: "flex" }}>
                <Sidebar />
                <Page />
            </div>
        </BrowserRouter>
    );
}
export default App;