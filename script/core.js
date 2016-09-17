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