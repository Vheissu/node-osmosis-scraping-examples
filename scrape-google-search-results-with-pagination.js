const osmosis = require('osmosis');

osmosis.config('user_agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36');
osmosis.config('tries', 1)
osmosis.config('concurrency', 2);

function scrapeGoogle() {
    return new Promise((resolve, reject) => {
        let list = [];

        osmosis
            // Do Google search
            .get('https://www.google.co.in/search?q=cats')
            .paginate('#navcnt table tr > td a[href]', 3)
            .delay(2000) // delay 2 seconds between pagination calls
            // All apps exist inside of a div with class card-content
            .find('.g')
            // Create an object of data
            .set({
                link: 'h3 a@href', // Search result link
                title: 'h3', // Title
            })
            .data(data => {
                // Each iteration, push the data into our array
                list.push(data);
            })
            .error(err => reject(err))
            .done(() => resolve(list));
    });
}

scrapeGoogle().then(list => {
    console.log(list);
});