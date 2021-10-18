import csv from 'csvtojson';
import { createReadStream, createWriteStream } from'fs';
import { Duplex, pipeline } from 'stream';

const csvFile = './csv/my_table.csv';
const answerFile = './result.txt';

class Dividing extends Duplex {
  constructor() {
    super();
  }

  _read() {}

  _write(chunk, _encoding, callback) {
    // transform object field's names to lower case
    const transformedObject = Object.entries(JSON.parse(chunk)).reduce((acc, [key, value]) => {
      const newKey = key.toLowerCase();

      return {...acc, [newKey]:value}
    }, {});

    const result = JSON.stringify(transformedObject);

    setTimeout(() => {
      this.push(result);
      callback();
    }, 0);
  }
}

//handlers
const handleError = (error) => {
  if(error) {
    console.error('Pipeline failed',error);
  } else {
    console.log('Operation of reading is completed');
  }
} 

const dividing = new Dividing();
const writeStream = createWriteStream(answerFile);
const readStream = createReadStream(csvFile).pipe(csv().subscribe(()=>{
  return new Promise((resolve,reject)=>{
    resolve();
    reject();
  })}))
 
pipeline(readStream, dividing, writeStream, handleError )
