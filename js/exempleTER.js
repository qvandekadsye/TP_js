function Crenaux(start, end, name,lieu)
{
  this.start = start;
  this.end = end;
  this.resume =resume;
  this.lieu = lieu
}

function Conversion()
{
  this.source = document.getElementById('ics');
  this.cible = document.getElementById('json');
  this.crenaux = new Array;
}

Conversion.prototype.handleEvent = function(event)
{
  this.startConversion();
}

Conversion.prototype.startConversion = function () {
  var icsData = this.source.value;
  jsondata = this.convert(icsData);
  this.cible.value = jsondata;
};

Conversion.prototype.convert = function (ics) {
  var tmptext= ics.split("BEGIN:VEVENT");
  tab = {
    'events' : []
  }
  for (i=1; i<tmptext.length; i++)
  {
     evenement ={};
     line = tmptext[i].split('\n');


    for(var j=1; j<line.length; j++)
    {
      info = line[j].split(':');
      evenement[info[0]] = info[1];
      console.info(evenement);
    }
    tab.events.push(evenement)



  }
  return JSON.stringify(tab)



};
