import {env} from 'node:process'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongo from 'mongoose'
import cors from 'cors'

//MongoDb Setup

//var express = require('express');
//var path = require('path');
//var bodyParser = require('body-parser');
//var mongo = require('mongoose');


//Use express as backend
var app = express()
app.use(cors())
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type' );

  res.setHeader('Access-Control-Allow-Credentials',true);
  next();
});
//_______________________________________________________________________________________________________________________
//MongoDb should mount a tmp-folder from localhost to store image & files !!!!
//Connection to MongoDb --> needs to be adjusted
var mongoDb = mongo.connect("mongodb://localhost:27017/devices", function(err,response){
  if(err)
  {
    console.log(err);
  }
  else{
    console.log('Connected to', mongoDb , ' + ' , response);
  }
});
var Schema = mongo.Schema;

//Schema for mongoDB -> Equal to database
var DevicesSchema = new Schema({
  _id: {type: Object},
  hostname: {type: String},
  ipadress: {type: String},
},{versionKey:false});

//mongo.model (name, Schema, Collection)
var model = mongo.model('devices', DevicesSchema, 'devices');

//get all entries in devices collection in mongoDB
app.get('/api/getDevice', function(req,res){
  model.find({},async (err,data) =>{
    if(err){
      res.send(err);
    }
    else{
      await res.send(data);
    }
  });
})


//save new device or update exisiting device in collection devices in MongoDB
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

//delete device with given id in collection devices in MongoDB
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

//delete all devices in collection devices in MongoDB
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
})


//qip-Check-related variables

import dns from 'dns'
import fs from 'fs'

// const dns = require('dns');
 const dnsPromises = dns.promises;
// const fs = require('fs');
// const { async } = require('rxjs/internal/scheduler/async');
// const { json } = require('express/lib/response');



//get all devices in devices collection in mongoDB and do nslookup, create .json return value to show in client
app.get('/api/checkDevicesInQip', async function (req, res) {
  model.find({}, async function (err, data) {
    if (err) {
      res.send(err);
    }
    else {

      console.log(data)
      var result = "";
      for (const device of data) {
        try{
          var host = await dnsPromises.reverse(device.ipadress);
        if (host.toString() == device.hostname) {
          //result = result + {"hostname":device.hostname, "ipadress":device.ipadress, "message": "registered correctly"}
          result = result + "Device " + device.hostname + " has been registered correctly in QIP." + "\n"
          //JSON.stringify({ message: result })
        }
        else {
          //result = result + {"hostname":device.hostname, "ipadress":device.ipadress, "message": "NOT registered correctly"}
          result = result + "Device " + device.hostname + " has NOT been registered correctly in QIP." + "\n"
          //JSON.stringify({ message: result })
        }
        }
        catch (err) {
          result = result + "Device " + device.hostname + " has NOT been registered correctly in QIP." + "\n"
          console.log("not found")
        }
        
      }
      res.send(JSON.stringify(JSON.stringify(result)))
    }
  });
})


//_______________________________________________________________________________________________________________________
//create an array based on artifactory folder elements, sort the elements by the date, select newest

//establish artifactory connection
// var Curl = require( 'node-libcurl' ).Curl;

// var curl = new Curl();

// curl.setOpt( 'URL', 'https://eu-test.artifactory.conti.de/artifactory/ait-ma-testing-engineering-docker-v/aoit_ma_edge2cloud_flashingstation/' );
// curl.setOpt( 'FOLLOWLOCATION', true );

// curl.on( 'end', function( statusCode, body, headers ) {

//     console.info( statusCode );
//     console.info( '---' );
//     console.info( body.length );
//     console.info( '---' );
//     console.info( this.getInfo( 'TOTAL_TIME' ) );

//     this.close();
// });

// curl.on( 'error', function ( err, errCode ) {

//     //do something

//     this.close();
// });
//var fetch = require('node-fetch');
import fetch from 'node-fetch'


var imagename ="";


