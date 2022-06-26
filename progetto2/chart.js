/*
CLASSE CHE MODELLA UN NODO DELL'ALBERO BINARIO
*/
class BinaryTree {
	constructor(val, left, right) {
		this.val = val;
		this.left = left;
		this.right = right;
		this.x = 0
		this.y = 0
		this.profondita = 0
		this.numero_nodi = 0
		this.peso = 0
		this.fittizio = false
	}
}

/*
RITORNA UNA LISTA DI COPPIE (u,v) - DOVE (u,v) È UN ARCO DAL GENITORE u AL FIGLIO v
*/
function listaArchi(tree){
	if (tree==null){
		return []
	}

	var left = listaArchi(tree.left)
	var right = listaArchi(tree.right)

	var lista_archi = left.concat(right)

	if (tree.left!=null){
		lista_archi.push([tree.val,tree.left.val]);
	}
	if (tree.right!=null){
		lista_archi.push([tree.val,tree.right.val]);
	}

	return lista_archi
}

/*
RITORNA UNA VISITA SIMMETRICA DELL'ALBERO RADICATO A tree
*/
function inorder(tree) {
  if (tree == null){
  	return []
  }
  var left = inorder(tree.left);
  left.push(tree);
  var right = inorder(tree.right);

  return left.concat(right);
}

/*
RITORNA IL NUMERO DI NODI DEL SOTTOALBERO RADICATO A tree (node compreso)
*/
function numeroDiNodi(tree){
	if (tree == null){
			return 0
	}

	if (tree instanceof BinaryTree){
		return 1+numeroDiNodi(tree.left)+numeroDiNodi(tree.right)	
	}	
	else{
		var tmp = 0
   		for(var i in tree.children){
      		tmp = tmp + numeroDiNodi(tree.children[i])	
       	}
       	return tmp+1
	}
}

/*
INVERTE LE COORDINATE x CON LE COORDINATE y DEI NODI DI tree
*/
function inverti(tree){
	if (tree==null){
		return
	}

	var tmp = tree.x
	tree.x = tree.y
	tree.y = tmp

	inverti(tree.left)
	inverti(tree.right)
}

/*
ARRICCHISCE IL CAMPO profondità DEI NODI, tree È LA RADICE, val È LA SUA PROFONDITÀ
*/
function impostaProfondita(tree,val){
	if (tree==null){
		return
	}
	tree.profondita=val
	impostaProfondita(tree.left,val+1)
	impostaProfondita(tree.right, val+1)
}

/*
ARRICCHISCE IL CAMPO numero_nodi DEI NODI tree È LA RADICE
*/
function impostaNumeroNodi(tree){
	if (tree==null){
		return
	}

	if (tree instanceof BinaryTree){
		tree.numero_nodi=numeroDiNodi(tree)
		impostaNumeroNodi(tree.left)
		impostaNumeroNodi(tree.right)
	}
	else{
		tree.numero_nodi=numeroDiNodi(tree)
		for(var i in tree.children){
      		impostaNumeroNodi(tree.children[i])	
       	}
	}
}

/*
RITORNA LA LARGHEZZA DEL DISEGNO ESPRESSA IN TERMINI DI COORDINATE INTERE
*/
function larghezzaDisegno(tree){
	if (tree==null){
		return 0
	}
	return Math.max(tree.x,larghezzaDisegno(tree.left),larghezzaDisegno(tree.right))
}

/*
RITORNA L'ALTEZZA DEL DISEGNO ESPRESSA IN TERMINI DI COORDINATE INTERE
*/
function altezzaDisegno(tree){
	if (tree==null){
		return 0
	}
	return Math.max(tree.y,altezzaDisegno(tree.left),altezzaDisegno(tree.right))
}

/*
DISEGNA UNA GRIGLIA n X n - DOVE n È IL NUMERO DI NODI
*/
function disegnaLineeGuida(){
	finestra = larghezza/(massima_componente_altezza_larghezza+2)

	//verticali
	for (let i = 0; i < massima_componente_altezza_larghezza+2; i++) {
	  svg.append("line")
	    .style("stroke", "grey")
	    .attr("x1", i*finestra)
	    .attr("y1", 0)
	    .attr("x2", i*finestra)
	    .attr("y2", altezza)
		.style("stroke-dasharray", ("3, 3"))
		.attr("class","lineeguida")
	}

	//orizzontali
	for (let i = 0; i < massima_componente_altezza_larghezza+2; i++) {
	  svg.append("line")
	    .style("stroke", "grey")
	    .attr("x1", 0)
	    .attr("y1", i*finestra)
	    .attr("x2", larghezza)
	    .attr("y2", i*finestra)
		.style("stroke-dasharray", ("3, 3"))
		.attr("class","lineeguida")
	}
}

