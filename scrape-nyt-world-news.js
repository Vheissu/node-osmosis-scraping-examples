const osmosis = require('osmosis');

// Make the user agent that of a browser (Google Chrome on Windows)
osmosis.config('user_agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36');
// If a request fails don't keep retrying (by default this is 3)
osmosis.config('tries', 1)
// Concurrent requests (by default this is 5) make this 2 so we don't hammer the site
osmosis.config('concurrency', 2);

function getNewsTitles() {
    return new Promise((resolve, reject) => {
        let stories = [];

        osmosis
            // The URL we are scraping
            .get('https://www.nytimes.com/section/world')
            // Find all news stories with the class story-body
            .find('.story-body')
            .set({
                // Get the first link href value inside of each story body
                link: 'a:first@href',
                // Get the news story title
                title: '.headline',
                // Get the news story summary
                summary: '.summary',
                // Get the image source for the story
                img: 'img@src'
            })
            .data(data => {
                // Push each news story found into an array we'll send back when we are done
                stories.push(data);
            })
            .error(err => reject(err))
            .done(() => resolve(stories));
    });
}

getNewsTitles().then(stories => {
    // Should contain all news stories found
    console.log(stories);
});