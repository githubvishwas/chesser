// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};

var onDrop = function(source, target) {

	
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) {
		return 'snapback';
	}
	if (move.promotion){
			 mente();
		if (game.turn() === 'w'){
			  
		     pbh();			      
     }
	     else{ pwh();	      
	 }	 
	 }
  updateStatus();
};

// update the board position after the piece snap 
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
};

var updateStatus = function() {
  return 0	
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (game.in_draw() === true) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
	if(g_orientation.toUpperCase() != moveColor.toUpperCase()) {
		status = "Click on send move button"
	} else {
		status = moveColor + ' to move';
	}

    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }

  statusEl.html(status);

};
var reset = function() {
	window.open(window.location.href,"_self")
}
var SharePuzzle = function() {
	var gameUrl = "https://chesser.azurewebsites.net/?fen="+orgStartPos;
	//var gameUrl = "file:///D:/chess/githubvishwas.github.io/justplaychess.html?fen="+orgStartPos+"&source="+glb_source+"&target="+glb_target;
	
	//var sendlink  = "https://wa.me/?text="+encodeURIComponent(gameUrl)
	
	//prompt("Share the link below and challenge your friend!", encodeURIComponent(gameUrl))
	prompt("Share the link below and challenge your friend!", gameUrl)
	//alert(sendlink)
	//window.open(sendlink)
	//window.open(gameUrl)
}
var sendmove = function() {
	var gameUrl = "http://githubvishwas.github.io/justplaychess.html?fen="+orgStartPos+"&source="+glb_source+"&target="+glb_target;
	//var gameUrl = "file:///D:/chess/githubvishwas.github.io/justplaychess.html?fen="+orgStartPos+"&source="+glb_source+"&target="+glb_target;
	
	var sendlink  = "https://wa.me/?text="+encodeURIComponent(gameUrl)
	//alert(sendlink)
	window.open(sendlink)
	//window.open(gameUrl)
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
		console.log(key + ": " + value);
    });
    return vars;
}
function getShortLink(url) {

    // Bit.ly API
    BitlyCB.shortenResponse = function(data) {
            var sss = '';
            var first_result;
            // Results are keyed by longUrl, so we need to grab the first one.
            for     (var r in data.results) {
                    first_result = data.results[r]; break;
            }
            sss = first_result["shortUrl"].toString();
            document.getElementById("qlink").value = sss;
    }
    BitlyClient.shorten(window.location, 'BitlyCB.shortenResponse');

}
function reina() { 
    document.getElementById("promote").value = 'q'; // carga la reina en el select "promote"
	promo();
	updateStatus();
}
function torre() { 
    document.getElementById("promote").value = 'r';  // carga la torre en el select "promote"
	promo();
	updateStatus();
}
function alfil() { 
    document.getElementById("promote").value = 'b'; // carga el alfil en el select "promote"
	promo();
	updateStatus();
}
function caballo() {
    document.getElementById("promote").value = 'n';  // carga el caballo en el select "promote"
	promo();
	updateStatus();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////

function pwh() {
   	     document.getElementById('promo_blancas').style.display = "none"; // muestra las piesas blamcas de la corona
}
///////////////////////////////////////////////////////////////////////////////////////////////////////	
function pbh(){ 
		 document.getElementById('promo_negras').style.display = "none";  // muestra las piesas negras de la corona
		 //document.getElementById(id).style.display = "none";			
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
function pws() {
   	     document.getElementById('promo_blancas').style.display = "";  //oculta la piesas blamcas de la corona
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
function pbs() {
   	     document.getElementById('promo_negras').style.display = "";   //oculta la piesas negras de la corona 
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function kw3(){   //solo muestra la popu  
	 $("#coronar .start button").on('click', function(){ $("#coronar").hide();  });	 	 
     $("#coronar").show();
	 	  	
  } 
 function promo(){
		nu = a.pop();
		tp = nu.length;
		if (tp === 7){
			ab = nu.substring(2, nu.length -3); //= h8
			cd = nu.substring(0, nu.length -6); //= g
			ef = nu.substring(3, nu.length -3);// =8
			
			if(game.turn() === 'w'){res = ef - 1;}else{res = parseInt(ef) +parseInt(1); }                             
			 
			a_from = cd + res;
			b_to = ab;
			c_promotion = document.getElementById('promote').value;			 
			}else{if (tp === 5){
			ab = nu.substring(0, nu.length -3); //= g8
			cd = nu.substring(0, nu.length -4); //= g
			ef = nu.substring(1, nu.length -3);// =8
						                                  
			if(game.turn() === 'w'){res = ef - 1;}else{res = parseInt(ef) +parseInt(1); }
			 
			a_from = cd + res;
			b_to = ab;
			c_promotion = document.getElementById('promote').value;			 
			}else{if (tp === 6){
			ab = nu.substring(2, nu.length -2); //= h8
			cd = nu.substring(0, nu.length -5); //= g
			ef = nu.substring(3, nu.length -2);// =8
						                                  
			if(game.turn() === 'w'){res = ef - 1;}else{res = parseInt(ef) +parseInt(1); }
			 
			a_from = cd + res;
			b_to = ab;
			c_promotion = document.getElementById('promote').value;			 
			}else{if (tp === 4){
			ab = nu.substring(0, nu.length -2); //= f8
			cd = nu.substring(0, nu.length -3); //= g
			ef = nu.substring(1, nu.length -2);// =8
						                                  
			if(game.turn() === 'w'){res = ef - 1;}else{res = parseInt(ef) +parseInt(1); }
			 
			a_from = cd + res;
			b_to = ab;
			c_promotion = document.getElementById('promote').value;			 
			}}}}				
		    a = game.move({from:a_from, to:b_to, promotion:c_promotion} );		
		    board.position(game.fen());			
			$("#coronar").hide();
		    pws(); 
		    pbs();			
			//c1.innerHTML = a;
		    //c2.innerHTML = ng;
	} 
	function mente(){ 
	a = game.history()
	game.undo();
	kw3();		
}
function playSolution() {
	for(var i = istep; i < solArray.length; i++) {
        game.move(solArray[i]);
		board.position(game.fen());
    }
    
    
    istep = solArray.length;
}
function undo() {
	game.undo();
	board.position(game.fen());
}
// 3. If Next button clicked, move forward one
$('#nextBtn5').on('click', function() {
	
    game.move(solArray[istep]);
    board.position(game.fen());
	
    istep += 1;
    if (istep > solArray.length) {
      istep = solArray.length;
    }
  });
  // 4. If Prev button clicked, move backward one
  $('#prevBtn5').on('click', function() {
    game.undo();
    board.position(game.fen());
    istep -= 1;
    if (istep < 0) {
      istep = 0;
    }
  });
  // 5. If Start button clicked, go to start position
  $('#startPositionBtn5').on('click', function() {
    reset()
    istep = 0;
  });

  // 6. If End button clicked, go to end position
  $('#endPositionBtn5').on('click', function() {
	for(var i = istep; i < solArray.length; i++) {
        game.move(solArray[i]);
    }
    
    board.position(game.fen());
    istep = solArray.length;
  });
  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
			var reader = new FileReader();
			reader.onload = function(e) {
			  pgnText = reader.result;
			  statusEl.html(pgnText);
			}
	reader.readAsText(f);

    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  
function main() {
	
	var cfg = {
	  draggable: true,
	  onDragStart: onDragStart,
	  onDrop: onDrop,
	  onSnapEnd: onSnapEnd,
	  moveSpeed: 'slow', 
	  position: 'start',
	  orientation: g_orientation
	};
	
	board = ChessBoard('board', cfg);
	board.position(game.fen());

	updateStatus();
}
var board
var game = new Chess()
var statusEl = $('#status');
var startPos = ""
var solpgn = ""
var solArray = ""
var fenArray = ""
var glb_source = ""
var glb_target = ""
var orgStartPos = ""
var lastplay = ""
var toplay = ""
var g_orientation = ""
var istep = 0;
var pgnText = ""
document.getElementById('files').addEventListener('change', handleFileSelect, false);
main()