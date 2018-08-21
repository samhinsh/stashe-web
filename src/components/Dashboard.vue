<template>
    <div class="container">
        <MainToolbar/>
        <ReadingListGrid/>
    </div>
</template>

<script>
import MainToolbar from './MainToolbar'
import ReadingListGrid from './ReadingListGrid'

export default {
    name: 'Dashboard',
    components: {
        MainToolbar, ReadingListGrid
    }
}
</script>

<style scoped></style>
