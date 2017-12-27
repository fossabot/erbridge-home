const webContext = require.context('./', true, /\.md$/);
const webPosts = webContext.keys().map(webContext);

export default webPosts;
