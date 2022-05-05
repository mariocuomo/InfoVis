/*
restituire una lista di valori ordinati
i valori della lista sono il campo **parametro** degli oggetti in **dataset**
*/
function ordina(dataset,parametro) {
  	var valoriOrdinati=dataset.map(function(el){return el[parametro]}).sort(function(a, b) {
			return a - b;
	});
	par=parametro
  	update(dataset,parametro,valoriOrdinati)
  }


/*
DISEGNA LE CASETTE LA PRIMA VOLTA NELL'ORDINE IN CUI LE LEGGE IN INPUT
*/
function disegna(dataset){
	svg
		.selectAll("dot")
		.data(dataset)
		.enter()
		.append('g')
		.append('line')   //orizzontale basso
		.attr('x1',function(d,i) { return (xScale(i))})
		.attr('x2',function(d,i) { return xScale(i)+scalaLarghezza(d["larghezza"])})
		.attr('y1',function(d,i) { return (altezza-offset)})
		.attr('y2',function(d,i) { return (altezza-offset)})
		.attr('stroke', 'black')
		.attr('fill', '#db5600')
		.attr('stroke-width','2')
		.attr("class", 'larghezzaBassa')
		.attr('cursor', 'pointer')
		.on('click',function() {
			ordina(dataset,'larghezza')
		})
		.select(function() { return this.parentNode; })
		.append('line')   //orizzontale alto
		.attr('x1',function(d,i) { return (xScale(i))})
		.attr('x2',function(d,i) { return xScale(i)+scalaLarghezza(d["larghezza"])})
		.attr('y1',function(d,i) { return (altezza-offset)-scalaAltezza(d["altezza"])})
		.attr('y2',function(d,i) { return (altezza-offset)-scalaAltezza(d["altezza"])})
		.attr('stroke', 'black')
		.attr('fill', '#db5600')
		.attr('stroke-width','2')
		.attr("class", 'larghezzaAlta')
		.attr('cursor', 'pointer')
		.on('click',function() {
			ordina(dataset,'larghezza')
		})
		.select(function() { return this.parentNode; })
		.append('line')   //verticale sinistra
		.attr('x1',function(d,i) { return xScale(i)})
		.attr('x2',function(d,i) { return xScale(i)})
		.attr('y1',function(d,i) { return (altezza-offset)})
		.attr('y2',function(d,i) { return (altezza-offset)-scalaAltezza(d["altezza"])})
		.attr('stroke', 'black')
		.attr('fill', '#db5600')
		.attr('stroke-width','2')
		.attr("class", 'altezzaSinistra')
		.attr('cursor', 'pointer')
		.on('click',function() {
			ordina(dataset,'altezza')
		})
		.select(function() { return this.parentNode; })
		.append('line')   //verticale destra
		.attr('x1',function(d,i) { return xScale(i)+scalaLarghezza(d["larghezza"])})
		.attr('x2',function(d,i) { return xScale(i)+scalaLarghezza(d["larghezza"])})
		.attr('y1',function(d,i) { return (altezza-offset)})
		.attr('y2',function(d,i) { return (altezza-offset)-scalaAltezza(d["altezza"])})
		.attr('stroke', 'black')
		.attr('fill', '#db5600')
		.attr('stroke-width','2')
		.attr("class", 'altezzaDestra')
		.attr('cursor', 'pointer')
		.on('click',function() {
			ordina(dataset,'altezza')
		})
		.select(function() { return this.parentNode; })	 
		.append('rect') //garage
		.attr("x", function(d,i) { return (xScale(i)+scalaLarghezza(d["larghezza"]))})
		.attr('y', function(d,i) { return (altezza-offset-scalaAltezza(d["altezza"]))})
		.attr("width", function(d,i) { return (scalaGarage(d["garage"]))})
		.attr('height', function(d,i) { return scalaAltezza(d["altezza"])})
		.attr('stroke', 'black')
		.attr('fill', 'grey')
		.attr('stroke-width','2')
		.attr("class", 'garage')
		.attr('cursor', 'pointer')
		.on('click',function() {
			ordina(dataset,'garage')
		})
		.select(function() { return this.parentNode; })
		.append('polyline') //tetto
		.attr("points", function(d,i){
			altezzaRettangolo=altezza-scalaAltezza(d["altezza"])
			var triangolo = (xScale(i))+" "+ (altezzaRettangolo-offset) +" " + ( xScale(i) + (scalaLarghezza(d["larghezza"]))/2) + ' ' +((altezzaRettangolo-offset)-scalaTetto(d["tetto"]))+' '+(parseFloat(xScale(i))+parseFloat(scalaLarghezza(d["larghezza"]))) + ' '+(altezzaRettangolo-offset)
			return triangolo
		})
		.attr('stroke', 'black')
		.attr('fill', '#feef00')
		.attr("class", 'tetto')
		.attr('stroke-width','2')
		.attr('cursor', 'pointer')
		.on('click',function() {
			ordina(dataset,'tetto')
		})
		.select(function() { return this.parentNode; })
		.append('text')
		.attr('y', function(){
			return (altezza-offset+15)
		})
		.attr("x", function(d,i) {
			return parseFloat(xScale(i)+(scalaLarghezza(d["larghezza"])-10)/2)
		})
        .text(function(d){return d["nome"];})
		.attr("class", 'label')
}


