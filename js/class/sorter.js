class Sorter
{
  constructor(data)
  {
    this.data = data;

  }

  sortsched()
  {
    this.donnees.tableau.sort(function(a,b){
      var dateA = new Date(a.debut);
      var dateB = new Date(b.debut);
      return (dateA >dateB)?1:-1;
    });
    var agenda = new Agenda();

    for(var i = 0; i<this.data.donnees.tableau.length;i++)
    {
      var cren= new Crenaux(this.data.donnees.tableau[i].resume,this.data.donnees.tableau[i].debut,this.data.donnees.tableau[i].fin,this.data.donnees.tableau[i].lieu);

      if(cren.start.startsWith('Mon'))
      {
        agenda.schedule.mon.push(cren)
      }
      else if (cren.start.startsWith('Tue')) {
        agenda.schedule.tue.push(cren)
      }

      else if (cren.start.startsWith('We')) {
        agenda.schedule.wen.push(cren)
      }
      else if (cren.start.startsWith('Thu')) {
        agenda.schedule.thu.push(cren)
      }
    }
  }
  return agenda;
}
