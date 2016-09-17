class Actions
{
    constructor(ui, api)
    {
        this.ui = ui;
        this.api = api;
    }

    search(query)
    {
        this.ui.content.clear();
        this.api.search(query).then(data => {
            const videoGroup = new UI.VideoGroup(`Results for "${query}"`);
            data.items.forEach(item => {
                const video = new UI.Video(item);
                videoGroup.addVideo(video);
            });
            this.ui.content.set(videoGroup);
        });
    }

    goToVideo(videoId)
    {

    }
}
