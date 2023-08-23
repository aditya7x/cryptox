tconst express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");


const DB = 'mongodb+srv://nathaditya446:RLsmWbntiW87SRfq@cluster0.zmwcs6m.mongodb.net/crypto?retryWrites=true&w=majority'

mongoose.connect(DB);

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use(
  cors({
  "origin": "https://cryptox-6149.vercel.app",
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"]
    
  })
);

// app.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");

// res.header("Access-Control-Allow-Headers", "X-Requested-With");

// next()

// });
// Add headers before the routes are defined
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'https://cryptox-6149.vercel.app');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });


app.use(express.static(__dirname + '/public/'))


const Credentialschema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    funds: Number,
    position: {
       item: String,
       amount: Number, 
       direction:  String,
       time: Number,
       buyat:Number, 
       closeat:  Number ,
       profit: Number
    },
    closed:[{
      item: String,
      amount: Number,
      direction: String,
      time: Number,
      buyat: Number,
      closeat: Number,
      profit: Number
    }]
  });
  
const User = mongoose.model("User", Credentialschema);
User.createIndexes();

app.post("/register", async (req, resp, next) => {
  const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.set({
            "Access-Control-Allow-Origin": origin, // ==> new header
            "Access-Control-Allow-Credentials": true
        })
    }
    next();
      try {
      console.log(req.body)
       const user = new User(req.body);
       let result =  await user.save();

  
        result = result.toObject();
    
        if (result) {
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }
 
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.post("/login", async (req, resp) => {
   
    try {

       
       
      let answer = await User.find({ email: req.body.email , password: req.body.password })
      console.log(answer)

      if(answer.length != 0){
        console.log("s")
        resp.sendStatus(200)
      } else{
       console.log("f")
       resp.sendStatus(404)
      }
      

     
 
    } catch (e) {
        resp.send("Something Went Wrong");
    }
});

app.post("/wallet", async (req, resp) => {
   
      let answer = await User.find({ email: req.body.email  })
      resp.send(answer)       
 
});

app.post("/trade", async (req, resp) => {
  const temptime = req.body.time
  console.log(temptime)
  
   
  let doc = await User.findOneAndUpdate({ email: req.body.email  }, {'position.item': req.body.item,'position.amount': req.body.money,'position.direction': req.body.direction,'position.time': req.body.time,'position.buyat': req.body.buyprice});

  let interval = temptime*1000
  const amount = Number(req.body.money)
  const buyprice = Number(req.body.buyprice)
 
  setTimeout(myfunction,interval)

  async function myfunction(){
      
    if(amount === 3000 ){
     const profit = -2300 
  
     let docs = await User.findOneAndUpdate({ email: req.body.email  },  {$push: {closed: {item: req.body.item,amount: req.body.money,direction: req.body.direction,time: req.body.time,buyat: buyprice,closeat: buyprice + profit,profit: profit}}});
     const newfund = docs.funds + profit;
     let docss = await User.findOneAndUpdate({ email: req.body.email  },  {funds: newfund});


    }else if(amount === 5000){
     const profit = -3200 
  
     let docs = await User.findOneAndUpdate({ email: req.body.email  },  {$push: {closed: {item: req.body.item,amount: req.body.money,direction: req.body.direction,time: req.body.time,buyat: buyprice,closeat: buyprice + profit,profit: profit}}});
     const newfund = docs.funds + profit;
     let docss = await User.findOneAndUpdate({ email: req.body.email  },  {funds: newfund});


    }else if(amount === 10000 ){
     const profit = 50000
  
     let docs = await User.findOneAndUpdate({ email: req.body.email  },  {$push: {closed: {item: req.body.item,amount: req.body.money,direction: req.body.direction,time: req.body.time,buyat: buyprice,closeat: buyprice + profit,profit: profit}}});
     const newfund = docs.funds + profit;
     let docss = await User.findOneAndUpdate({ email: req.body.email  },  {funds: newfund});


    }else if(amount === 15000 ){
     const profit = -75000
  
     let docs = await User.findOneAndUpdate({ email: req.body.email  },  {$push: {closed: {item: req.body.item,amount: req.body.money,direction: req.body.direction,time: req.body.time,buyat: buyprice,closeat: buyprice + profit,profit: profit}}});
     const newfund = docs.funds + profit;
     let docss = await User.findOneAndUpdate({ email: req.body.email  },  {funds: newfund});


    }else {
      const profit = amount*0.3
      
      let docs = await User.findOneAndUpdate({ email: req.body.email  },  {$push: {closed: {item: req.body.item,amount: req.body.money,direction: req.body.direction,time: req.body.time,buyat: buyprice,closeat: buyprice + profit,profit: profit}}});
      const newfund = docs.funds + profit
      let docss = await User.findOneAndUpdate({ email: req.body.email  },  {funds: newfund});
    }
    
    let doc = await User.findOneAndUpdate({ email: req.body.email  }, {'position.item': null,'position.amount': null,'position.direction': null,'position.time': null,'position.buyat': null});


   

  }
  

     

});

app.post("/change", async (req, resp) => {
  let docss = await User.findOneAndUpdate({ email: req.body.email  },  {password: req.body.password});

  
})

const axios = require('axios')

app.get("/crypto",function(req,resp){
  const axios = require('axios')

    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin%2Clitecoin%2Cmonero%2Csolana%2Cvertcoin%2Cpeercoin%2Ctether%2Cnamecoin&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true&precision=2')
    .then(function (response) {
        const data = response.data
        const array = [];
        Object.keys(data).forEach((key) => {
             array.push({
             name: key,
             usd: data[key]
           })
        });
        console.log(array)
        resp.send(array)
      })
    .catch(err => console.log(err))
   
  
})




app.listen(process.env.PORT || 5000,function(){
    console.log("server is running on 5000");
})