/*
DISEGNA SCALA PER MAPPARE LA FEATURE PESO
*/
function disegnaScalaColori(minimo, massimo){

	interpolateCool = d3.scaleSequential(d3.interpolateCool).domain([minimo, massimo]);

	grandezza_quadrato = larghezza/(massimo)

	svg.selectAll("rect")
      .data(d3.range(0,massimo, 1))
      .enter()
      .append("g")
      .append("rect")
      .attr("width", grandezza_quadrato+1)
      .attr("height", larghezza/(massima_componente_altezza_larghezza+2)/2)
      .attr("x", function(d,i) {
      	return i*grandezza_quadrato-1
      })
      .attr("y", 0)
      .attr("fill",  function(d){
      	return interpolateCool(d)
      })
      .attr("class", "colormap")

		svg.append('text')
		.attr('y', larghezza/(massima_componente_altezza_larghezza+2))
		.attr('x', 0)
		.attr("class", 'label')
		.attr("font-weight","bold")
		.text("0")
      	.attr("class", "colormap")

		svg.append('text')
		.attr('y', larghezza/(massima_componente_altezza_larghezza+2))
		.attr('x', larghezza-(larghezza/(massima_componente_altezza_larghezza+2))/2)
		.attr("class", 'label')
		.attr("font-weight","bold")
		.text(massimo)
      .attr("class", "colormap")

}

/*
CALCOLA IL MASSIMO SPOSTAMENTO A DESTRA DEL SOTTOALBERO RADICATO A tree
RITORNA IL MASSIMO VALORE DELLA COORDINATA x
*/
function massimoSpostamentoADestra(tree){
	if (tree==null){
		return 0
	}
	else{
		return Math.max(tree.x,massimoSpostamentoADestra(tree.left),massimoSpostamentoADestra(tree.right))
	}
}

/*
CALCOLA IL MASSIMO SPOSTAMENTO VERSO SOTTO DEL SOTTOALBERO RADICATO A tree
RITORNA IL MASSIMO VALORE DELLA COORDINATA y
*/
function massimoSpostamentoSotto(tree){
	if (tree==null){
		return 0
	}
	else{
		return Math.max(tree.y,massimoSpostamentoSotto(tree.left),massimoSpostamentoSotto(tree.right))
	}
}

/*
CALCOLA POSIZIONI INTERE DEI NODI DI tree CON IL metodo SCELTO
*/
function calcolaPosizioni(tree,metodo){
	if (metodo=="Right heavy"){
		rightHeavy(tree)
		return
	}

	if (metodo=="Alternate"){
		alternate(tree)
		return
	}

	if (metodo=="Bottom heavy"){
		bottomHeavy(tree)
		return
	}

	if (metodo=="Eades"){
		eades(tree)
		return
	}
}

/*
RITORNA IL MASSIMO VALORE DEL CAMPO peso NELL'ALBERO BINARIO RADICATO A tree
*/
function massimoPeso(tree){
	if (tree==null){
		return 0
	}
	return Math.max(tree.peso, massimoPeso(tree.left), massimoPeso(tree.right))
}

/*
RITORNA IL MINIMO VALORE DEL CAMPO peso NELL'ALBERO BINARIO RADICATO A tree
*/
function minimoPeso(tree){
	if (tree==null){
		return Number.MAX_VALUE;
	}

	return Math.min(tree.peso, minimoPeso(tree.left), minimoPeso(tree.right))
}

