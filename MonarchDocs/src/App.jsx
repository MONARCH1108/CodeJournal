import { BrowserRouter } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Page from "./Page/Page";
import Header from "./Header/Header";

function App() {
    return (
        <BrowserRouter>
        <Header />
            <div style={{ display: "flex" }}>
                
                <Sidebar />
                <Page />
            </div>
        </BrowserRouter>
    );
}
export default App;