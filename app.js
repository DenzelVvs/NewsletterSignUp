const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json());

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/1d82d79225";

  const options = {
    method: "POST",
    auth: "denzel1:caccb03cfd06839a5c5cd9e530409dc8-us5"
  }

  const request = https.request(url,options, function(response){
    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    // response.on("data", function(data){
    //   console.log(JSON.parse(data));
    // })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})


app.listen(3000,function(){
  console.log("server is up");
});

// API Key
// caccb03cfd06839a5c5cd9e530409dc8-us5

// List ID
// 1d82d79225
