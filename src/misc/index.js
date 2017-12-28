const miscContext = require.context('./', true, /\.md$/);
const miscPosts = miscContext.keys().map(miscContext);

export default miscPosts;