/*
AGGIORNA LA POSIZIONE DELLE CASETTE RISPETTO A **parametro**
*/
function update(dataset,parametro,valoriOrdinati){
	posizioniOccupate=[]

	var altezze_sinistre = svg.selectAll(".altezzaSinistra").data(dataset);
    altezze_sinistre.each(function(d,i,n){
		numeroOrdinale=(valoriOrdinati.indexOf(d[parametro]))
		x1=0

		if(posizioniOccupate.indexOf(numeroOrdinale)==-1){
			posizioniOccupate.push(numeroOrdinale)
			x1 = xScale(numeroOrdinale)
		}
		else{
			while(posizioniOccupate.indexOf(numeroOrdinale)!=-1){
				numeroOrdinale=numeroOrdinale+1
			}
			x1 = xScale(numeroOrdinale)
			posizioniOccupate.push(numeroOrdinale)

		}
		
		d3.select(this).transition().duration(3000).attr("x1", x1).attr("x2", x1)
	});



	posizioniOccupate=[]
	var altezze_destre = svg.selectAll(".altezzaDestra").data(dataset);
    altezze_destre.each(function(d,i,n){
		numeroOrdinale=(valoriOrdinati.indexOf(d[parametro]))
		x1=0

		if(posizioniOccupate.indexOf(numeroOrdinale)==-1){
			posizioniOccupate.push(numeroOrdinale)
			x1 = xScale(numeroOrdinale)+scalaLarghezza(d["larghezza"])
		}
		else{
			while(posizioniOccupate.indexOf(numeroOrdinale)!=-1){
				numeroOrdinale=numeroOrdinale+1
			}
			x1 = xScale(numeroOrdinale)+scalaLarghezza(d["larghezza"])
			posizioniOccupate.push(numeroOrdinale)

		}
		
		d3.select(this).transition().duration(3000).attr("x1", x1).attr("x2", x1)
	});


	posizioniOccupate=[]
	var larghezze_alte = svg.selectAll(".larghezzaAlta").data(dataset);
    larghezze_alte.each(function(d,i,n){
		numeroOrdinale=(valoriOrdinati.indexOf(d[parametro]))
		x1=0

		if(posizioniOccupate.indexOf(numeroOrdinale)==-1){
			posizioniOccupate.push(numeroOrdinale)
			x1 = xScale(numeroOrdinale)
		}
		else{
			while(posizioniOccupate.indexOf(numeroOrdinale)!=-1){
				numeroOrdinale=numeroOrdinale+1
			}
			x1 = xScale(numeroOrdinale)
			posizioniOccupate.push(numeroOrdinale)
		}
		
		d3.select(this).transition().duration(3000).attr("x1", x1).attr("x2", x1+scalaLarghezza(d["larghezza"]))
	});


	posizioniOccupate=[]
	var larghezze_basse = svg.selectAll(".larghezzaBassa").data(dataset);
    larghezze_basse.each(function(d,i,n){
		numeroOrdinale=(valoriOrdinati.indexOf(d[parametro]))
		x1=0

		if(posizioniOccupate.indexOf(numeroOrdinale)==-1){
			posizioniOccupate.push(numeroOrdinale)
			x1 = xScale(numeroOrdinale)
		}
		else{
			while(posizioniOccupate.indexOf(numeroOrdinale)!=-1){
				numeroOrdinale=numeroOrdinale+1
			}
			x1 = xScale(numeroOrdinale)
					posizioniOccupate.push(numeroOrdinale)
		}
		
		d3.select(this).transition().duration(3000).attr("x1", x1).attr("x2", x1+scalaLarghezza(d["larghezza"]))
	});


	posizioniOccupate=[]
	var tetti = svg.selectAll(".tetto").data(dataset);
    tetti.transition().duration(3000)
		.attr("points", function(d,i){
			altezzaRettangolo=altezza-scalaAltezza(d["altezza"])

			numeroOrdinale=valoriOrdinati.indexOf(d[parametro])

			if(posizioniOccupate.indexOf(numeroOrdinale)==-1){
				posizioniOccupate.push(numeroOrdinale)
			}else{
				while(posizioniOccupate.indexOf(numeroOrdinale)!=-1){
					numeroOrdinale=numeroOrdinale+1
				}
				posizioniOccupate.push(numeroOrdinale)
			}


			var triangolo = (xScale(numeroOrdinale))+" "+ (altezzaRettangolo-offset) +" " + ( xScale(numeroOrdinale) + (scalaLarghezza(d["larghezza"]))/2) + ' ' +((altezzaRettangolo-offset)-scalaTetto(d["tetto"]))+' '+(parseFloat(xScale(numeroOrdinale))+parseFloat(scalaLarghezza(d["larghezza"]))) + ' '+(altezzaRettangolo-offset)
			return triangolo
		})


	posizioniOccupate=[]
	var garages = svg.selectAll(".garage").data(dataset);
    garages.transition().duration(3000)
		.attr("x", function(d,i) {
			numeroOrdinale=valoriOrdinati.indexOf(d[parametro])

			if(posizioniOccupate.indexOf(numeroOrdinale)==-1){
				posizioniOccupate.push(numeroOrdinale)
			}else{
				while(posizioniOccupate.indexOf(numeroOrdinale)!=-1){
					numeroOrdinale=numeroOrdinale+1
				}
				posizioniOccupate.push(numeroOrdinale)
			}

			return parseFloat(xScale(numeroOrdinale)+(scalaLarghezza(d["larghezza"])))
		})
		.attr("width", function(d,i) {
			return scalaGarage(d["garage"])
		})
  	

	posizioniOccupate=[]
	var labels = svg.selectAll(".label").data(dataset);
    labels.transition().duration(3000)
		.attr("x", function(d,i) {
			numeroOrdinale=valoriOrdinati.indexOf(d[parametro])

			if(posizioniOccupate.indexOf(numeroOrdinale)==-1){
				posizioniOccupate.push(numeroOrdinale)
			}else{
				while(posizioniOccupate.indexOf(numeroOrdinale)!=-1){
					numeroOrdinale=numeroOrdinale+1
				}
				posizioniOccupate.push(numeroOrdinale)
			}

			return parseFloat(xScale(numeroOrdinale)+(scalaLarghezza(d["larghezza"])-10)/2)
		})
}



