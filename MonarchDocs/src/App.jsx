import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Home from "./Home/Home";
import Page from "./Page/Page";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <div style={{ display: "flex" }}>
                <Sidebar />
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="*"
                        element={<Page />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;