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

                <button @click="didClickLogoutButton">Logout</button>
            </span>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'MainToolbar',
    methods: {
        didClickLogoutButton: function() {
            console.log("SAM:: Clicked log out button");
            let router = this.$router;

            firebase.auth()
            .signOut()
            .then(function() {
                console.log("SAM:: Sign out promise resolved");
                console.log("SAM:: This: ", typeof this, this);
                router.replace('/login');
            });
        }
    }
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
