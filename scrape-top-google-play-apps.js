const osmosis = require('osmosis');

function topFreeApps() {
    return new Promise((resolve, reject) => {
        let list = [];

        osmosis
            // Scrape top free apps
            .get('https://play.google.com/store/apps/collection/topselling_free')
            // All apps exist inside of a div with class card-content
            .find('.card-content')
            // Create an object of data
            .set({
                link: '.card-click-target@href', // Link to the app
                title: 'a.title', // Title
                img: '.cover-image@src' // App image
            })
            .data(data => {
                // Each iteration, push the data into our array
                list.push(data);
            })
            .error(err => reject(err))
            .done(() => resolve(list));
    });
}

topFreeApps().then(list => {
    console.log(list);
});