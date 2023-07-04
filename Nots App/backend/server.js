
require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const notRoute=require('./routes/notlar.js')
const kullaniciRoute=require('./routes/kullanici')

const cors=require('cors');


//express app
const app=express()

app.use(cors())

app.use(express.json())

//middleware
app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
})

app.use('/api/notlar',notRoute)
app.use('/api/kullanici',kullaniciRoute)


//veritabanı bağlantısı

mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log('Veritabanı bağlantısı başarılı');
    //request leri dinleyelim
    app.listen(process.env.PORT,()=>{
      console.log(`${process.env.PORT}. port dinleniyor`);
    })
  })
  .catch(err=>{
    console.log(err);
  })
