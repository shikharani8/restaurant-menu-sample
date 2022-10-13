const { uuid } = require('uuidv4');
const respository = require('./repository');

exports.create = async(req, res) => {
    const data = req.body;
    data['uuid']= uuid();
    return respository.create(req.db, data).then(resp=>{
            return res.status(200).json({ "msg": 'Your Enquiry is submiited Successfully!' });
        }
    ).catch(err => {
        return res.status(300).json({ "msg": "Your Enquiry submision failed, please try again!" });
    });
 
}