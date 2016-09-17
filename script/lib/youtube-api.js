class URL
{
    constructor(url)
    {
        const [endpoint, query] = url.split('?');

        this.endpoint = endpoint;
        this.params = [];

        if (query) {
            const pairs = query.split('&')
                .map(part => {
                    return part.split('=')
                               .map(decodeURIComponent);
                });

            this.params.push(...pairs);
        }
    }

    add(key, value)
    {
        this.params.push([key, value]);
    }

    toString()
    {
        return this.endpoint + '?' +
            this.params.map(pair => {
                return pair.map(encodeURIComponent);
            }).map(([k, v]) => k + '=' + v).join('&');
    }
}

class YouTubeAPI
{
    constructor(key)
    {
        this.key = key;
    }

    fetch(url)
    {
        url.add('key', this.key);
        return fetch(url.toString()).then(response => response.json());
    }

    search(query, limit = 20)
    {
        const url = new URL('https://www.googleapis.com/youtube/v3/search');
        url.add('part', 'snippet');
        url.add('q', query);
        url.add('maxResults', limit);
        return this.fetch(url);
    }

    video(videoId)
    {
        const url = new URL('https://www.googleapis.com/youtube/v3/videos');
        url.add('part', 'contentDetails,player,snippet');
        url.add('id', videoId);
        return this.fetch(url).then(data => {
            console.log(data);
            return data.items[0];
        });
    }
}
