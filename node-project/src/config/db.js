var admin = require ('firebase-admin');

var serviceAccount = require ('./test-project-3396f-firebase-adminsdk-jmg5d-258f1d7b75.json');

admin.initializeApp ({
  credential: admin.credential.cert (serviceAccount),
  databaseURL: 'https://test-project-3396f-default-rtdb.firebaseio.com',
});

module.exports.db = admin.database();
