import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import Page from "./Page/Page";
import Header from "./Header/Header";

function App() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <BrowserRouter>

            <Header
                onMenuClick={() =>
                    setSidebarOpen(!sidebarOpen)
                }
            />

            <div className="main-layout">

                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() =>
                        setSidebarOpen(false)
                    }
                />

                <Page />

            </div>

        </BrowserRouter>
    );
}

export default App;