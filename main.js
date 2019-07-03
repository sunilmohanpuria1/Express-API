var model = require('./models');
const express = require('express');
const app = express();
const port = 3000;
const connection=require('./connection');
var user=require('./user_route.js')

app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


function main(){
    connection.authenticate()
    .then(()=>{
        return for_key();
    })
    .then(()=>{
        console.log("Sequalize connection established successfully");
        app.listen(port, () => console.log(`This app listening on port ${port}!`));
        app.use('/user', user);
    })
    .catch(function (error) {
        throw error;
    });
}

main();


var for_key=function()                  ///To define the foreign Key in models
{   return new Promise(function(resolve,reject){
    model.User.hasMany(model.contact, {foreignKey: 'user_id'});
    model.contact.belongsTo(model.User, {foreignKey: 'user_id'});
    resolve();
    })
}
