<template>
    <div class='ReadingListGridCell container' @click="didClickCellBody($event)">
        <img id="thumbnail" :src="articleThumbnailSrc" @error="handleImageLoadError"/>

        <div class='headlineContainer'>
            <p class='headlineText'>{{ read.headline }}</p>
        </div>
    </div>
</template>


<script>
export default {
    name: 'ReadingListGridCell',

    props: {
        read: Object // create & use strong Database.Read object
    },

    data () {
        return {
            articleThumbnailSrc: ""
        }
    },

    methods: {
        didClickCellBody: function(event) {
            if (event) { window.open(this.read.url); }
        },

        handleImageLoadError: function() {
            //  TODO fix case where image loaded but has transparent background showing through to the background-image
            // See: https://www.npmjs.com/package/vue-images-loaded
            this.articleThumbnailSrc = "https://wallpapertag.com/wallpaper/full/6/5/9/601333-free-cute-mustache-wallpapers-on-tumblr-2560x1600-image.jpg"
            // TODO replace with Stashe official empty state image
        }
    },

    created() {
        this.articleThumbnailSrc = this.read.imageURL;
    }
}
</script>


<style scoped>

div.container {
    align-items: center;
    background-color: tomato;    
    border-radius: 0.4vw;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: calc(16vw * (3/4));
    width: 16vw;
    margin: 1.44vw;
    overflow: hidden;

    /* TODO make more robust to dynamically size based on children */
    /* TODO ensure (re)sizing is appropriate on window resize */
}

div.container:hover {
    opacity: 0.55;
    cursor: pointer;
}

div.headlineContainer {
    align-content: flex-start;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100% - 75%);
    width: 100%;

    /* TODO make more robust to dynamically size based on text */
}

p.headlineText {
    /*  TODO make more robust to handle multiple lines
        Consider: http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/ */
    margin-left: 5%;
    max-width: 90%;
    overflow: hidden;
    text-align: left;
}

#thumbnail {
    background-color: gray;

    /* TODO replace with Stashe image */
    background-image: url("https://wallpapertag.com/wallpaper/full/6/5/9/601333-free-cute-mustache-wallpapers-on-tumblr-2560x1600-image.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: cover;
    display: flex;
    width: 100%;
    height: 75%;
}

</style>
