var model = require('./models');
const express = require('express');
const app = express();
const port = 3000;
const connection=require('./connection');

app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var for_key=function()                  ///To define the foreign Key in models
{   return new Promise(function(resolve,reject){
    model.User.hasMany(model.contact, {foreignKey: 'user_id'});
    model.contact.belongsTo(model.User, {foreignKey: 'user_id'});
    resolve();
    })
}

function main(){
    connection.authenticate()
    .then(()=>{
        return for_key();
    })
    .then(()=>{
        console.log("Sequalize connection established successfully");
        app.listen(port, () => console.log(`This app listening on port ${port}!`));
    })
    .catch(function (error) {
        throw error;
    });
}

main();

app.get('/user',(req,res)=>{
    model.User.findAll(
        {
            include: [{
                model: model.contact,
            }]
        }
    ).then(data => {
        res.send(data);
      });
}); 

app.get('/user/:user_id',(req,res)=>{
    model.User.findAll(
        {   where:
            {
                user_id:req.params.user_id
            },
            include: [{
                model: model.contact,
            }]
        }
    ).then(data => {
        res.send(data);
      });
})


app.post('/user',(req,res)=>{
    console.log(req.body);
    model.User.create({user_id:req.body.user_id,firstName:req.body.firstName,lastName:req.body.lastName}).then((temp) => {
        model.contact.create({contact_id:req.body.contact_id,user_id:temp.user_id,contactNo:req.body.contactNo,address:req.body.address}).then(()=>{
            res.send("Data has enter");
        })
        });
});

    //// put function remaining
app.put('/user/:id',(req,res)=>{

})

 //// delete function remaining
app.delete('/user/:id',(req,res)=>{

})