//artifactory connection and fetching the correct image
app.get('/api/getNewestImagename', async function (req, res) {
  try{
    console.log("getNewestImagename runs")
    let headers = new fetch.Headers();
    let username = env.USERNAME
    let password = env.PASSWORD
    headers.set('Authorization', 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'));


    var url = "https://eu-test.artifactory.conti.de/artifactory/ait-ma-testing-engineering-docker-v/aoit_ma_edge2cloud_flashingstation/";
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
      timeout: 5000
    })
    const data = await response.text();
    var images = data.substr(418)
    var result = [];
    result = images.match(/<a href=(.*?)>(.*?)<\/a>/g).map(function (val) {
      return val.replace(/<\/?a>/g, '').replace(/<\/?a href=(.*?)>/g, '');
    });
    console.log('Found images:')
    console.log(result)
    var newestImage = 0;
    for (let i = 0; i < result.length; i++) {
      if (Date.parse(result[i].substr(0, 19)) > Date.parse(result[newestImage].substr(0, 19))) {
        newestImage = i;
      }
    }
    console.log('newest date: ' + result[newestImage])
    console.log(typeof result[newestImage])
    imagename= result[newestImage]
    console.log("imagename: " + imagename)
    res.send(JSON.stringify(result[newestImage]));
  }
  catch (e){
    console.log("Login to Artifactory failed!")
    console.log(e)
  }
})


import exec from 'child_process'
import { errorMonitor } from 'node:events'

//check current image name on device
app.get('/api/getCurrentImagename', async function (req, res) {
  try{
    console.log("getCurrentImagename runs")
    var currentImage = fs.readdirSync('temporary/');
    res.send(JSON.stringify(currentImage.toString()))
  }
  catch (e){
    console.log("fetching of current image failed")
    console.log(e)
  }
})

//delete old image on device
app.delete('/api/deleteOldImage/:oldImage', async function (req, res) {
  try{
    console.log("deleteOldImage runs")
    console.log(req.params.oldImage)
    fs.unlink('temporary/'+req.params.oldImage, (err)=>{
      if(err) throw err;
      console.log('old image deleted');
    });
    res.send(true)
  }
  catch (e){
    console.log("fetching of current image failed")
    console.log(e)
    res.send(false)
  }
})

//var exec = require("child_process");

//fetch newest Image from Artifactory
app.get('/api/getNewestImage/:imagename', async function (req, res) {
  try{
    console.log(req.params.imagename)
    imagename = req.params.imagename;
    console.log("getNewestImage runs")
    console.log("imagename: "+imagename)
    let headers = new fetch.Headers();
    let username = env.USERNAME
    let password = env.PASSWORD
    headers.set('Authorization', 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'));
    
    var outputpath = "temporary"
    var url = `https://eu-test.artifactory.conti.de/artifactory/ait-ma-testing-engineering-docker-v/aoit_ma_edge2cloud_flashingstation/${imagename} > ../temporary/${imagename}`;
    await fetch(url, {
      method: 'GET',
      headers: headers,
      timeout: 5000
    });  
    console.log("response fetched")
    // real args var args = `-u uib75754:ze4hK4UB4G https://eu-test.artifactory.conti.de/artifactory/ait-ma-testing-engineering-docker-v/aoit_ma_edge2cloud_flashingstation/${imagename}`;

    var args = `-u ${username}:${password} https://eu-test.artifactory.conti.de/artifactory/ait-ma-testing-engineering-docker-v/aoit_ma_edge2cloud_flashingstation/${imagename} > temporary/${imagename}`;
 
     const response = await exec.exec('curl '+ args,function(error, stdout, stderr){
      console.log('stdout: '+ stdout);
      console.log('stderr: '+ stderr);
      exec.exec('mv temporary/'+imagename +' temporary/'+imagename+'//[]/:')
      res.send(JSON.stringify(imagename))
      if(error != null) {
        console.log('exec error:' + error);
      }
    })
  }
  catch (e){
    console.log("Pull from Artifactory failed!")
    console.log(e)
  }
})


//get all mounted devices on device
app.get('/api/checkMountedDevices', async function (req, res) {
  try{
    res.send(true)
  }
  catch (e){
    console.log("Checking for mounted devices failed")
    console.log(e)
    res.send(false)
  }
})


//configure port
app.listen(8080, function(){
  console.log('Example app listening on port 8080');
});
