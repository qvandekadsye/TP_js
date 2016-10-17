

//var b=document.getElementById('b');
//b.onclick=function(){console.log("test")};
//L'absence de var dans une variable définit une variable globale
// window.x definit la variable global x ou window["x"]
// le mot clé argument contient l'ensemble des argument




//On va créer un objet Conversion

Conversion = {

  ihmConversion : function()
  {
    var text = this.getICSValue();
    this.printresultat(this.convert(text));
  },

  getICSValue : function()
  {
    var ics = document.getElementById('ics');
    return ics.value;
  },

  convert : function(text)
  {
    var tmptext= text.split("BEGIN:VEVENT");
    tab = []
    for (var i=1; i<tmptext.length; i++)
    {

      var line = tmptext[i].split('\n');
      var json = '{'
      for(var j=1; j<line.length-2; j++)
      {
        json+='\t'+line[j].replace('=',':')+',\n';

      }
      json+='}\n';
      tab.push(json);

    }

    var str ="";
    for(var k =0;k<tab.length; k++)
    {
      str+=tab[k]+'\n';
    }
    return str;
  },

  printresultat : function(text)
  {
      var j = document.getElementById('json');
      j.value=text;
  },


  handleEvent : function(event)
  {
    this.ihmConversion();
  },
}

var b=document.getElementById('b');
b.addEventListener("click",Conversion);
//handle event dans un objet permet de gerer lorsque un objet et cible d'un event
