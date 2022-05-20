/*
CLASSE CHE RAPPRESENTA UN NODO DELL'ALBERO BINARIO
*/
class Tree {
	constructor(data, left, right) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

/*
RITORNA UNA LISTA DI COPPIE (u,v) - DOVE (u,v) RAPPRESENTA UN ARCO DAL GENITORE u AL FIGLIO v
*/
function listaArchi(node){
	if (node==null){
		return []
	}

	var left = listaArchi(node.left)
	var right = listaArchi(node.right)

	var lista_archi = left.concat(right)

	if (node.left!=null){
		lista_archi.push([node.data,node.left.data]);
	}
	if (node.right!=null){
		lista_archi.push([node.data,node.right.data]);
	}

	return lista_archi
}

/*
RITORNA UNA VISITA SIMMETRICA DELL'ALBERO RADICATO A node
*/
function inorder(node) {
  if (node == null){
  	return []
  }
  var left = inorder(node.left);
  left.push(node.data);
  var right = inorder(node.right);

  return left.concat(right);
}

/*
RITORNA IL NUMERO DI NODI DELL'ALBERO RADICATO A node - node compreso
*/
function numeroDiNodi(node){
	if (node==null){
		return 0
	}

	var left = numeroDiNodi(node.left)
	var right = numeroDiNodi(node.right)

	return left+right+1
}

/*
RITORNA L'ALTEZZA DELL'ALBERO RADICATO A node
*/
function altezzaAlbero(node){
	if (node==null){
		return -1
	}

	var left = altezzaAlbero(node.left)
	var right = altezzaAlbero(node.right)

	return Math.max(left,right)+1
}

/*
DISEGNA LE LINEE GUIDA NELL'SVG
*/
function disegnaLineeGuida(){
	numero_nodi = numeroDiNodi(tree)
	finestra = larghezza/(numero_nodi+2)

	//verticali
	for (let i = 0; i < (numero_nodi+2); i++) {
	  svg.append("line")
	    .style("stroke", "grey")
	    .attr("x1", i*finestra)
	    .attr("y1", 0)
	    .attr("x2", i*finestra)
	    .attr("y2", altezza)
		.style("stroke-dasharray", ("3, 3"))
	}

	//orizzontali
	altezza_albero = altezzaAlbero(tree)
	finestra = altezza/(altezza_albero+2)
	for (let i = 0; i < (altezza_albero+2); i++) {
	  svg.append("line")
	    .style("stroke", "grey")
	    .attr("x1", 0)
	    .attr("y1", i*finestra)
	    .attr("x2", larghezza)
	    .attr("y2", i*finestra)
		.style("stroke-dasharray", ("3, 3"))
	}
}

/*
RITORNA L'ALTEZZA DEL NODO TROVATO
*/
function altezzaNodo(root, value){
    if (root==null){
        return 100
    }

    if (root.data == value){
        return 0
    }

    return 1 + Math.min(altezzaNodo(root.left, value), altezzaNodo(root.right, value))
}

/*
DISRGNA L'ALBERO
*/
function disegnaAlbero(tree){
	numero_nodi = numeroDiNodi(tree)
	finestra_larghezza = larghezza/(numero_nodi+2)

	altezza_albero = altezzaAlbero(tree)
	finestra_altezza = altezza/(altezza_albero+2)

	lista_nodi = inorder(tree)
	lista_archi = listaArchi(tree)

	var node = svg.append("g")
 		.attr("class", "nodes")
    	.selectAll("g")
    	.data(lista_nodi)
		.enter().append("g")
	var circles = node.append("circle")
		.attr("class", function(d,i){
			return "nodo"+" "+ "nodo"+d
		})
		.attr("r", 8)
		.attr("fill", "red")
        .attr("cx",function(d,i){
        	return (i+1)*finestra_larghezza
        })
        .attr("cy",function(d,i){
        	return (altezzaNodo(tree,d)+1)*finestra_altezza
        })
		.select(function() { return this.parentNode; })
		.append('text')
		.attr('y', function(d,i){
	        return (altezzaNodo(tree,d)+1)*finestra_altezza-10
            })
		.attr('x', function(d,i){
        	return (i+1)*finestra_larghezza-2
            })
		.attr("class", 'label')
		.attr("font-weight","bold")
		.text(function(d,i){
				return d
		})

	var link = svg.append("g")
		.attr("class","links")
		.selectAll("g")
		.data(lista_archi)
    	.enter().append("g")
    var lines = link.append("line")
		.attr("class", "linkkk")
		.style("stroke", "black")
      	.attr("stroke-width", 1)
      	.attr("x1", function(d,i){
      		x1 = svg.selectAll('.nodo'+d[0]).attr("cx")
      		return parseFloat(x1)
      	})
      	.attr("x2", function(d,i){
      		x2 = svg.selectAll('.nodo'+d[1]).attr("cx")
      		return parseFloat(x2)
      	})
      	.attr("y1", function(d,i){
      		y1 = svg.selectAll('.nodo'+d[0]).attr("cy")
      		return parseFloat(y1)
      	})
      	.attr("y2", function(d,i){
      		y2 = svg.selectAll('.nodo'+d[1]).attr("cy")
      		return parseFloat(y2)
      	})
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


var tree = new Tree(1,
	new Tree(2,
		new Tree(4,
			new Tree (17,null,null),
			null),
		new Tree(5,
			new Tree(11,
				new Tree(12,null,null),
				new Tree(13,
					new Tree(14,null,null),
					new Tree(15,null,null)
				))),
			null),
	new Tree(3,
		new Tree(6,null,null),
		new Tree(7,
			new Tree(8,null,null),
			new Tree(9,
				new Tree(10,null,null),
				new Tree(18,null,null))
		)));

console.log(listaArchi(tree))

disegnaLineeGuida()

disegnaAlbero(tree)

