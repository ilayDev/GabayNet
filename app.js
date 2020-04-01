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
var sefer2  = new SeferTora("mualem",[new hebcal.HDate(6,'Nisan',5778)]);
var sefarim = [sefer1,sefer2];

app.get('/sefarim', (req, res) => res.send(sefarim))
app.get('/seferToRead', (req, res) => {
  sefarim.forEach(sefer => {
    if(isSeferHasAzcaraThisWeek(sefer)){
      res.send(sefer.name);
      return;
    }
  });
res.send('there is no azcara this week');
})


function isSeferHasAzcaraThisWeek(sefer){
  return IsDatesThisWeek(sefer.azcaraDates);
}


function IsDatesThisWeek(dates){

  var currDate = new hebcal.HDate();
  var azcaraDatesThisYear = getDateInCurrYear(dates, currDate);
  
  azcaraDatesThisYear.forEach(date => {

    if (date.abs()<= (currDate.abs()+6)) {
    console.log(date.abs()<= (currDate.abs()+6))
      return true;
    }
  });
return false;
}

function getDateInCurrYear(dates, currDate) {
  var azcaraDatesThisYear = [];
  dates.forEach(date => {

    azcaraDatesThisYear.push(new hebcal.HDate(date.getDate(), date.getMonthName(), currDate.getFullYear()));
  });
  return azcaraDatesThisYear;
}

