
// express init
const express= require('express');
const {getUserData,addData,findData,deleteData,updateData}=require('../controllers/usersController');

// router from express
const router= express.Router();


// create router
router.route('/').get(getUserData).post(addData);
router.route('/:id').get(findData).delete(deleteData).put(updateData)



module.exports=router;