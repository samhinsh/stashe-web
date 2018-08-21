<template>
    <div class='ReadingListGrid container'>
        <ul class='flex-grid'>
            
            <!-- TODO substitute in real data model & perform binding on the cell class -->
            <li v-for="n in 15">
               <ReadingListGridCell class="cell"/> 
            </li>
        </ul>
    </div>
</template>

<script>
import ReadingListGridCell from './ReadingListGridCell'

export default {
    name: 'ReadingListGrid',
    components: {
        ReadingListGridCell
    }
}
</script>

<style scoped>
.container {
    background-color: rgb(250, 250, 250);
    width: 100%;
}

.flex-grid {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>

