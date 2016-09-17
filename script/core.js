const API_KEY = 'AIzaSyDrRbZDOwixw1n_t1mQjxd-IGuNl_yoVIM';

const api = new YouTubeAPI(API_KEY);

const content = new UI.Content();

document.addEventListener('submit', event => {
    const element = event.target;
    event.preventDefault();

    if (event.target.matches('#search-bar')) {
        content.clear();

        const query = element.querySelector('[name=query]').value;
        api.search(query).then(data => {
            const videoGroup = new UI.VideoGroup('Results');
            data.items.forEach(item => {
                const video = new UI.Video(item);
                videoGroup.addVideo(video);
            });
            content.set(videoGroup);
        });
    }
});