const fictionContext = require.context('./', true, /\.md$/);
const fictionPosts = fictionContext.keys().map(fictionContext);

export default fictionPosts;
