const gamesContext = require.context('./', true, /\.md$/);
const gamesPosts = gamesContext.keys().map(gamesContext);

export default gamesPosts;
