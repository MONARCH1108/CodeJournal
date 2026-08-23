import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const files = import.meta.glob(
        "../assets/Content/**/*.md",
        {
            query: "?raw",
            import: "default",
            eager: true,
        }
    );
    const items = [];
    Object.entries(files).forEach(([file, content]) => {
        const parts = file.split("/");
        const contentIndex = parts.indexOf("Content");
        const pathParts = parts.slice(contentIndex + 1);
        let currentItems = items;
        pathParts.forEach((part, index) => {
            const isFile = index === pathParts.length - 1;
            let item = currentItems.find(
                (item) => item.label === part
            );
            if (!item) {
                item = {
                    key: pathParts
                        .slice(0, index + 1)
                        .join("/"),

                    label: part,
                };
                if (!isFile) {
                    item.children = [];
                }
                currentItems.push(item);
            }
            if (isFile) {
                item.onClick = () => {
                    const pageName = part.replace(".md", "");
                    navigate(`/${pageName}`);
                };
            }
            if (!isFile) {
                currentItems = item.children;
            }
        });
    });

    return (
        <div className="sidebar">
            <Menu
                mode="inline"
                items={items}
            />
        </div>
    );
}
export default Sidebar;