/*
CALCOLA POSIZIONI INTERE DEI NODI RADICATI A tree CON METODO RIGHT HEAVY
*/
function rightHeavy(tree){
	try{
		sx = tree.left.numero_nodi
	}
	catch(err){
		sx=0
	}

	try{
		dx = tree.right.numero_nodi
	}
	catch{
		dx=0
	}

	//il figlio destro ha più nodi
	if (dx>sx){
		if (tree.right==null && tree.left==null){
			return
		}

		if (tree.left!=null && tree.right!=null){
			tree.left.x = tree.x
			tree.left.y = tree.y+1 
			rightHeavy(tree.left)

			tree.right.x =  massimoSpostamentoADestra(tree)+1
			tree.right.y = tree.y
			rightHeavy(tree.right)
			return
		}

		if (tree.right==null && tree.left!=null){
			tree.left.x = tree.x+1
			tree.left.y = tree.y
			rightHeavy(tree.left)
			return
		}

		if (tree.right!=null && tree.left==null){
			tree.right.x =  tree.x+1
			tree.right.y = tree.y
			rightHeavy(tree.right)
			return
		}
	}
	//il figlio sinistro ha piu nodi
	else{
		if (tree.right==null && tree.left==null){
			return
		}

		if (tree.left!=null && tree.right!=null){
			tree.right.x = tree.x
			tree.right.y = tree.y+1 
			rightHeavy(tree.right)

			tree.left.x =  massimoSpostamentoADestra(tree)+1
			tree.left.y = tree.y
			rightHeavy(tree.left)
			return
		}

		if (tree.right!=null && tree.left==null){
			tree.right.x = tree.x+1
			tree.right.y = tree.y 
			rightHeavy(tree.right)
			return
		}

		if (tree.right==null && tree.left!=null){
			tree.left.x = tree.x+1
			tree.left.y = tree.y 
			rightHeavy(tree.left)
			return
		}
	}
}

/*
CALCOLA POSIZIONI INTERE DEI NODI RADICATI A tree CON METODO BOTTOM HEAVY
(SEMPLICEMENTE APPLICA IL RightHeavy E INVERTE LE COORDINATE x E y)
*/
function bottomHeavy(tree){
	rightHeavy(tree)
	inverti(tree)
}


/*
CALCOLA POSIZIONI INTERE DEI NODI RADICATI A tree CON METODO ALTERNATE
*/
function alternate(tree){
	if (tree.right==null && tree.left==null){
		return
	}

	//se hai entrambi i figli
	//se profondità pari devi effettuare una horizontal combination mettendo il figlio più piccolo sotto con distanza 1 e l'altro a destra
	//se profondità dispari devi effettuare una vertical combination mettendo il figlio più grande a destra con distanza 1 e l'altro sotto
	if (tree.left!=null && tree.right!=null){
		sx = numeroDiNodi(tree.left)
		dx = numeroDiNodi(tree.right)

		if (tree.profondita%2==0){
			//se il figlio sinistro è il più grande
			if (sx>dx){
				tree.right.x = tree.x
				tree.right.y = tree.y+1

				alternate(tree.right)

				tree.left.x =  massimoSpostamentoADestra(tree)+1
				tree.left.y = tree.y
				alternate(tree.left)
				return
			}
			else{
				tree.left.x = tree.x
				tree.left.y = tree.y+1

				alternate(tree.left)

				tree.right.x =  massimoSpostamentoADestra(tree)+1
				tree.right.y = tree.y
				alternate(tree.right)
				return
			}
		}
		else{
			if (sx>dx){
				tree.left.x = tree.x+1
				tree.left.y = tree.y
				alternate(tree.left)

				tree.right.y = massimoSpostamentoSotto(tree)+1
				tree.right.x = tree.x

				alternate(tree.right)
				return
			}
			else{
				tree.right.x = tree.x+1
				tree.right.y = tree.y
				alternate(tree.right)

				tree.left.y = massimoSpostamentoSotto(tree)+1
				tree.left.x = tree.x

				alternate(tree.left)
				return
			}

			tree.right.x = tree.x+1
			tree.right.y = tree.y
			alternate(tree.right)

			tree.left.y = massimoSpostamentoSotto(tree)+1
			tree.left.x = tree.x

			alternate(tree.left)
			return
		}
	}

	//se hai solamente il figlio sinistro
	if (tree.right==null && tree.left!=null){
		if (tree.profondita%2==0){
			tree.left.x = tree.x
			tree.left.y = tree.y+1
			alternate(tree.left)
			return
		}
		else{
			tree.left.y = tree.y
			tree.left.x = tree.x+1
			alternate(tree.left)
			return
		}
	}

	//se hai solamente il figlio destro
	if (tree.right!=null && tree.left==null){
		if (tree.profondita%2==0){
			tree.right.x = tree.x
			tree.right.y = tree.y+1
			alternate(tree.right)
			return
		}
		else{
			tree.right.y = tree.y
			tree.right.x = tree.x+1
			alternate(tree.right)
			return
		}		
	}
 }


/*
ELIMIA DUPLICATI DA UN ARRAY DI COPPIE
*/
function removeDuplicates(arr) {
	return arr.filter((value, index, self) =>
  		index === self.findIndex((t) => (
    		t.x === value.x && t.y === value.y
  		))
	)
}

/*
CLASSE CHE MODELLA UN RETTANGOLO
LARGHEZZA x E ALTEZZA Y
*/
class Rettangolo {
	constructor(x,y) {
		this.x = x
		this.y = y
	}
}


