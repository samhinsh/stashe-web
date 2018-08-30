<template>
    <div class="bounding-box">
        <div class="container">
            
            <img id="logo" src="../assets/mustache.png" @click="didClickStasheLogo()"/>

            <span id="saveLinkContainer">
                <img id="paperclip" src="../assets/paperclip.svg"/>
                <input v-model="saveLinkBarText" type="text" id="saveLinkTextbox" placeholder="Save a link to your reading list...">
                <button v-if="linkBarTextIsValid()" class="squareButton" id="saveButton" @click="didClickSaveLinkButton">Save</button>
            </span>

            <span class="optionsPane">
                <!-- TODO formatting -->
                <span class="optionsPane item">Buddies</span>

                <!-- TODO Replace with icon -->
                <span class="optionsPane item">Notifications

                    <!-- TODO remove -->
                    <ul>
                        <li> Hello world!</li>
                        <li> Hello world!</li>
                        <li> Hello world!</li>
                        <li> Hello world!</li>
                    </ul>
                </span>

                <!-- TODO Replace with icon -->
                <img class="optionsPane item circleButton profilePhoto" :src="profilePictureURL"/>

                <span class="optionsPane item">

                    <img class="optionsPane item settingsButton" src="../assets/three-dots.svg"/>

                    <ul>
                        <li @click="didClickLogoutButton">Logout</li>
                    </ul>
                </span>

            </span>
        </div>
    </div>
</template>


<script>
import firebase from 'firebase';
import { saveRead } from '../utilities/DatabaseUtilities'
import { isValidURL } from '../utilities/Helpers'

export default {
  name: "MainToolbar",

  data () {
      return {
          profilePictureURL: window.StasheApp.CurrentUser.profilePictureURL,
          saveLinkBarText: ""
      }
  },

  mounted () {
      console.log("SAM:: Profile Photo URL:", this.profilePictureURL);
  },

  methods: {

    didClickLogoutButton: function() {
      let router = this.$router;

      firebase
        .auth()
        .signOut()
        .then(function() {
          router.replace("/login");
        });
    },

    didClickSaveLinkButton: function() {

        // validate text
        if(!this.linkBarTextIsValid()) { return }

        // save link
        const url = this.saveLinkBarText;
        const isValidLink = isValidURL(url);

        if (!isValidLink) {
            alert("Please enter a valid URL.");
            return;
        }

        saveRead(url)
            .then(function() {
                console.log("MainToolbar:: Successfully saved the read!");
            })
            .catch(error => {
                console.log("MainToolbar:: Save Link error:", error);
            })

        // clear text
        this.saveLinkBarText = "";
    },

    didClickStasheLogo: function() { window.location.reload() },

    linkBarTextIsValid: function() {
        return this.saveLinkBarText && (this.saveLinkBarText.length > 0)
    }
  }
};
</script>


<style lang="scss" scoped>

/* variables */
$subtle-white: #f9f9f9;
$subtle-grey: #f2f2f2;
$pink: rgba(255, 39, 53, 0.925);

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
  overflow: hidden;

  &.profilePhoto {
      object-fit: cover;
      transform: rotate(90deg);
  }
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

.squareButton {
    background-color: $pink;
    border-radius: 2px;
    border-style: none;
    color: white;
    font-weight: bold;
    height: 2.5vw;
    width: 4.5vw;
    overflow: hidden;

    &:hover {
        background-color: darken($pink, 10%);
    }
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

    &:hover {
        cursor: pointer;
    }
}

#paperclip {
    height: 28px;
    margin-right: 10px;
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
        height: 6px;
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
                align-items: center;
                background-color: darken($subtle-white, 7%);
                display: flex;
                flex-direction: row;
                justify-content: center;
                height: 29px;
                
                &:hover {
                    background-color: darken($subtle-white, 10%);
                }
            }
        }
    }
}
</style>
