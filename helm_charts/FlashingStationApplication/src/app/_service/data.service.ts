import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Device } from '../_interface/device';
import { Observable } from 'rxjs';

// //MongoDb Setup
// declare var require: any

//var express = require('express');
// var path = require('path');
// var bodyParser = require('body-parser');
// var mongo = require('mongoose');

// var db = mongo.connect("mongodb://localhost:27017/Devices", function(err,response){
//   if(err)
//   {
//     console.log(err);
//   }
//   else{
//     console.log('Connected to', db , ' + ' , response);
//   }
// });

// var app = express()
// app.use(bodyParser());
// app.use(bodyParser.json({limit:'5mb'}));
// app.use(bodyParser.urlencoded({extended:true}));

// app.use(function(req,res,next){
//   res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
//   res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials',true);
//   next();
// });

// var Schema = mongo.Schema;

// var DevicesSchema = new Schema({
//   hostname: {type: String},
//   ipadress: {type: String},
// },{versionKey:false});

// var model = mongo.model('devices', DevicesSchema, 'devices');

// app.get('/api/getDevice', function(req,res){
//   model.find({},function(err,data){
//     if(err){
//       res.send(err);
//     }
//     else{
//       res.send(data);
//     }
//   });
// })


// app.post('/api/SaveDevice', function(req,res){
//   var mod = new model(req.body);
//   if(req.body.mode == 'Save')
//   {
//     mod.save(function(err,data){
//       if(err){
//         res.send(err);
//       }
//       else{
//         res.send({data:'Record has been inserted!'});
//       }
//     })
//   }
//   else{
//     model.findByIdAndUpdate(req.body.id, {hostname: req.body.hostname, ipadress: req.body.ipadress},
//       function(err,data){
//         if(err){
//           res.send(err);
//         }
//         else{
//           res.send({data:'Record has been updated!'})
//         }
//       }
//     )};
// });

// app.post('/api/deleteDevice', function(req,res){
//   model.remove({_id: req.body.id}, function(err){
//     if(err){
//       res.send(err);
//     }
//     else{
//       res.send({data:'Record has been deleted!'});
//     }
//   });
// });

// app.listen(8080, function(){
//   console.log('Example app listening on port 8080');
// })


@Injectable({
  providedIn: 'root'
})
export class DataService {
  //Json-Server-url
  //private serverUrl = 'http://localhost:3000'
  private mongoServerUrl ='http://localhost:27017'
  constructor(
    private _http: HttpClient
  ) { }
  //Json-Server calls
   //Get
  // public getDevice():Observable<Device[]>{
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':'application/json'
  //     })
  //   };
  //   return this._http.get<Device[]>(`${this.serverUrl}/devices`, httpOptions);
  // }
  // //Post
  // public postDevice(object: Device):Observable<Device>{
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':'application/json'
  //     })
  //   };
  //   return this._http.post<Device>(`${this.serverUrl}/devices`,object, httpOptions);
  // }
  // //Delete
  // public deleteDevice(object: Device):Observable<Device>{
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':'application/json'
  //     })
  //   };
  //   return this._http.delete<Device>(`${this.serverUrl}/devices/${object.id}`, httpOptions);
  // }
  // //Put
  // public putDevice(object: Device):Observable<Device>{
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':'application/json'
  //     })
  //   };
  //   return this._http.put<Device>(`${this.serverUrl}/devices/${object.id}`,object, httpOptions);
  // }



  //client sided MongoDb Calls
  public saveDevice(device: Device){
    console.log("device to safe:")
    console.log(device)
    device.mode = "Save"
    return this._http.post('http://localhost:8080/api/SaveDevice/', device);
  }

  public getDevice(){
    return this._http.get('http://localhost:8080/api/getDevice/')
  }

  public deleteDevice(id){
    console.log("Id:"+id)
    return this._http.delete(`http://localhost:8080/api/deleteDevice/${id}`);
  }

  public deleteAllDevices(){
    return this._http.delete("http://localhost:8080/api/deleteDevices");
  }

  public checkDevicesFromQip(){
    return this._http.get('http://localhost:8080/api/checkDevicesInQip/')
  }

  public getNewestImagename(){
    return this._http.get('http://localhost:8080/api/getNewestImagename')
  }
  public getCurrentImagename(){
    return this._http.get('http://localhost:8080/api/getCurrentImagename')
  }
  
  public getNewestImage(imagename){
    return this._http.get(`http://localhost:8080/api/getNewestImage/${imagename}`)
  }

  public deleteOldImage(oldImage){
    return this._http.get(`http://localhost:8080/api/deleteOldImage/${oldImage}`)
  }
}

  
  
