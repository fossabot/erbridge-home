const blogContext = require.context('./', true, /\.md$/);
const blogPosts = blogContext.keys().map(blogContext);

export default blogPosts;
