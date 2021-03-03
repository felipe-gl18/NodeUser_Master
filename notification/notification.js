
// CREATING A FUNCTION FOR TO NOTIFY THE USER AND EXPORTING

const notifier = require('node-notifier');

module.exports = function Notification(){
    notifier.notify({
        title: 'Hello Felipe', 
        message: 'Welcome to our web site',
        wait: true,
    });
}
