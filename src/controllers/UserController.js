const User = require('../models/User');

module.exports = {
    async index(req, res){
        const users = await User.find().sort('-createdAt');

        return res.json(users);
    },

    async store(req, res){
        try{                      
            username = req.body.username;
            email = req.body.email;
            walletAdress = req.body.walletAdress;
            password = req.body.password;
            userKind = req.body.userKind;

            const user = await User.create({         
                username,
                email,
                walletAdress,
                password,    
                userKind,                                
            });

            req.io.emit('user', user);

            return res.json({user}
            );
        }catch(error){
            console.log(error.message);
            return res.json({error: error.message});
        }  
    },
    
    async login(req, res){
        try{  
            email = req.body.email;
            password = req.body.password;

            const Users = await User.findOne({email: email, password: password});

            if (Users == null){
                return res.json({'status':'NAOACHOU'});
            } else if (Users != null){
                return res.json({
                    'status':'ACHOU',
                    '_id': Users._id,
                    'username': Users.username,
                    'email': Users.email,
                    'walletAdress': Users.walletAdress,
                    'depositHashTransactions': Users.depositHashTransactions,
                    'totalAmountInvested': Users.totalAmountInvested,
                }                    
                );
            }
        }catch(error){
            console.log(error.message);
        }  
    },

    async addNewHash(req, res){
        try{  
            _id = req.body._id;
            depositHashTransactions = req.body.depositHashTransactions;

            User.findByIdAndUpdate(_id,
                {$push: {depositHashTransactions: depositHashTransactions}},
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                        return res.json({
                            'status':'Not Updated',
                            }                    
                        );
                    } else {
                        return res.json({
                            'status':'Updated',
                            }                    
                        );
                    }
                }
            );
        }catch(error){
            console.log(error.message);
        }  
    },

    async updateTotalAmountInvested(req, res){
        try{  
            _id = req.body._id;
            amount = req.body.amount;

            User.findByIdAndUpdate(_id,
                {$set: {'totalAmountInvested': amount}},
                {safe: true, upsert: true},
                function(err, doc) {
                    if(err){
                        return res.json({
                            'status':'Not Updated',
                            }                    
                        );
                    } else {
                        return res.json({
                            'status':'Updated',
                            }                    
                        );
                    }
                }
            );
        }catch(error){
            console.log(error.message);
        }  
    },

    async getUserInfo(req, res){
        try{  
            _id = req.params.id

            const Users = await User.findOne({_id: _id});

            if (Users == null){
                return res.json({'status':'NAOACHOU'});
            } else if (Users != null){
                return res.json({
                    'status':'ACHOU',
                    '_id': Users._id,
                    'username': Users.username,
                    'email': Users.email,
                    'walletAdress': Users.walletAdress,
                    'depositHashTransactions': Users.depositHashTransactions,
                    'totalAmountInvested': Users.totalAmountInvested,
                }                    
                );
            }
        }catch(error){
            console.log(error.message);
        }  
    },
};