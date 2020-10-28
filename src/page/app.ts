import express from 'express';
import morgan from 'morgan';
import {iotData,DBInteraction} from './dbCode';
class App {
  public express;
  public db:DBInteraction;
  constructor () {
    this.express = express();
    this.express.use(morgan('combined'));
    this.mountRoutes();
    this.db = new DBInteraction();
    console.log('APP Constructor called');
  }

  

  private mountRoutes (): void {
    console.log('router called');

    const router = express.Router();
    
    router.get('/test', function(req, res) {
     res.send('router works');
    });
      // define the about route
    router.get('/sendData/:temp,:Ph,:light,:co2,:waterTemp,:humidity',async (req,res)=>{ await this.sendData(req,res)});
    router.get('/getData', async (req, res)=> {
    
      res.send(await this.db.getCurrentData('lambert'));
    });
    router.get('/getHistory', async (req, res)=> {
      console.log('history called')
      var coll = await this.db.getHistoricalData('lambert');
      res.send(coll);
     });
   
    this.express.use(router);
   
  }

  async sendData(req,res):Promise<void>{
  
      var hsystem:iotData = {
        Temp: parseFloat(req.params["temp"]),
        Ph: parseFloat(req.params["Ph"]),
        location: 'lambert',
        light:parseFloat(req.params["light"]),
        co2:parseFloat(req.params["co2"]),
        longitude:-84.137916,
        lattitude:34.105793,
        waterTemp:parseFloat(req.params["waterTemp"]),
        humidity:parseFloat(req.params["humidity"]),
        time:new Date()

      };
      
      await this.db.pushData(hsystem, hsystem.location);
      res.send('dataSend');
    
  }

}


export default new App().express