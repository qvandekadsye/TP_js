class Agenda
{
  constructor()
  {
    this.schedule= {};
    this.schedule['mon']=[];
    this.schedule['tue']=[];
    this.schedule['wen']=[];
    this.schedule['thu']=[];
  }

  generateday(day,line,row,offset, draggable)
  {
    console.log(day.length);
    var cell = document.createElement("div")
    cell.className="col-md-3"
    if(day.length>line)
    {
      if(typeof(offset)!= 'undefined')
      {
        cell.className+=" col-md-offset-"+offset;
      }
      var panel = document.createElement("div");
      if(draggable)
      {
        panel.setAttribute('draggable',true);
      }
      panel.className+= "panel"
      panel.className+= " panel-default"
      var title = document.createElement("div");
      title.className+= "panel-heading"
      var panelbody= document.createElement("div");
      panelbody.className+= "panel-body"
      var titletext = document.createTextNode(day[line].resume)
      var lieutext = document.createTextNode(day[line].lieu)
      var debuttext = document.createTextNode(day[line].start)
      var fintext = document.createTextNode(day[line].end)
      var debutDiv = document.createElement('div');
      debutDiv.class+="debut";
      var finDiv = document.createElement('div');
      finDiv.class+="fin";
      panelbody.appendChild(lieutext);
      debutDiv.appendChild(debuttext);
      finDiv.appendChild(fintext);
      panelbody.appendChild(debutDiv);
      panelbody.appendChild(finDiv);
      panel.appendChild(title);
      panel.appendChild(panelbody)
      title.appendChild(titletext)
      cell.appendChild(panel);
      row.appendChild(cell);
    }
    else
    {
      if(offset)
      {
        return offset+3;
      }
      else {
        return 3;
      }
    }
  }

  generateSchedule(json)
  {
    var node = document.getElementById('agenda');
    for(var rowcpt=0; rowcpt<json.donnees.tableau.length/4;rowcpt++)
    {
      var row = document.createElement("div");
      row.className= "row";
      var offset = this.generateday(this.schedule.mon,rowcpt,row);
      offset = this.generateday(this.schedule.tue,rowcpt,row,offset);
      offset = this.generateday(this.schedule.wen,rowcpt,row,offset,true);
      offset = this.generateday(this.schedule.thu,rowcpt,row,offset);
      node.appendChild(row);
    }
  }

}
