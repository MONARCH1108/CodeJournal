const images = import.meta.glob(
    "../assets/Content/**/*.{png,jpg,jpeg,gif,svg,webp}",
    {
        eager: true,
        query: "?url",
        import: "default",
    }
);

function parseImages(content) {
    return content.replace(
        /!\[\[(.*?)\]\]/g,
        (_, image) => {
            const imageName = image.trim();

            const imagePath = Object.keys(images).find(
                (path) => path.endsWith(`/${imageName}`)
            );

            if (!imagePath) {
                return `![${imageName}](/images/${encodeURIComponent(imageName)})`;
            }

            return `![${imageName}](${images[imagePath]})`;
        }
    );
}

export default parseImages;