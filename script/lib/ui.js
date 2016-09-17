const UI = {
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