/*
AGGIORNA LA POSIZIONE DELLE CASETTE QUANDO SI RIDIMENSIONA LA FINESTRA DEL BROWSER
*/
window.addEventListener('resize', function(event){
	body = d3.select("body");
	svg = body.select("svg");
	larghezza = svg.style("width").replace("px", "");
	altezza = svg.style("height").replace("px","")
	offset=altezza/5
	
	scalaLarghezza = d3.scaleLinear().domain([0, massimaLarghezza]).range([0, (larghezza/20)-1])
  	scalaAltezza = d3.scaleLinear().domain([0, massimaAltezza]).range([0, ((altezza-offset)/2)])
	scalaTetto = d3.scaleLinear().domain([0, massimoTetto]).range([0, ((altezza-offset)/2)-10])
	scalaGarage = d3.scaleLinear().domain([0, massimoGarage]).range([0, (larghezza/20)-1])

	xScale = d3.scaleLinear().domain([0, 10]).range([0, larghezza-(massimaLarghezza+massimoGarage)])

  	ordina(dataset,par)
	
	var line = svg.selectAll(".line");
	line.attr("x2", function() {
		return larghezza;
	})
})

/*
STAMPA DATI IN TABELLA
*/
function printJSON(dataset) {
	columns=['nome','altezza', 'larghezza', 'tetto', 'garage']
	columns_=['ID','x','y','z','k']

	var table = d3.select('table')
	table.attr('border',"1").attr('cellspacing',"0").attr('cellpadding',"10")
	var thead = table.append('thead')
	var	tbody = table.append('tbody');

	thead.append('tr')
		.selectAll('th')
		.data(columns).enter()
		.append('th')
		.text(function(column,i) {
			return columns_[i];
		});

	var rows = tbody.selectAll('tr')
		.data(dataset)
		.enter()
		.append('tr');

	var cells = rows.selectAll('td')
	  .data(function (row) {
	    return columns.map(function (column) {
	      return {column: column, value: row[column]};
	    });
	  })
	  .enter()
	  .append('td')
	    .text(function (d) { return d.value; });
}

