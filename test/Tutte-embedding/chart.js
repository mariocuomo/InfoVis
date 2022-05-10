/*
AGGIORNA LE POSIZIONI OGNI 2 SECONDI CON ANIMAZIONI DI UN SECONDO
*/
function aggiornaPosizioni(data){
	//archi
	var links = svg.selectAll(".linkkk").data(data.links)
	links.transition().duration(1000)
		.attr("x1", function(d,i){
				if (d.source=='1'){
            		return larghezza/4
            	}
            	if (d.source=='2'){
            		return larghezza/2
            	}
            	if (d.source=='3'){
            		return 3*larghezza/4
            	}


            	//mediare tra i vicini
            	vicini = data.links.filter(function(k){
            		return k.source == d.source || k.target == d.source;
            	}).map(function(k){
            		return k.source == d.source ? k.target : k.source;
        		});

            	var tot = 0
            	for (const vicino of vicini) {
				  	nodo = svg.selectAll('.nodo'+vicino)
				  	tot = tot+parseFloat(nodo.attr("cx"))
				} 

				return tot/vicini.length
		})
		.attr("x2", function(d,i){
				if (d.target=='1'){
            		return larghezza/4
            	}
            	if (d.target=='2'){
            		return larghezza/2
            	}
            	if (d.target=='3'){
            		return 3*larghezza/4
            	}


            	//mediare tra i vicini
            	vicini = data.links.filter(function(k){
            		return k.source == d.target || k.target == d.target;
            	}).map(function(k){
            		return k.source == d.target ? k.target : k.source;
        		});

            	var tot = 0
            	for (const vicino of vicini) {
				  	nodo = svg.selectAll('.nodo'+vicino)
				  	tot = tot+parseFloat(nodo.attr("cx"))
				} 

				return tot/vicini.length
		})
		.attr("y1", function(d,i){
				if (d.source=='1'){
            		return 2*altezza/3
            	}
            	if (d.source=='2'){
            		return altezza/3
            	}
            	if (d.source=='3'){
            		return 2*altezza/3
            	}


            	//mediare tra i vicini
            	vicini = data.links.filter(function(k){
            		return k.source == d.source || k.target == d.source;
            	}).map(function(k){
            		return k.source == d.source ? k.target : k.source;
        		});

            	var tot = 0
            	for (const vicino of vicini) {
				  	nodo = svg.selectAll('.nodo'+vicino)
				  	tot = tot+parseFloat(nodo.attr("cy"))
				} 

				return tot/vicini.length
		})
		.attr("y2", function(d,i){
				if (d.target=='1'){
            		return 2*altezza/3
            	}
            	if (d.target=='2'){
            		return altezza/3
            	}
            	if (d.target=='3'){
            		return 2*altezza/3
            	}


            	//mediare tra i vicini
            	vicini = data.links.filter(function(k){
            		return k.source == d.target || k.target == d.target;
            	}).map(function(k){
            		return k.source == d.target ? k.target : k.source;
        		});

            	var tot = 0
            	for (const vicino of vicini) {
				  	nodo = svg.selectAll('.nodo'+vicino)
				  	tot = tot+parseFloat(nodo.attr("cy"))
				} 

				return tot/vicini.length
		})

	//nodi
	var nodi = svg.selectAll(".nodo").data(data.nodes);
	nodi.transition().duration(1000)
		.attr("cx", function(d,i){
				if (i==0){
            		return larghezza/4
            	}
            	if (i==1){
            		return larghezza/2
            	}
            	if (i==2){
            		return 3*larghezza/4
            	}

            	//mediare tra i vicini
            	vicini = data.links.filter(function(k){
            		return k.source == d.id || k.target == d.id;
            	}).map(function(k){
            		return k.source == d.id ? k.target : k.source;
        		});

            	var tot = 0
            	for (const vicino of vicini) {
				  	nodo = svg.selectAll('.nodo'+vicino)
				  	tot = tot+parseFloat(nodo.attr("cx"))
				} 

				return tot/vicini.length
		})
		.attr("cy", function(d,i){
				if (i==0){
            		return 2*altezza/3
            	}
            	if (i==1){
            		return altezza/3
            	}
            	if (i==2){
            		return 2*altezza/3
            	}

            	//mediare tra i vicini
            	vicini = data.links.filter(function(k){
            		return k.source == d.id || k.target == d.id;
            	}).map(function(k){
            		return k.source == d.id ? k.target : k.source;
        		});

            	var tot = 0
            	for (const vicino of vicini) {
				  	nodo = svg.selectAll('.nodo'+vicino)
			  		tot = tot+parseFloat(nodo.attr("cy"))
				} 

				return tot/vicini.length
		})

	//etichette
	var etichette = svg.selectAll(".label").data(data.nodes);
	etichette.transition().duration(1000)
		.attr("x", function(d,i){
				if (i==0){
            		return larghezza/4-3
            	}
            	if (i==1){
            		return larghezza/2-3
            	}
            	if (i==2){
            		return 3*larghezza/4-3
            	}

            	//mediare tra i vicini
            	vicini = data.links.filter(function(k){
            		return k.source == d.id || k.target == d.id;
            	}).map(function(k){
            		return k.source == d.id ? k.target : k.source;
        		});

            	var tot = 0
            	for (const vicino of vicini) {
				  	nodo = svg.selectAll('.nodo'+vicino)
				  	tot = tot+parseFloat(nodo.attr("cx"))
				} 

				return tot/vicini.length-3
		})
		.attr("y", function(d,i){
				if (i==0){
            		return 2*altezza/3+3
            	}
            	if (i==1){
            		return altezza/3+3
            	}
            	if (i==2){
            		return 2*altezza/3+3
            	}

            	//mediare tra i vicini
            	vicini = data.links.filter(function(k){
            		return k.source == d.id || k.target == d.id;
            	}).map(function(k){
            		return k.source == d.id ? k.target : k.source;
        		});

            	var tot = 0
            	for (const vicino of vicini) {
				  	nodo = svg.selectAll('.nodo'+vicino)
			  		tot = tot+parseFloat(nodo.attr("cy"))
				} 

				return tot/vicini.length+3
		})
}

