const osmosis = require('osmosis');

function getUpcomingMusicReleases() {
    return new Promise((resolve, reject) => {
        let currentDate = null;
        let releasesMap = {};

        osmosis
            // Load upcoming music page
            .get('http://www.metacritic.com/browse/albums/release-date/coming-soon/date')
            // Find the first music table and all of its tr elements
            .find('.releaseCalendar .musicTable:first tr')
            // Construct an object containing release date and its relevant releases
            .set({
                // Get the release date (if relevant)
                releaseDate: 'th',
                // For every release on this date create an array
                artist: '.artistName', 
                album: '.albumTitle'
            })
            // Transform our flat data into a tree like structure by creating a nested object
            .then(async (context, data) => {
                // Is the current object a release date?
                if (typeof data.releaseDate !== 'undefined') {
                    // Store the current date
                    currentDate = data.releaseDate;

                    // Create an empty array where we can push releases into
                    releasesMap[currentDate] = [];
                } else {
                    // This is a release, not a date, push the object with artist and album name
                    const artwork = await getArtwork(data.artist, data.album);
                    releasesMap[currentDate].push(data);
                }
            })
            .error(err => reject(err))
            .done(() => resolve(releasesMap));
    });
}

getUpcomingMusicReleases().then(res => {
    console.log(res);
});