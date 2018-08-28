<template>
    <div class="container">
        <MainToolbar/>
        <ReadingListGrid :readingList="readingListDict"/>
    </div>
</template>


<script>
import { getReadingList } from '../utilities/DatabaseUtilities'
import MainToolbar from './MainToolbar'
import ReadingListGrid from './ReadingListGrid'

export default {
    name: 'Dashboard',

    components: {
        MainToolbar, ReadingListGrid
    },

    data() {
        return {
            readingListDict: {}
        }
    },

    created() {
        getReadingList()
            .then(readingList => { this.readingListDict = readingList });
    }
}

</script>


<style scoped></style>
