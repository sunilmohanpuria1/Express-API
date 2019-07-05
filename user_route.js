var express = require('express');
var router = express.Router();
var model = require('./models');

router.get('/', (req, res) => {
    model.User.findAll(
        {
            include: [{
                model: model.contact,
            }]
        })
        .then(data => {
            res.send(data);
        });
});

router.get('/:user_id', (req, res) => {
    model.User.findOne(
        {
            where:
            {
                user_id: req.params.user_id
            },
            include: [{
                model: model.contact,
            }]
        })
        .then(data => {
            if (data !== null) {
                res.send(data);
            } else {
                //res.sendStatus(404);
                res.send("User Not Found");
            }
        });
})

router.post('/',function(req,res){
	model.contact.findOne({where:{contactNo:req.body.contactNo}})
		.then(token=>{
			if(token!==null){
				res.send("contact number Number already exist user not created  ");
			}else{
				model.User.findOne({where:{AdharNo:req.body.AdharNo}})
				.then(token2=>{
					if(token2!==null){
						model.contact.create({user_id:token2.user_id,contactNo:req.body.contactNo,address:req.body.address})
						.then(function(){res.send("User already avalable contact updated")});
					}else{
						model.User.create({Name:req.body.Name,AdharNo:req.body.AdharNo})
				.then(temp=>{
					model.contact.create({user_id:temp.user_id,contactNo:req.body.contactNo,address:req.body.address})
					.then(()=>{
						res.send("Data has enter with user id ="+temp.user_id);
					})
				}).catch(function(err){
					res.send("some thing went wrong try again");
					})
				}
			})
		}
	})
})

router.delete('/:contact_id', (req, res) => {
    model.contact.findOne({ where: { contact_id: req.params.contact_id } })
        .then(temp => {
            if (temp !== null) {
                temp.destroy();
                res.send("Contact deleted");
            } else {
                //res.sendStatus(404);
                res.send("User Not Found cannot delete");
            }
        })
})

router.put('/:contact_id', (req, res) => {
    model.contact.findOne({ where: { contact_id: req.params.contact_id } })
        .then((temp) => {
            if (temp !== null) {
                temp.update({ contactNo: req.body.contactNo ,address:req.body.address})
                    .then((data) => {
                        res.send(data);
                    })
                    .catch(function (err) {
                        //res.sendStatus(403);
                        res.send("Phone number already exist cannot update contact");
                    })
            } else {
                // res.sendStatus(404);
                res.send("Contact Not Found cannot delete");
            }
        })
})

module.exports = router;