/*
FUNZIONE CHE MODIFICA (O CREA) LA VARIABILE atoms_min
atoms_min È UN DIZIONARIO <nodo, rettangolo> DOVE rettangolo INDICA IL PIU' PICCOLO RETTANGOLO CHE CONTIENE IL SOTTOALBERO RADICATO A nodo
*/
function selezionaMinimo(){
	atoms_min = {}

	for (var key in atoms){
		atoms[key].sort(function (a, b) {
			return a.x*a.y - b.x*b.y
		})

		atoms_min[key]= atoms[key][0]
	}
	return atoms_min
}

/*
FUNZIONE CHE MODIFICA (O CREA) LA VARIABILE atoms
atoms È UN DIZIONARIO <nodo, lista_rettangoli> DOVE lista_rettangoli È UN INSIEME DI ATOMI PER IL NODO nodo
UN ATOMO È RETTANGOLO CHE NON DOMINA ALTRI RETTANGOLI
UN RETTANGOLO (a,b) DOMINA UN RETTANGOLO (c,d) SE (c,d) PUO' ESSERE DISEGNATO ALL'INTERNO DI (a,b)
*/
function creainsiemiAtomi(tree){
	if (tree==null){
		return 
	}

	if (tree.left==null && tree.right==null){
		atoms[tree.val]=[new Rettangolo(0,0)]
		return
	}

	creainsiemiAtomi(tree.left)
	creainsiemiAtomi(tree.right)
		
	set_vertical = VerticalMerge(tree)
	set_horizontal = HorizontalMerge(tree)


	lst = removeDuplicates(set_vertical.concat(set_horizontal)).sort((a, b) => {
    	return b.x - a.x;
	})


	atoms[tree.val]=lst

	return
}

/*
RITORNA GLI ATOMI OTTENUTI DA COMBINAZIONI ORIZZONTALI DEL NODO tree
*/
function HorizontalMerge(tree){
	_atoms = []
	lastElement = new Rettangolo(Number.MAX_VALUE, Number.MAX_VALUE)

	if (tree.left!=null && tree.right!=null){
		left = atoms[tree.left.val]
		right = atoms[tree.right.val]

		var i=0
		var j=0

		while (i<left.length && j<right.length){
			a = left[i].x
			b = left[i].y

			c = right[j].x
			d = right[j].y


			p = new Rettangolo(a+c+1,
				Math.min(
					Math.max(b+1,d),
					Math.max(b,d+1)
					)
				)

			if (p.x<=lastElement.x && p.y<=lastElement.y){
				_atoms.push(p)
				lastElement.x=p.x
				lastElement.y=p.y
			}

			if(b>=d){
				i=i+1
			}
			else{
				j=j+1
			}
		}
	}

	if (tree.left!=null && tree.right==null){
		left = atoms[tree.left.val]

		var i=0
		while (i<left.length){
			a = left[i].x
			b = left[i].y

			p = new Rettangolo(
				a+1,
				b
			)


			if (p.x<=lastElement.x && p.y<=lastElement.y){
				_atoms.push(p)
				lastElement.x=p.x
				lastElement.y=p.y
			}

			i=i+1
		}

	}

	if (tree.left==null && tree.right!=null){
		right = atoms[tree.right.val]
		var i=0
		while (i<right.length){
			a = right[i].x
			b = right[i].y


			p = new Rettangolo(
				a+1,
				b
			)


			if (p.x<=lastElement.x && p.y<=lastElement.y){
				_atoms.push(p)
				lastElement.x=p.x
				lastElement.y=p.y
			}

			i=i+1
		}	
	}

	return _atoms
}