/*
DISEGNA IL GRAFO LA PRIMA VOLTA
*/
function disegna(data){

	//nodi e etichette
	var node = svg.append("g")
 		.attr("class", "nodes")
    	.selectAll("g")
    	.data(data.nodes)
		.enter().append("g")
	var circles = node.append("circle")
		.attr("class", function(d,i){
			return "nodo"+" "+ "nodo"+d.id
		})
		.attr("r", 8)
		.attr("fill", function(d,i){
        	if (i==0 || i==1 || i==2){
        		return "green"
        	}
        	return "red"
        })
        .attr("cx", function(d,i){
        	if (i==0){
        		return larghezza/4
        	}
        	if (i==1){
        		return larghezza/2
        	}
        	if (i==2){
        		return 3*larghezza/4
        	}

    		return larghezza/2
        })
        .attr("cy", function(d,i){
        	if (i==0){
        		return 2*altezza/3
        	}
        	if (i==1){
        		return altezza/3
        	}
        	if (i==2){
        		return 2*altezza/3
        	}

    		return 2*altezza/3

        })
		.select(function() { return this.parentNode; })
		.append('text')
		.attr('y', function(d,i){
            	if (i==0){
            		return 2*altezza/3+3
            	}
            	if (i==1){
            		return altezza/3+3
            	}
            	if (i==2){
            		return 2*altezza/3+3
            	}

        		return 2*altezza/3+3

            })
		.attr('x', function(d,i){
            	if (i==0){
            		return larghezza/4-3
            	}
            	if (i==1){
            		return larghezza/2-3
            	}
            	if (i==2){
            		return 3*larghezza/4-3
            	}

        		return larghezza/2-3
            })
		.attr("class", 'label')
		.text(function(d,i){
				return d.id
			})

	//archi 
	var link = svg.append("g")
		.attr("class","links")
		.selectAll("g")
		.data(data.links)
    	.enter().append("g")
    var lines = link.append("line")
		.attr("class", "linkkk")
		.style("stroke", "black")
      	.attr("stroke-width", 1)
      	.attr("x1", function(d,i){
      		x1 = svg.selectAll('.nodo'+d.source).attr("cx")
      		return parseFloat(x1)
      	})
      	.attr("x2", function(d,i){
      		x2 = svg.selectAll('.nodo'+d.target).attr("cx")
      		return parseFloat(x2)
      	})
      	.attr("y1", function(d,i){
      		y1 = svg.selectAll('.nodo'+d.source).attr("cy")
      		return parseFloat(y1)
      	})
      	.attr("y2", function(d,i){
      		y2 = svg.selectAll('.nodo'+d.target).attr("cy")
      		return parseFloat(y2)
      	})
}


/*
============
LIVELLO 0
===========
*/

var body = d3.select("body");
var svg = body.select("svg");
var larghezza = svg.style("width").replace("px", "");
var altezza = svg.style("height").replace("px","")

d3.json("data.json")
	.then(function(data) {

		//disegna linee guida
		svg.append("line")
		    .style("stroke", "grey")
		    .attr("x1", 0)
		    .attr("y1", altezza/3)
		    .attr("x2", larghezza)
		    .attr("y2", altezza/3)
       		.style("stroke-dasharray", ("3, 3"))
			.select(function() { return this.parentNode; })
			.append("line")	 
		    .style("stroke", "grey")
		    .attr("x1", 0)
		    .attr("y1", 2*altezza/3)
		    .attr("x2", larghezza)
		    .attr("y2", 2*altezza/3)
       		.style("stroke-dasharray", ("3, 3"))
			.select(function() { return this.parentNode; })
			.append("line") 
			.style("stroke", "grey")
		    .attr("x1", larghezza/4)
		    .attr("y1", 0)
		    .attr("x2", larghezza/4)
		    .attr("y2", altezza)
       		.style("stroke-dasharray", ("3, 3"))
			.select(function() { return this.parentNode; })
			.append("line") 
			.style("stroke", "grey")
		    .attr("x1", larghezza/2)
		    .attr("y1", 0)
		    .attr("x2", larghezza/2)
		    .attr("y2", altezza)
       		.style("stroke-dasharray", ("3, 3"))
			.select(function() { return this.parentNode; })
			.append("line") 
			.style("stroke", "grey")
		    .attr("x1", 3*larghezza/4)
		    .attr("y1", 0)
		    .attr("x2", 3*larghezza/4)
		    .attr("y2", altezza)
       		.style("stroke-dasharray", ("3, 3"))
			.select(function() { return this.parentNode; })

		//disegna nodi
		disegna(data)
	  	

        setInterval(function() {
        	aggiornaPosizioni(data)
        }, 2000);
		})
			

	.catch(function(error) {
	// executed if errors occurr
	})
