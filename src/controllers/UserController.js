const User = require('../models/User');
const Bcrypt = require("bcryptjs");

module.exports = {
    async index(req, res){
        const users = await User.find().sort('-createdAt');

        return res.json(users);
    },

    async store(req, res){
        try{                      
            username = req.body.username;
            walletAdress = req.body.walletAdress;
            password = Bcrypt.hashSync(req.body.password, 10);
            userKind = req.body.userKind;

            const user = await User.create({         
                username,
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
            username = req.body.username;
            password = req.body.password;
            
            var user = await User.findOne({ username: username }).exec();

            if (!user) 
            {
                return res.json({'status':'NAOACHOU'});
            }
            else if (!Bcrypt.compareSync(password, user.password)) 
            {
                return res.json({'status':'NAOACHOU'});
            } 
            else if (Bcrypt.compareSync(password, user.password)) 
            {
                return res.json({
                    'status':'ACHOU',
                    '_id': user._id,
                    'username': user.username,
                    'walletAdress': user.walletAdress,
                    'depositHashTransactions': user.depositHashTransactions,
                    'totalAmountInvested': user.totalAmountInvested,
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