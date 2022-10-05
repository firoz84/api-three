
const express= require('express');
const dotenv= require('dotenv').config();
const colors= require('colors');
const userPageRoutes= require('./routes/users')



// env port

const PORT= process.env.PORT || 8080;

// express init
const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//static folder

app.use(express.static('public'));

//make a routes
app.use('/api/v2/users',userPageRoutes)



app.listen(PORT, ()=>{


    console.log(`server running on port ${PORT}`);
})
