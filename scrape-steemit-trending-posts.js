const osmosis = require('osmosis');

function getHomePageTrending() {
    return new Promise((resolve, reject) => {
        let response = [];

        osmosis
            // Load steemit.com
            .get('https://steemit.com')
            // Find all posts in postslist__summaries list
            .find('.PostsList__summaries > li')
            // Create an object with title and summary
            .set({
                title: 'h2',
                summary: '.PostSummary__body'
            })
            // Push post into an array
            .data(res => response.push(res))
            .error(err => reject(err))
            .done(() => resolve(response));
    });
}

getHomePageTrending().then(res => {
    console.log(res);
});