const hbs = require('hbs');
const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
const geocode = require('./controllers/geocode');
const forecast = require('./controllers/forecast');


// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,'../public'));
//define paths and express config
const pubpath =path.join(__dirname,'../public');
const viewspath = path.join(__dirname,'../templates/views');
const partialspath = path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialspath);

//setup static directory to serve
app.use(express.static(pubpath)); //this becomes default.

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Vandana'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Vandana'
    })
})
app.get('/helpo',(req,res)=>{
    res.render('newhelp',{
        title:'Help page',
        name:'Vandana'
        // author:'Vandana Shukla.'
    })
})
// app.get('',(req,res)=>{
//     res.send('<h1>Hello express!</h1>')
// });

// app.get('/help',(req,res)=>{
//     // res.send({
//     //     name:'help page',
//     //     purpose:'express help is coming your way!'
//     // });
//     res.send([{
//         name:'help page'
//     },{
//         purpose:'express help is coming your way!'
//     }
// ])
// });

// app.get('/about',(req,res)=>{
//     res.send('<i>express is a framework that helps nodejs create servers and middlewares!</i>');
// });

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:"PLease enter a location!"})
    }else{
        geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(Latitude,Longitude,'f',(error,weather)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    Address:req.query.address,
                    Location,
                    forecast:weather
                });
            })
        })
    }
    
});

app.get('/helpo/*',(req,res)=>{
    res.render('404page',{
        title:'Help page',
        name:'Vandana',
        errmsg:"404 help page not found"
    })
})
app.get('*',(req,res)=>{
    // res.send("404 page not found")
    res.render('404page',{
        title:'Random page',
        name:'Vandana',
        errmsg:"404 help page not found"
    })
})

app.listen(port,()=>{
    console.log("Server is up on port "+port+'.');
})