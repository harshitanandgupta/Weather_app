const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./geocode')
const forecast=require('./forecast')

const app=express();


app.set('view engine','hbs')
const viewsdir=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')
app.set('views',viewsdir)
hbs.registerPartials(partialspath)
app.use(express.static(publicDirectoryPath))
/*app.get('',(req,res)=>{
    res.send('<h1>Hello</h1>')
})*/

app.get('',(req,res)=>{
    res.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/help',(req,res)=>{
    res.render('help')
})
app.get('/weather?',(req,res)=>{
    //console.log(req.query)
    if(!req.query.location)
    return res.send({'error':'Please Enter The location'})

    geocode(req.query.location,(error,response)=>{
        if(error){
            return res.send({'error':error})
        }
        else{
            //console.log(response.latitude,response.longitude,response.location)
            forecast(response.latitude,response.longitude,(err,resp) => {
                if(err){
                    return res.send({'error':err})
                }
                else{
                    resp.location=response.location
                    return res.send(resp)
                }
            })
        }
    })
})


app.get('*',(req,res)=>{
    res.render('404') 
})



app.listen(3000,()=>{
    console.log("Server is Running")
})