/*
RITORNA GLI ATOMI OTTENUTI DA COMBINAZIONI VERTICALI DEL NODO tree
*/
function VerticalMerge(tree){
	_atoms = []
	lastElement = new Rettangolo(Number.MAX_VALUE, Number.MAX_VALUE)

	if (tree.left!=null && tree.right!=null){
		left = atoms[tree.left.val]
		right = atoms[tree.right.val]

		var i=0
		var j=0

		while (i<left.length && j<right.length){
			a = left[i].x
			b = left[i].y

			c = right[j].x
			d = right[j].y

			p = new Rettangolo(
				Math.min(
					Math.max(a+1,c),
					Math.max(a, c+1)
					),
				b+d+1
			)

			if (p.x<=lastElement.x && p.y<=lastElement.y){
				_atoms.push(p)
				lastElement.x=p.x
				lastElement.y=p.y
			}

			if(a>=c){
				i=i+1
			}
			else{
				j=j+1
			}
		}
	}

	if (tree.left!=null && tree.right==null){
		left = atoms[tree.left.val]

		var i=0
		while (i<left.length){
			a = left[i].x
			b = left[i].y


			p = new Rettangolo(
				a,
				b+1
			)

			if (p.x<=lastElement.x && p.y<=lastElement.y){
				_atoms.push(p)
				lastElement.x=p.x
				lastElement.y=p.y
			}
			i=i+1
		}
	}

	if (tree.left==null && tree.right!=null){
		right = atoms[tree.right.val]
		var i=0

		while (i<right.length){
			a = right[i].x
			b = right[i].y

			p = new Rettangolo(
				a,
				b+1
			)

			if (p.x<=lastElement.x && p.y<=lastElement.y){
				_atoms.push(p)
				lastElement.x=p.x
				lastElement.y=p.y
			}
			i=i+1
		}
	}

	return _atoms
}

/*
CALCOLA POSIZIONI INTERE DEI NODI RADICATI A tree CON METODO EADES SFRUTTANDO GLI ATOMI DI TREE
*/
function posizionaConEades(tree){
	if (tree==null){
		return
	}
	
	if (tree.left==null && tree.right==null){
		return
	}

	// se hai entrambi i figli
	if (tree.left!=null && tree.right!=null){
		parent = atoms_min[tree.val]
		sx = atoms_min[tree.left.val]
		dx = atoms_min[tree.right.val]


		//se il sinistro si allarga come il genitore allora deve essere posizionato sotto
		if (sx.x == parent.x){
			tree.left.x = tree.x
			tree.left.y = tree.y + parent.y - sx.y

			tree.right.x = tree.x+1
			tree.right.y = tree.y 

			posizionaConEades(tree.left)
			posizionaConEades(tree.right)
			return
		}
		//se il destro si allarga come il genitore allora deve essere posizionato sotto
		if (dx.x == parent.x){
			tree.right.x = tree.x
			tree.right.y = tree.y + parent.y - dx.y

			tree.left.x = tree.x + 1
			tree.left.y = tree.y 

			posizionaConEades(tree.left)
			posizionaConEades(tree.right)
			return
		}


		//se il sinistro scende come il genitore allora deve essere posizionato a destra
		if (sx.y == parent.y){
			tree.left.y = tree.y
			tree.left.x = tree.x + parent.x - sx.x

			tree.right.x = tree.x
			tree.right.y = tree.y + 1

			posizionaConEades(tree.left)
			posizionaConEades(tree.right)
			return
		}

		//se il destro scende come il genitore allora deve essere posizionato a destra
		if (dx.y == parent.y){
			tree.right.y = tree.y
			tree.right.x = tree.x + parent.x - dx.x

			tree.left.x = tree.x
			tree.left.y = tree.y + 1

			posizionaConEades(tree.left)
			posizionaConEades(tree.right)
			return
		}


		//metti il sinistro sotto e il destro a destra
		tree.left.x = tree.x
		tree.left.y = tree.y + parent.y - sx.y

		//se non c'è spazio, bisogna girare quello di destra -> da un 3x2 a un 2x3 per esempio
		if(parent.x==sx.x+dx.x){
			tmp = dx.x
			dx.x = dx.y
			dx.y = tmp

			atoms_min[tree.right.val].x=dx.x
			atoms_min[tree.right.val].y=dx.y

			tree.right.x = tree.x + parent.x - dx.x
			tree.right.y = tree.y

			posizionaConEades(tree.left)
			posizionaConEades(tree.right)
			return
		}

		tree.left.x = tree.x
		tree.left.y = tree.y + parent.y - sx.y

		tree.right.x = tree.x + parent.x - dx.x
		tree.right.y = tree.y

		posizionaConEades(tree.left)
		posizionaConEades(tree.right)
		return
	}

	// se hai solo il figlio sinistro
	if (tree.left!=null && tree.right==null){
		parent = atoms_min[tree.val]
		sx = atoms_min[tree.left.val]

		//se si allarga come il genitore allora deve essere posizionato sotto
		if (sx.x == parent.x){
			tree.left.x = tree.x
			tree.left.y = tree.y + parent.y - sx.y

			posizionaConEades(tree.left)
			return
		}

		//se scende come il genitore allora deve essere posizionato a destra
		if (sx.y == parent.y){
			tree.left.y = tree.y
			tree.left.x = tree.x + parent.x - sx.x

			posizionaConEades(tree.left)
			return
		}

		//metti il sinistro sotto
		tree.left.x = tree.x
		tree.left.y = tree.y + parent.y - sx.y

		posizionaConEades(tree.left)
		return
	}

	// se hai solo il figlio destro
	if (tree.left==null && tree.right!=null){
		parent = atoms_min[tree.val]
		dx = atoms_min[tree.right.val]

		//se si allarga come il genitore allora deve essere posizionato sotto
		if (dx.x == parent.x){
			tree.right.x = tree.x
			tree.right.y = tree.y + parent.y - dx.y

			posizionaConEades(tree.right)
			return
		}

		//se scende come il genitore allora deve essere posizionato a destra
		if (dx.y == parent.y){
			tree.right.y = tree.y
			tree.right.x = tree.x + parent.x - dx.x

			posizionaConEades(tree.right)
			return
		}

		//metti il destro sotto
		tree.right.x = tree.x
		tree.right.y = tree.y + parent.y - dx.y

		posizionaConEades(tree.right)
		return		
	}
}


