import db from './firebase_config';
import firebasedb from  "@firebase/database";
export class iotData {
  id?:string;
  Temp: number;
  Ph: number;
  location: string;
  light:number;
  co2:number;
  time:Date;
  longitude:number;
  lattitude:number;
  waterTemp: number;
  humidity: number;
  
}

 export class DBInteraction{

    async pushData(data:iotData, systemName:string):Promise<void>{
        const docRef = db.collection('hydroSystem').doc(systemName);
        console.log("pushing data");
        var collName =data.time.getFullYear()+ '-' +data.time.getMonth()+1 +'-' +  data.time.getDate() ;
        await docRef.set(data);
        const hisSystem = db.collection('historySystem').doc(systemName).collection(collName);
  
        data.id ="1";
        await hisSystem.add(data);
    }


    async getCurrentData(systemName:string):Promise<FirebaseFirestore.DocumentData>{
        var docRef = db.collection('hydroSystem').doc(systemName);
        // Attach an asynchronous callback to read the data at our posts reference
        var val = await  docRef.get();
        console.log(val.data());
        return val.data();
    }


    async getHistoricalData(systemName:string){
        // var docRef:firebasedb.Reference = db.ref("hydroSystem/lambert");
       var docRef = db.collection('historySystem').doc('lambert');
       // Attach an asynchronous callback to read the data at our posts reference
      
      var lst = await  docRef.listCollections();
      let arData :Array<FirebaseFirestore.DocumentData>=[];
      for ( let dt of lst){
            var subColl = await dt.get();
            subColl.docs.forEach(doc=> arData.push(doc.data()));
      }
      return arData;
       
    }
}