/*
FUNZIONE DI SUPPORTO PER MOSTRARE/NASCONDERE DATI
*/
function showData() {
  var rp = document.getElementById("dataCases");
  var sh = document.getElementById("show_hide");

  if (rp.style.display === "none") {
      rp.style.display = "block";
      sh.textContent='[-]';
  } else {
      rp.style.display = "none";
      sh.textContent='[+]';
  }
}


/*
=========
LIVELLO 0
=========
*/
var body = d3.select("body");
var svg = body.select("svg");
var larghezza = svg.style("width").replace("px", "");
var altezza = svg.style("height").replace("px","")
var offset=altezza/5
var par=null


d3.json("data.json")
	.then(function(data) {
		massimaLarghezza=d3.max(data, function(d) { return +d["larghezza"];} )
		massimaAltezza=d3.max(data, function(d) { return +d["altezza"];} )
		massimoTetto=d3.max(data, function(d) { return +d["tetto"];} )
		massimoGarage=d3.max(data, function(d) { return +d["garage"];} )

	  	scalaLarghezza = d3.scaleLinear().domain([0, massimaLarghezza]).range([0, (larghezza/20)-1])
	  	scalaAltezza = d3.scaleLinear().domain([0, massimaAltezza]).range([0, ((altezza-offset)/2)])
  		scalaTetto = d3.scaleLinear().domain([0, massimoTetto]).range([0, ((altezza-offset)/2)-10])
		scalaGarage = d3.scaleLinear().domain([0, massimoGarage]).range([0, (larghezza/20)-1])

		//effettua il map tra l'i-esima casetta e la l'i-esima posizione di ascissa in px 
		xScale = d3.scaleLinear().domain([0, 10]).range([0, larghezza-(massimaLarghezza+massimoGarage)])

		dataset=data

		svg.append("line")
		    .style("stroke", "black")
		    .attr("x1", 0)
		    .attr("y1", altezza-offset)
		    .attr("x2", larghezza)
		    .attr("y2", altezza-offset)
			.attr("class", 'line')

		disegna(dataset);

		printJSON(dataset)

		})			

	.catch(function(error) {
	// executed if errors occurr
	})
