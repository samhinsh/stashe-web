<template>
    <div class="container">
        <p>Hello World from Login View</p>
        <div>
            <input type="tel" v-model="phoneNumber" placeholder="Phone Number">
            <button @click="didClickSubmit">Submit</button>
        </div>

        <div>
            <input type="text" v-model="confirmationCode" placeholer="Confirmation Code">
            <button @click="didClickConfirm">Confirm</button>
        </div>

        <!-- TODO add loading indicator -->
        <!-- TODO reCAPTCHA prettiness or use invisible reCAPTCHA -->
        <div id="recaptcha-container"></div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Login',
    data() {
        return {
            phoneNumber: '',
            confirmationCode: '',
            confirmationResult: []
        }
    },
    methods: {
        didClickSubmit: function() {
            // TODO validate phone number
            // TODO clean up variable names & declarations
            
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            let phoneNumber = this.phoneNumber;
            let appVerifier = window.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(confirmationResult => {
                this.confirmationResult = confirmationResult
            })
            .catch(error => {
                console.log("Login:: There was an error during confirmation", error);
                // TODO clear reCAPTCHA
            });
        },
        didClickConfirm: function() {
            let confirmationCode = this.confirmationCode;
            let router = this.$router;

            // TODO start loading indicator
            this.confirmationResult.confirm(confirmationCode)
            .then(userCredential => {
                console.log("Login:: Sign in success! User credential", userCredential);
                router.replace('/dashboard');
            })
            .catch(error => {
                console.log("Login:: Something went wrong during confirmation:", error);
            })
            // TODO segue to destination
        }
    }
}
</script>

<style scoped>

</style>
