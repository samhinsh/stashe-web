<template>
    <div class="bounding-box">
        <div class="container">
            
            <img id="logo" src="../assets/mustache.png"/>

            <span id="saveLinkContainer">
                <input v-model="saveLinkBarText" type="text" id="saveLinkTextbox" placeholder="Save a link to your reading list...">
                <button v-if="saveLinkBarText && (saveLinkBarText.length > 0)" class="circleButton" id="saveButton">+</button>
            </span>

            <span class="optionsPane">
                <!-- TODO formatting -->
                <span class="optionsPane item">Buddies</span>

                <!-- TODO Replace with icon -->
                <span class="optionsPane item">Notifications

                    <!-- TODO remove when the discrepancy between 
                    this and the settings button menu is understood & resolved -->
                    <ul>
                        <li> Hello world!</li>
                        <li> Hello world!</li>
                        <li> Hello world!</li>
                        <li> Hello world!</li>
                    </ul>
                </span>

                <!-- TODO Replace with icon -->
                <button class="optionsPane item circleButton"></button>

                <span class="optionsPane item">

                    <!-- TODO make button color show grey  -->
                    <img class="optionsPane item settingsButton" src="../assets/three-dots.svg"/>

                    <!-- TODO this menu appears at a different height than other menus -->
                    <ul>
                        <li @click="didClickLogoutButton">Logout</li>
                    </ul>
                </span>

            </span>
        </div>
    </div>
</template>


<script>
import firebase from "firebase";

export default {
  name: "MainToolbar",

  data() {
      return {
          saveLinkBarText: ""
      }
  },

  methods: {
    didClickLogoutButton: function() {
      console.log("SAM:: Clicked log out button");
      let router = this.$router;

      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("SAM:: Sign out promise resolved");
          console.log("SAM:: This: ", typeof this, this);
          router.replace("/login");
        });
    }
  }
};
</script>


<style lang="scss" scoped>
.bounding-box {
  border-width: 0px 0px 1px 0px;
  border-color: gainsboro;
  border-style: solid;
  display: flex;
  flex-direction: row;
  background-color: white;
  height: 9vh;
}

button:focus {
  outline: 0;
}

.circleButton {
  background-color: lightgray;
  border-radius: calc(2.5vw / 2);
  border-style: none;
  height: 2.5vw;
  width: 2.5vw;
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

input {
    color: rgb(74, 75, 79);
    font-size: 100%;
    font-weight: bold;
    padding-left: 15px;
    
    &:focus {
        outline: 0;
    }
}

#logo {
    object-fit: cover;
    height: 20px; 
}

#saveButton {
  font-size: 1em;
  color: white;
  margin-left: 15px;
}

#saveLinkContainer {
  align-items: center;
  flex-direction: row;
  display: flex;
  justify-content: flex-start;
  width: 55vw;
}

#saveLinkTextbox {
  border: 1px solid gainsboro;
  border-radius: 0.2vw;
  flex: 2;
  height: 5.8vh;
}

/* variables */
$subtle-white: #f9f9f9;
$subtle-grey: #f2f2f2;

.optionsPane {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.optionsPane.item {
    color: gray;
    font-weight: bold;
    margin: 8px;
    position: relative;

    &.settingsButton {
        // fill: pink !important;
        height: 30px;
    }
    
    /* secondary ul */
    ul {
        display: none;
    }

    /* initial item:hover */
    &:hover {
        cursor: pointer;
        background-color: $subtle-grey;

        /* secondary ul visibility change */
        ul {
            display: block;
            margin-top: 15px;
            width: 200px;
            
            top: 5px;
            padding-top: 18px;
            position: absolute;
            
            /* secondary li */
            li {
                display: block;
                background-color: darken($subtle-white, 7%);
                height: 30px;
                
                &:hover {
                    background-color: darken($subtle-white, 10%);
                }
            }
        }
    }
}
</style>