/*
CALCOLA POSIZIONI INTERE DEI NODI RADICATI A tree CON METODO PROPOSTO DA EADES
*/
function eades(tree){
	listaNodi = inorder(tree)

	lista_nodi.forEach(function (d){
		atoms[d.val]=[]
	});

 	creainsiemiAtomi(tree)
	selezionaMinimo()
	posizionaConEades(tree)
}


/*
DISEGNA L'ALBERO tree
*/
function disegna(tree,tipo){
	lista_nodi = inorder(tree)
	lista_archi = listaArchi(tree)

	var node = svg.append("g")
 		.attr("class", "nodes")
    	.selectAll("g")
    	.data(lista_nodi)
		.enter().append("g")

	var circles = node.append("circle")
		.attr("class", function(d,i){
			return "nodo"+" "+ "nodo"+d.val
		})
		.attr("r", 8)
		.attr("fill", function(d) {
			if (d.peso!=null){
				if (d.peso!=0){
					return interpolateCool(d.peso);
				}
			}
			else{
				return "red"
			} 
		})
        .attr("cx",function(d,i){
        	return scale(d.x+delta_x)
        })
        .attr("cy",function(d,i){
        	return scale(d.y+delta_y)
        })
		.select(function() { return this.parentNode; })
		.append('text')
		.attr('y', function(d,i){
	        return scale(d.y+delta_y)
            })
		.attr('x', function(d,i){
        	return scale(d.x+delta_x)
            })
		.attr("class", 'label')
		.attr("font-weight","bold")
		.text(function(d,i){
				return d.val
		})

	svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 30)
    .attr("markerHeight", 30)
    .attr("markerUnits","userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");

	var link = svg.append("g")
		.attr("class","links")
		.selectAll("g")
		.data(lista_archi)
    	.enter().append("g")
    	.attr('marker-end', function(d,i){
    		if (tipo=='ennario'){
    			return "url(#arrow)"
    		}
    	})
    
	svg.append("svg:defs").append("svg:marker")
	    .attr("id", "arrow")
	    .attr("viewBox", "0 -5 5 10")
	    .attr('refX', +18)
	    .attr("markerWidth", 5)
	    .attr("markerHeight", 5)
	    .attr("orient", "auto")
	  	.append("svg:path")
	    .attr("d", "M0,-5L10,0L0,5");

    
    var lines = link.append("line")
		.attr("class", "linkkk")
		.style("stroke", "black")
      	.attr("stroke-width", 2)
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
        .attr("stroke", "black")

	


    d3.selectAll('.nodes').remove();

    node = svg.append("g")
 		.attr("class", "nodes")
    	.selectAll("g")
    	.data(lista_nodi)
		.enter().append("g")

    circles = node.append("circle")
		.attr("class", function(d,i){
			return "nodo"+" "+ "nodo"+d.val
		})
		.attr("r", 8)
		.attr("fill", function(d) {
			if (d.peso!=null){
				if (d.peso!=0){
					return interpolateCool(d.peso);
				}
				else{
					return "red"
				}			
			}
			else{
				return "red"
			} 
		})
        .attr("cx",function(d,i){
        	return scale(d.x+delta_x)
        })
        .attr("cy",function(d,i){
        	return scale(d.y+delta_y)
        })
		.select(function() { return this.parentNode; })
		.append('text')
		.attr('y', function(d,i){
	        return scale(d.y+delta_y)
            })
		.attr('x', function(d,i){
        	return scale(d.x+delta_x)
            })
		.attr("class", function(d,i){
			if (d.fittizio){
				return "fake"
			}
			else{
				return "label"
			}
		})
		.attr("font-weight","bold")
		.text(function(d,i){
				return d.val
		});

	d3.selectAll('[class^="nodo nodofake"]').remove();
	d3.selectAll('[class^="nodo nodofake"]').remove();
    d3.selectAll('.fake').remove();
}

