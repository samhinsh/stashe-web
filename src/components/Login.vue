<template>
    <div class="container">
        <div class="card">

            <div id="headerBlock">
                <p class="heading primary">Welcome to Stashe.</p>
                <p class="heading secondary">Your Shared Reading List</p>
            </div>

            <div id="formBlock">
                <p class="heading tertiary">Log In</p>
                <input class="item" v-if="!confirmationResult" type="tel" v-model="phoneNumber" placeholder="Phone Number">
                <button id="continueButton" class="item squareButton primaryButton" v-if="!confirmationResult" @click="didClickContinueButton">Continue</button>

                <input class="item" v-if="!!confirmationResult" type="text" v-model="confirmationCode" placeholder="Confirmation Code">
                <button id="confirmButton" class="item squareButton primaryButton" v-if="!!confirmationResult" @click="didClickConfirmButton">Confirm</button>
                <button class="item squareButton secondaryButton" v-if="!!confirmationResult" @click="didClickBackButton">Back</button>

                <!-- TODO add loading indicator -->
                <div id="recaptcha-container" v-if="!confirmationResult && !inputAuthRejectedPhoneNumber"></div>
            </div>

            <div class="errorText" id="captchaErrorContainer" v-if="!confirmationResult && inputAuthRejectedPhoneNumber">
                        Something went wrong. Try typing your number again, then hit 'continue'.
            </div>
            
        </div>

        <img id="mustache" src="../assets/mustache.png"/>
    </div>
</template>


<script>
import firebase from 'firebase';

/**
 * Returns whether the given string represents a valid-formatted phone number
 */
function isValidPhoneNumberFormat(str) {
    return true; // TODO add logic, move to Helpers.js
}


/**
 * Re-initializes the ReCaptacha widget.
 */
function resetReCaptcha() {
    if (typeof grecaptcha !== 'undefined' && typeof window.recaptchaWidgetId !== 'undefined') {
        console.log("SAM:: Login:: Resetting grecaptcha");
        grecaptcha.reset(window.recaptchaWidgetId);
        document.getElementById('recaptcha-container').innerHTML = '';
    } else {
        console.log("SAM:: Login:: grecaptcha could not be found to be reset");
    }
}

export default {
    name: 'Login',

    data() {
        return {
            phoneNumber: '',
            confirmationCode: '',
            confirmationResult: undefined,
            inputAuthRejectedPhoneNumber: false
        }
    },

    computed: {
        shouldDisableContinueButton: function() {
            const phoneNumber = this.phoneNumber;

            if (!phoneNumber || (phoneNumber === '')) { 
                return true;
            }
            return !isValidPhoneNumberFormat(phoneNumber);
        }
    },

    methods: {
        didClickContinueButton: function() {
            // TODO validate phone number
            // TODO clean up variable names & declarations

            if (this.shouldDisableContinueButton) {
                alert("Please input a valid phone number");
                return;
            }

            this.inputAuthRejectedPhoneNumber = false;

            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

            window.recaptchaVerifier.render().then(function(widgetId) {
                    window.recaptchaWidgetId = widgetId;
            });

            let phoneNumber = this.phoneNumber;
            let appVerifier = window.recaptchaVerifier;
            

            firebase
                .auth()
                .signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(confirmationResult => {
                    this.inputAuthRejectedPhoneNumber = false;
                    this.confirmationResult = confirmationResult;
                })
                .catch(error => {
                    alert("There was an error during sign in 😰");
                    console.log("Login:: There was an error during confirmation", error);
                    this.inputAuthRejectedPhoneNumber = true;
                    resetReCaptcha();
                });
        },

        didClickBackButton: function() {
            this.confirmationResult = undefined;
        },
        
        didClickConfirmButton: function() {
            let confirmationCode = this.confirmationCode;
            let router = this.$router;

            // TODO start loading indicator
            this.confirmationResult
                .confirm(confirmationCode)
                .then(userCredential => {
                    console.log("Login:: Sign in success! User credential", userCredential);
                    router.replace('/dashboard');
                })
                .catch(error => {
                    alert("There was an error with your sign in code.");
                    console.log("Login:: Something went wrong during confirmation:", error);
                })
        }
    }
}
</script>


<style lang="scss" scoped>
$offWhite: rgb(250, 250, 250);
$pink: rgba(255, 39, 53, 0.925);
$darkRed: rgba(167, 0, 11, 0.925);

@mixin flexContainer($direction) {
    align-items: center;
    display: flex;
    flex-direction: $direction;
    justify-content: center;
}

#captchaErrorContainer {
    margin-bottom: 28px;
}

#headerBlock {
    margin-top: 20px;
    margin-bottom: 16px;
} 

#formBlock {
    margin-top: 8px;
    margin-bottom: 20px;
}

#mustache {
    margin-top: 60px;
    object-fit: cover;
    height: 30px;
}

#recaptcha-container {
    margin-top: 18px;
}

.container {
    @include flexContainer(column);
    background-color: $offWhite; 
    width: 100vw;
    height: 100vh;
}

.squareButton {
    border-radius: 3px;
    border-style: none;
    overflow: hidden;
}

.primaryButton {
    background-color: $pink;
    color: white;
    font-weight: bold;

    &:hover {
        background-color: lighten($pink, 10%);
    }
}

.secondaryButton {
    background-color: rgba(220, 220, 220, 0.719);
    color: rgb(87, 87, 87);
    font-weight: bold;
}

.card {
    @include flexContainer(column);
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);

    width: 25vw;
    min-width: 350px;
    min-height: 260px;

    overflow: hidden;

    .errorText {
        color: $darkRed;
        font-size: 14px;
        width: 70%;
        text-align: center;
    }

    .heading {

        &.primary {
            color: gray;
            font-size: 28px;
            font-weight: bold;
            margin: 5px 5px 1px 5px;
        }

        &.secondary {
            color: gray;
            font-size: 18px;
            font-weight: bold;
            margin: 0px 5px 5px 5px;
        }

        &.tertiary {
            color: gray;
            font-weight: bold;
            font-size: 18px;
            margin: 10px 5px 4px 5px;
        }
    }

    .item {
        margin: 8px 10px;
    }

    input {
        border: 1px solid gainsboro;
        border-radius: 3px;
        color: gray;
        font-size: 15px;
        width: 60%;
        height: 35px;
        padding: 0px 13px;
    }

    button {
        font-size: 15px;
        width: 66%;
        height: 37px;
    }
}

</style>
