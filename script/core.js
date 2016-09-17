const API_KEY = 'AIzaSyDrRbZDOwixw1n_t1mQjxd-IGuNl_yoVIM';

const api = new YouTubeAPI(API_KEY);
const content = new UI.Content();
const actions = new Actions({content}, api);

document.addEventListener('submit', event => {
    const element = event.target;
    event.preventDefault();

    if (event.target.matches('#search-bar')) {
        const query = element.querySelector('[name=query]').value;
        actions.search(query);
    }
});

document.addEventListener('click', event => {
    UI.parent(event.target, 'a').then(anchor => {
        event.preventDefault();
        if (anchor.href.endsWith('#video')) {
            UI.parent(anchor, '.video').then(el => {
                actions.goToVideo(el.dataset.videoId);
            });
        }
    });
});

window.addEventListener('load', event => {
    const loc = window.location;
    if (loc.pathname.endsWith('/watch')) {
        const url = new URL(loc.toString());
        const videoId = url.get('v');
        if (videoId) {
            actions.goToVideo(videoId);
        }
    }
});