// créer un fichier bidon

url = "http://www.lifl.fr/miny/masterinfo/tableau.php";
dataType = "jsonp";
method = "get";

function success(json) {
    console.log(json);
    retourJSON = json;
}

function error(event) {
    console.log("Erreur : la requête AJAX n'a pas abouti : ");
    console.log(event);
}

function requeteGenerique(data) {
    var allData = {
        url: url,
        dataType: dataType,
        method: method,
        data: data,
        success: success,
        error: error
    };
    if (arguments.length > 1 && arguments[1]!=undefined)
        allData.success = arguments [1];
    if (arguments.length > 2 && arguments[2]!=undefined)
        allData.error = arguments [2];
    $.ajax(allData);
}

function creerTableau(nomTableau, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "creerTableau"
        }
        , success, error
    );
}

function supprimerTableau(nomTableau, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "supprimerTableau"
        }, success, error
    );
}

function testerExistenceTableau(nomTableau, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "testerExistenceTableau"
        },
        success, error
    );
}

function ajouterElementsDansTableauALaFin(nomTableau, tableauElements, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "ajouterElementsDansTableau",
            elementsAAjouter: tableauElements
        },
        success,
        error
    );
}

function ajouterElementDansTableauALaFin(nomTableau, element, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "ajouterElementsDansTableau",
            elementsAAjouter: [element],
        },
        success,
        error
    );
}

function ajouterElementsDansTableauALaFin2(nomTableau, success, error) {
    var tableauElements = new Array();
    for (var i = 1; i < arguments.length; i++)
        tableauElements.push(arguments[i]);

    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "ajouterElementsDansTableau",
            elementsAAjouter: tableauElements
        },
        success, error
    );
}


function ajouterElementsDansTableauA(nomTableau, emplacement, success, error) {
    var tableauElements = new Array();
    for (var i = 1; i < arguments.length; i++)
        tableauElements.push(arguments[i]);

    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "ajouterElementsDansTableau",
            elementsAAjouter: tableauElements,
            emplacement: emplacement
        },
        success, error
    );
}


function supprimerUnElementDansTableau(nomTableau, emplacement, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "supprimerUnElementDansTableau",
            emplacement: emplacement
        },
        success, error
    );
}


function avoirElementDansTableau(nomTableau, emplacement, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "avoirElementDansTableau",
            emplacement: emplacement
        },
        success, error
    );
}


function modifierUnElementDansTableau(nomTableau, element, emplacement, success, error) {
    requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "modifierUnElementDansTableau",
            element: element,
            emplacement: emplacement
        },
        success, error
    );
}


function avoirToutLeTableau(nomTableau, success, error) {
    return requeteGenerique(
        {
            nomTableau: nomTableau,
            action: "avoirToutLeTableau"
        },
        success, error
    );
}

function sortsched(json)
{
  json.donnees.tableau.sort(function(a,b){
    var dateA = new Date(a.debut);
    var dateB = new Date(b.debut);
    return (dateA >dateB)?1:-1;
  });
  for(var i = 0; i<json.donnees.tableau.length;i++)
  {
    var cren= new Crenaux(json.donnees.tableau[i].resume,json.donnees.tableau[i].debut,json.donnees.tableau[i].fin,json.donnees.tableau[i].lieu);

    if(cren.start.startsWith('Mon'))
    {
      schedule.mon.push(cren)
    }
    else if (cren.start.startsWith('Tue')) {
      schedule.tue.push(cren)
    }

    else if (cren.start.startsWith('We')) {
      schedule.wen.push(cren)
    }
    else if (cren.start.startsWith('Thu')) {
      schedule.thu.push(cren)
    }
  }
}

function generateSchedule(json)
{
  var node = document.getElementById('agenda');
  sortsched(json);
  for(var rowcpt=0; rowcpt<json.donnees.tableau.length/4;rowcpt++)
  {
    var row = document.createElement("div");
    row.className= "row";
    var offset = generateday(schedule.mon,rowcpt,row);
    offset = generateday(schedule.tue,rowcpt,row,offset);
    offset = generateday(schedule.wen,rowcpt,row,offset,true);
    offset = generateday(schedule.thu,rowcpt,row,offset);
    node.appendChild(row);
  }


}

function generateday(day,line,row,offset, draggable)
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
    titletext = document.createTextNode(day[line].resume)
    lieutext = document.createTextNode(day[line].lieu)
    debuttext = document.createTextNode(day[line].start)
    fintext = document.createTextNode(day[line].end)
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

// exemple :
// reponse = {}
// avoirToutLeTableau("tableauZave",function (json) {reponse.tab=json.donnees.tableau;})