/*
SERIALIZZA IN JSON UN ALBERO BINARIO
*/
var serialize = function (root) {
  let json = {};
  const rec = (root, obj) => {
    if (!root) return;
    obj.val = root.val;
    obj.peso = root.peso;
    obj.left = {};
    obj.right = {};
    obj.left = rec(root.left, obj.left);
    obj.right = rec(root.right, obj.right);

    return obj;
  };
  json = rec(root, json);
  return JSON.stringify(json);
};

/*
DESERIALIZZA UN ALBERO BINARIO DA JSON
*/
var deserialize = function (data) {
  let json = JSON.parse(data);
  const rec = (obj) => {
    if (!obj) return null;
    const node = new BinaryTree(obj.val);
    node.peso = obj.peso;
    node.left = rec(obj.left);
    node.right = rec(obj.right);
    return node;
  };
  const root = rec(json);
  return root;
};

/*
FUNZIONE PER CARICARE UN FILE JSON ESTERNO
RESTTITUISCE UNA STRINGA (il file)
*/
async function getJSON(treename) {
	if(treename=='data4.json'){
		return fetch(treename)
        .then((response)=>response.json())
        .then((responseJson)=>{
        	return (responseJson)})
	}
	else{
		return fetch(treename)
			.then((response)=>response.json())
	        .then((responseJson)=>{
        	return JSON.stringify(responseJson)});
	} 
}

/*
FUNZIONE MAIN CHE EFFETTUA LE SEGUENTI OPERAZIONI PRINCIPALI
- CARICA FILE JSON E CREA ALBERO
- DISEGNA LINEE GUIDA
- CALCOLA POSIZIONI INTERE DEI NODI
- DISEGNA L'ALBERO
*/
async function main(treename, metodoname) {
	tipo=null

	if(treename=='data4.json'){
		const json = await this.getJSON(treename);
	    tree = parse(json)

	    impostaNumeroNodi(tree)
    	fromNToBinary(tree)
    	tree = fromNtreeClassToBinaryClass(tree)
    	tipo='ennario'
	}
	else{
		const json = await this.getJSON(treename);
	    tree = deserialize(json)
	    tipo='binario'
	}
	impostaProfondita(tree,0)
	impostaNumeroNodi(tree)

    numero_nodi = numeroDiNodi(tree)
	calcolaPosizioni(tree, metodoname)

	massima_componente_altezza_larghezza = Math.max(larghezzaDisegno(tree),altezzaDisegno(tree))
	disegnaLineeGuida()

	/*
	questa scala mappa una posizione intera in una posizione nella tela SVG
	la posizione x=5 è mappata sulla riga verticale 6 - si mantiene un margine a destra e sinistra di una riga
	*/
	scale = d3.scaleLinear().domain([0, massima_componente_altezza_larghezza+2]).range([0, larghezza])

	delta_x = Math.round((massima_componente_altezza_larghezza-larghezzaDisegno(tree)+2)/2)
	delta_y = Math.round((massima_componente_altezza_larghezza-altezzaDisegno(tree)+2)/2)

	if (treename=='data5.json'){
		disegnaScalaColori(minimoPeso(tree), massimoPeso(tree))
	}

	disegna(tree,tipo)
	return tree
}

/*
FUNZIONE DI SUPPORTO PER APERTURA MENU
*/
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/*
FUNZIONE DI SUPPORTO PER CHIUSURA MENU
*/
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

/*
FUNZIONE DI SUPPORTO PER PULIRE LA TELA
CANCELLA NODI, ARCHI E LINEE GUIDA
*/
function pulisciSVG(){
    d3.selectAll('.nodes').remove();
    d3.selectAll('.links').remove();
    d3.selectAll('.lineeguida').remove();
    d3.selectAll('.colormap').remove();
}

/*
FUNZIONE DI SUPPORTO PER CAMBIARE METODO E ALBERO
*/
async function selezionaMetodoEAlbero(){
	pulisciSVG()

	var metodo = null
	var albero = null

	var radioElements = document.getElementsByName("metodo");
	
	for(var i=0; i < radioElements.length; i++)
	{
	    if(radioElements[i].checked) 
	    {
	        metodo=radioElements[i].value;
	        break;
	    }
	}

	var radioElements = document.getElementsByName("tree");
	for(var i=0; i < radioElements.length; i++)
	{
	    if(radioElements[i].checked) 
	    {
	    	albero = radioElements[i].value
	        break;
	    }
	}


    var algoritmo = document.getElementById("algoritmo");
	await main(albero,metodo);

    algoritmo.textContent = "ALGORITMO "+metodo.toUpperCase()+" ("+larghezzaDisegno(tree)+","+altezzaDisegno(tree)+")"
}

