const http = require('http');
const HebMonthEnum = require('./HebMonthEnum');
const hebcal = require('hebcal');
const SeferTora = require('./SeferTora');


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))




var sefer1  = new SeferTora("levi", [new hebcal.HDate(27,'Adar',5775)]);
var sefer2  = new SeferTora("mualem",[new hebcal.HDate(5,'Nisan',5778)]);
var sefarim = [sefer1,sefer2];

app.get('/sefarim', (req, res) => res.send(sefarim))
app.get('/seferToRead', (req, res) => {
  sefarim.forEach(sefer => {
    if(isSeferHasAzcara(sefer)){
      res.send(sefer.name);
      return;
    }
  });
res.send('there is no azcara this week');
})


function isSeferHasAzcara(sefer){
  if (IsDatesThisWeek(sefer.azcraDates)){
    return true;
  }
  return false;
}


function IsDatesThisWeek(dates){

  var currDate = new hebcal.HDate();
  var azcaraDatesThisYear = getDateInCurrYear(dates, currDate);
  
  azcaraDatesThisYear.forEach(date => {
    console.log(currDate);
    console.log(currDate.abs()+6);
    
    console.log(date);
    console.log(date.abs());

    if (date.abs()<= (currDate.abs()+6)) {
      return true;
    }
  });
return false;
}

function getDateInCurrYear(dates, currDate) {
  var azcaraDatesThisYear = [];
  dates.forEach(date => {
     console.log(date.getDate());
     console.log(date.getDay());
     console.log(date.getFullYear());
    azcaraDatesThisYear.push(new hebcal.HDate(date.getDate(), date.getMonthName(), currDate.getFullYear()));
  });
  return azcaraDatesThisYear;
}



// console.log( hebcal.HDate().toString());
// console.log( hebcal.HDate().abs());
// console.log( hebcal.HDate(1).toString());
// console.log( hebcal.HDate(1).abs());
// console.log( hebcal.HDate(2).toString());
// console.log( hebcal.HDate(2).abs());



// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
// //   res.end('Hello World');
// res.end(sefer.azcraDates.toString());
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
