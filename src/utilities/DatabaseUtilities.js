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

function helloWorld() {
    console.log("Hello world! !!");
}

/**
 *
 * getReadingList returns the reading list from the database from a user's phone number.
 *
 * @return {Promise} containing a dictionary representing each 'read' in the reading list, indexed by ID
 *         
 */
function getReadingList() {
    console.log("Getting the reading list!"); 
    
    const currentUserPhoneNumber = '+17084394869'; // TODO use real user #

    return firebase.database().ref(DatabaseQuery.ReadingLists).child(currentUserPhoneNumber).once('value')
        .then(snapshot => { return snapshot.val() }); 
}

export { getReadingList };
