<template>
    <div class='ReadingListGridCell container' @click="didClickCellBody($event)">
        <div class='thumbnail'></div>

        <div class='headlineContainer'>
            <p class='headlineText'>Hello World!</p>
        </div>
        
    </div>
</template>


<script>
export default {
    name: 'ReadingListGridCell',
    methods: {
        didClickCellBody: function(event) {
            if (event) {
                alert("Hello World from this Reading List Grid Cell!");
            }
        }
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
    font-weight: bold;
    margin-left: 5%;
    max-width: 90%;
    overflow: hidden;
    text-align: left;
}

div.thumbnail {
    /* Move this into js code later */
    background-color: gray;
    background-image: url("https://3.imimg.com/data3/IX/FX/MY-236745/coffee-white-pebbles-500x500.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    width: 100%;
    height: 75%;
}

</style>
