<template>
    <div class='ReadingListGrid container'>
        <ul class='flex-grid'>            
            <li v-for="read in formattedReadingListArray" :key="read.id">
               <ReadingListGridCell :read='read'/> 
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
    },

    props: {
        readingList: Object
    },

    computed: {
        formattedReadingListArray: function() {
            return Object.values(this.readingList).reverse();
        }
    },

    watch: {
        readingList: function(newList, oldList) {
            console.log("ReadingListGrid:: Old List", Object.values(oldList));
            console.log("ReadingListGrid:: New List", Object.values(newList));
        }
    }
}
</script>


<style lang="scss" scoped>
$offWhite: rgb(250, 250, 250);

.container {
    background-color: $offWhite;
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

