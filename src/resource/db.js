const mongoose = require('mongoose');
const URI = 'mongodb+srv://srivas424:87240717ZETA@cluster0-ixrs0.mongodb.net/test?retryWrites=true';

mongoose.connect(URI).then(db=>{
        console.log("Success db connection");
    }
).catch(err=>{
    console.error("Error db connection. ",err)
})

module.exports = mongoose;