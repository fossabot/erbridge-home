const toolsContext = require.context('./', true, /\.md$/);
const toolsPosts = toolsContext.keys().map(toolsContext);

export default toolsPosts;
