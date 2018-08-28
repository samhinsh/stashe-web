const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

const DatabaseQuery = {

    BlockedBy           : 'blocked-by',
    BlockedUsers        : 'blocked-users',
    
    BuddyPings          : 'buddy-pings',
    BuddySenders        : 'buddy-senders',
    BuddyRecipients     : 'buddy-recipients',
        
    Users               : 'users',

    Messages            : 'messages',
        
    Notifications       : 'notifications',
        
    PhoneUsers          : 'phone-users',
        
    ReportedBy          : 'reported-by',
    ReportedReads       : 'reported-reads',
    ReportedUsers       : 'reported-users',
        
    Reads               : 'reads',
    ReadingLists        : 'reading-lists',
    ReadsPersonal       : 'reads-personal',
    ReadsReceived       : 'reads-received',
    ReadsSent           : 'reads-sent',
    ReadsToSend         : 'reads-to-send',
    ReadURLViews        : 'read-url-views',
};


/**
 *
 * getReadingList returns the reading list from the database for the current user.
 *
 * @return {Promise} containing a dictionary representing each 'read' in the reading list, indexed by ID
 *         
 */
function getReadingList() {
    const currentUserPhoneNumber = window.StasheApp.CurrentUser.phoneNumber;

    if (!currentUserPhoneNumber) { return } // TODO raise error

    console.log("Getting the reading list for #:", currentUserPhoneNumber); 

    return firebase.database().ref(DatabaseQuery.ReadingLists).child(currentUserPhoneNumber).once('value')
        .then(snapshot => { return snapshot.val() }); 
}



/**
 *
 * getUser returns the user object relating to the given user phone number.
 *
 * @param {String}  id              - key to the user record whose object we're interested in
 * @param {Boolean} byPhoneNumber   - whether or not the `id` property is a phoneNumber
 * 
 * @return {Promise} containing an representing the given user
 *         
 */
function getUser(id, byPhoneNumber) {
    if (!id) { return } // TODO raise error

    console.log("Getting the user for uid:", id);

    let queryPath = (byPhoneNumber ? DatabaseQuery.PhoneUsers : DatabaseQuery.Users)
    
    return firebase.database().ref(queryPath).child(id).once('value')
        .then(snapshot => { return snapshot.val() });
}



/**
 *
 * saveRead saves a link to the current user's reading list
 *
 * @param {String}  url - the url link to save to the reading list
 * 
 * @return {Promise} representing the completed operation
 *         
 */
function saveRead(url) {
    if (!url) { return } // TODO raise error

    // TODO validate url

    const currentUserPhoneNumber = window.StasheApp.CurrentUser.phoneNumber;
    const currentUserID = window.StasheApp.CurrentUserID;

    if (!currentUserPhoneNumber || !currentUserID) { return } // TODO raise error

    console.log("Saving the link to the user's reading list:", url);

    let newReadKey = firebase.database().ref(DatabaseQuery.ReadsToSend).push().key;

    if (!newReadKey) { return } // TODO raise error

    let recipients = {};
    recipients[currentUserPhoneNumber] = true;

    let readData = {
        "url"               : url,
        "recipients"        : recipients,
        "senderID"          : currentUserID,
        "senderPhoneNumber" : currentUserPhoneNumber,
        "timeCreated"       : Date.now(),
    }

    var updates = {};
    updates['/' + DatabaseQuery.ReadsToSend + '/' + newReadKey] = readData;

    return firebase.database().ref().update(updates);
}



export { getReadingList, getUser, saveRead };
