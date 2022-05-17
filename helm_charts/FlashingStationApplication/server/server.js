//MongoDb Setup

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

//qip-Check-related variables
const dns = require('dns');
const dnsPromises = dns.promises;
const fs = require('fs');
const { async } = require('rxjs/internal/scheduler/async');
const { json } = require('express/lib/response');

//Connection to MongoDb
var db = mongo.connect("mongodb://localhost:27017/devices", function(err,response){
  if(err)
  {
    console.log(err);
  }
  else{
    console.log('Connected to', db , ' + ' , response);
  }
});
//Use express as backend
var app = express()
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Access-Control-Allow-Credentials',true);
  next();
});

var Schema = mongo.Schema;

var DevicesSchema = new Schema({
  _id: {type: Object},
  hostname: {type: String},
  ipadress: {type: String},
},{versionKey:false});

var model = mongo.model('devices', DevicesSchema, 'devices');

app.get('/api/getDevice', function(req,res){
  model.find({},async (err,data) =>{
    if(err){
      res.send(err);
    }
    else{
      await res.send(data);
      console.log("lala"+data)
    }
  });
})


  app.get('/api/checkDevicesInQip', async function (req,res){
    model.find({},  async function (err,data)  {
      if(err){
        res.send(err);
      }
      else{
        
        console.log(data)
        var result = "";
        for(const device of data){
          var host = await dnsPromises.reverse(device.ipadress);
          if (host.toString() == device.hostname){
            //result = result + {"hostname":device.hostname, "ipadress":device.ipadress, "message": "registered correctly"}
            result = result + "Device " + device.hostname + " has been registered correctly in QIP." +"\n"
            //JSON.stringify({ message: result })
          }
          else{
            //result = result + {"hostname":device.hostname, "ipadress":device.ipadress, "message": "NOT registered correctly"}
            result = result + "Device " + device.hostname + " has NOT been registered correctly in QIP." +"\n"
            //JSON.stringify({ message: result })
          }
        }

        res.send(JSON.stringify(JSON.stringify(result)))
      }
    });
  })




app.post('/api/SaveDevice', function(req,res){

  var mod = new model(req.body);
  console.log("mod")
  console.log(mod)
  //never enters here
  if(req.body.mode == 'Save')
  {
    mod._id = new mongo.Types.ObjectId();
    mod.save(function(err,data){
      if(err){
        console.log(err)
        res.send(err);
        
      }
      else{
        console.log(res)
        res.send({data:'Record has been inserted!'});
      }
    })
  }
  else{
    model.findByIdAndUpdate(req.body.id, {hostname: req.body.hostname, ipadress: req.body.ipadress},
      function(err,data){
        if(err){
          res.send(err);
        }
        else{
          res.send({data:'Record has been updated!'})
        }
      }
    )};
});

app.delete('/api/deleteDevice/:id', function(req,res){
  console.log(req.params.id)
  model.deleteOne({_id: mongo.Types.ObjectId(req.params.id)}, function(err){
    if(err){
      console.log(err)
      res.send(err);
    }
    else{
      res.send({data:'Record has been deleted!'});
    }
  });
});
app.delete('/api/deleteDevices', function(req,res){
  mongo.connection.collections['devices'].drop(function(err){
    if(err){
      console.log(err);
      res.send(err);
    }
    else{
      res.send({data:'Records have been deleted!'})
    }
  })
  // model.remove({}, function(err){
  //   if(err){
  //     console.log(err);
  //     res.send(err);
  //   }
  //   else{
  //     res.send({data:'Records have been deleted!'})
  //   }
  // });
})



app.listen(8080, function(){
  console.log('Example app listening on port 8080');
});
