Conversion(a,b); // this = window car equivalent à window.Conversion
b = new conversion(a,c)
b.handleEvent //Marche pas // va chercher dans le prototype du constructeur de b b.constructor.prototype.handleEvent et au pire il ira chercher dans prototype.constructor.prototype.constructor
// donc si handle event est dans la fonction conversion alors ça marche pas

b.constructor renvoin la fonction conversion

//définir une class
//1 on definit d'abord une fonction
function functionName(param1,param2) {
  this.source = param1; //ici this différent pour chaque objet
}

Conversion.prototype.handleEvent = function(event)
{
  this.demarrer();
}

Conversion.prototype.test = function()
{

}
//Ces fonctions sont dans le prototype donc elles ne sont pas différentes pour chauque objet

//Héritage
Conversion2.prototype = Conversion
