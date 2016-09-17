const UI = {
    MONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    encodeHTMLentities: function(text) {
        return [
            [/&/g, '&amp;'],
            [/</g, '&lt;'],
            [/>/g, '&gt;'],
            [/"/g, '&quot;'],
            [/'/g, '&#039;'],
        ].reduce((s, [r, e]) => s.replace(r, e), text);
    },

    formatDate: function(date, format = '%Y-%m-%d %H:%M')
    {
        const MONTHS = []

        return [
            ['%G', UI.MONTHS[date.getMonth()]],
            ['%Y', date.getFullYear()],
            ['%m', date.getMonth() + 1],
            ['%d', date.getDate()],
            ['%H', date.getHours()],
            ['%M', date.getMinutes()],
            ['%S', date.getSeconds()],
        ].reduce((text, [p, v]) => text.replace(p, v), format);
    },

    parent: function matches(element, selector) {
        return new Promise(resolve => {
            do {
                if (element.matches && element.matches(selector)) {
                    resolve(element);
                    return;
                }
            } while ((element = element.parentNode));
        });
    },

    Content: class {
        constructor()
        {
            window.addEventListener('load', () => {
                this.element = document.getElementById('content');
            });
        }
        clear()
        {
            this.element.innerHTML = '';
        }
        add(element)
        {
            this.element.appendChild(element.element);
        }
        set(...elements)
        {
            this.clear();
            elements.forEach(element => this.add(element));
        }
    },
    Player: class {
        constructor(videoObject)
        {
            const template = document.querySelector('template.player');
            this.element = document.importNode(template.content, true);

            this.element.querySelector('.title')
                .innerText = videoObject.snippet.title;

            this.element.querySelector('.video-window')
                .innerHTML = videoObject.player.embedHtml;

            this.element.querySelector('.date')
                .innerText = UI.formatDate(
                    new Date(videoObject.snippet.publishedAt),
                    'Published on %d %G %Y');

            const desc = UI.encodeHTMLentities(videoObject.snippet.description + ' & <script>');
            this.element.querySelector('.description')
                .innerHTML = desc.replace(/\n/g, '<br>');
        }
    },
    Video: class {
        constructor(videoObject)
        {
            const template = document.querySelector('template.video');
            this.element = document.importNode(template.content, true);

            this.element.querySelector('.video')
                .dataset.videoId = videoObject.id.videoId;

            this.element.querySelector('.image img')
                .src = videoObject.snippet.thumbnails.medium.url;

            this.element.querySelector('.title')
                .innerText = videoObject.snippet.title;

            this.element.querySelector('.channel')
                .innerText = videoObject.snippet.channelTitle;

            this.element.querySelector('.date')
                .innerText = videoObject.snippet.publishedAt;
        }
    },
    VideoGroup: class {
        constructor(title)
        {
            const template = document.querySelector('template.video-group');
            this.element = document.importNode(template.content, true);

            this.element.querySelector('.title').innerText = title;
        }
        addVideo(video)
        {
            this.element.querySelector('.video-list')
                .appendChild(video.element);
        }
    }
}
