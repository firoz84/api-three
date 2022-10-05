const {readFileSync, writeFileSync, read}= require('fs');
const path= require('path');

const getUserData=(req, res)=>{
    const users= JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));

    res.status(200).json(users);

}

const addData=(req , res)=>{
    const users= JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));
    const {name, skill, age}= req.body;
    if(!name || !skill || !age){
        res.status(404).json({
            message: 'name & skill and age is require'
        })
    }else{

        users.push({
            id:Date.now().toString(),
            name:name,
            skill:skill,
            age:age
        })
        writeFileSync(path.join(__dirname, '../db/users.json'), JSON.stringify(users))
        res.status(201).json({
            message: 'update data successfull'
        })

    }
}
//find Data
const findData=(req, res)=>{
    const finddata= JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));
    const singleData= finddata.find(data =>data.id == req.params.id);
    if(singleData){
        res.status(201).json(singleData);
    }else{
        res.status(404).json({
            message:'data not find in the json file'
        })
    }
}
// delete data 
const deleteData=(req, res)=>{

    const deletesingledata= JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));

    if(deletesingledata.some(data=>data.id == req.params.id)){
        const data=deletesingledata.filter(data=>data.id !=req.params.id);
        writeFileSync(path.join(__dirname, '../db/users.json'), JSON.stringify(data));
        res.status(201).json({
            message:'delete data successfull'
        })
    }else{
        res.status(404).json({
            message:'delete data not found'
        })
    }
    
}
// updata data here 

 const updateData=(req , res)=>{
    const updata= JSON.parse(readFileSync(path.join(__dirname, '../db/users.json')));
    if(updata.some(data=> data.id ==req.params.id)){
        updata[updata.findIndex(data=>data.id== req.params.id)]={
        ...updata[updata.findIndex(data=>data.id== req.params.id)],
        ...req.body
        }
        writeFileSync(path.join(__dirname, '../db/users.json'), JSON.stringify(updata));
        res.status(201).json({
            message:'data update successfull'
        });
    }else{
        res.status(404).json({
            message:'not found'
        })
    }
 }

module.exports={
    getUserData,
    addData,
    findData,
    deleteData,
    updateData
}