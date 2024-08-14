//old way of using express used in ES6
// const express = require('express');

import express from 'express';

const app = express();

const PORT = 4000;

// app.use() //Middleware

// app.get('/'); 

// app.post('/products');

app.get('/', (req,res) => {
    res.status(200).json({message:"Hi my dear friends, we are FSD"})
})

app.listen(PORT, ()=>{
    console.log(`Server is running in the ${PORT}`);
}); //running