/*
***************
N-ARY TREE
***************
*/

/*
CLASSE CHE MODELLA UN NODO DELL'ALBERO BINARIO
*/
class NTree {
	constructor(val, children) {
		this.val = val;
		this.children = new Array();
		this.x = 0
		this.y = 0
		this.peso = 0
		this.profondita = 0
		this.numero_nodi = 0
	   	this.fittizio=false

	}
}

/*
DESERIALIZZA UN ALBERO N-ARIO DA JSON
*/
function parse(input){
   var output = new NTree();
   output.val = input.val;
   output.peso = input.peso
   output.numero_nodi = numeroDiNodi()

   for(var i in input.children){
       output.children.push(
           parse(input.children[i])
       );
   }
   return output;
}

/*
CONVERTE UN ALBERO n-ARIO IN UN ALBERO BINARIO MA CODIFICATO SEMPRE CON OGGETTI DI TIPO NTree
SE IL NODO HA k FIGLI L'ALBERO BINARIO HA LA SEGUENTE SEMANTICA:
- IL FIGLIO sx È IL FIGLIO CON CHE HA RADICATO UN SOTTOALBERO CON PIU NODI
- IL FIGLIO dx È UN NODO FITTIZIO CHE HA COME FIGLI I RESTANTI k-1
*/
function fromNToBinary(tree){
	if (tree==null){
		return null
	}

	if (tree.children.length == 0){
		return null
	}

	if (tree.children.length==1){
		fromNToBinary(tree.children[0])
		return null
	}

	//trova il figlio che ha il sottoalbero piu grande
	figlio_con_max_sottoalbero = tree.children[0]
	for(var i in tree.children){
		if (tree.children[i].numero_nodi>figlio_con_max_sottoalbero.numero_nodi){
			figlio_con_max_sottoalbero=tree.children[i]
		}
   	}

   	//crea nodo fittizio
   	var fittizio=new NTree('fake'+tree.val)

   	//copia tutti i figli - tranne il figlio_con_max_sottoalbero - come figli di fittizio 
   	for(var i in tree.children){
		if (tree.children[i].val != figlio_con_max_sottoalbero.val){
			fittizio.children.push(JSON.parse(JSON.stringify(tree.children[i])))
			fittizio.numero_nodi=fittizio.numero_nodi+tree.children[i].numero_nodi
		}
   	}

   	fittizio.fittizio=true

   	//rimuovi tutti i figli di tree che non sono figlio_con_max_sottoalbero
   	tree.children = tree.children.filter(function(value, index, arr){ 
        return value.val == figlio_con_max_sottoalbero.val;
    });


   	//aggiungi fake ai figli di tree 
   	tree.children.push(fittizio)


   	//itera sui figli
	for(var i in tree.children){
		fromNToBinary(tree.children[i])
   	}

   	return 
}

/*
CONVERTE UN ALBERO BINARIO ESPRESSO CON OGGETTI DI TIPO NTree IN UN ALBERO BINARIO ESPRESSO CON OGGETTI DI TIPO BinaryTree
RITORNA IL BinaryTree
*/
function fromNtreeClassToBinaryClass(tree){
	if(tree==null){
		return null
	}

	var _binaryTree = new BinaryTree(tree.val)
	_binaryTree.numero_nodi = tree.numero_nodi
	_binaryTree.fittizio = tree.fittizio

	if (tree.children.length==0){
		return _binaryTree
	}

	if (tree.children.length==1){
		var left = fromNtreeClassToBinaryClass(tree.children[0])
		_binaryTree.left = left
		return _binaryTree
	}

	if (tree.children.length==2){
		var left = fromNtreeClassToBinaryClass(tree.children[0])
		_binaryTree.left = left

		var right = fromNtreeClassToBinaryClass(tree.children[1])
		_binaryTree.right = right

		return _binaryTree
	}
}



/*
============
LIVELLO 0
===========
*/
body = d3.select("body");
svg = body.select("svg");
larghezza = svg.style("width").replace("px", "")
altezza = svg.style("height").replace("px","")
dict_P = {}
atoms = {}


//avvia la computazione
main('data1.json','Right heavy')






