<template>
    <div class="bounding-box">
        <div class="container">
            <span class="item">Logo</span>
            <h2>Reading List</h2>
            <span>
                <!-- TODO formatting -->
                <span class="item">Buddies</span>

                <!-- TODO Replace with icon -->
                <span class="item">Notifications</span>

                <!-- TODO Replace with icon -->
                <span class="item">Settings</span> 
                
                <!-- TODO Replace with icon -->
                <span class="item">Profile</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MainToolbar'
}
</script>

<style scoped>

.bounding-box {
    display: flex;
    flex-direction: row;
    background-color: cornflowerblue;
    height: 12vh;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0 2vw;
}
</style>
