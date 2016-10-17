class crenaux{
  constructor(description,start,end)
  {
    this.description = description;
    this.start = start
    this.end = end 
  }
}

class Conversion {
  constructor(source,cible) {
    this.source = document.getElementById(source);
    this.cible = document.getElementById(cible);
    this.crenaux = new Array;
  }

  handleEvent(event)
  {
    if(this.crenaux.length==0)
    {
      this.demarrer();
    }
    else {
      this.envoyerAuserveur();
    }
  }

  demarrer()
  {
    var icsData = this.source.value;
    jsondata = this.convert(icsData);
    this.cible.value = Json.stringify(this.crenaux)
  }

  convert(icsdata)
  {
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

  }


}
