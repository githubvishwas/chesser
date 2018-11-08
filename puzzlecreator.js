// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  if(recordstart === 0) {
	return true
  }
  console.log("game.game_over: " + game.game_over())
  console.log("game.turn: " + game.turn())
  console.log("piece: " + piece)
  if (game.game_over() === true ||
      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
};
var playNextMove = function() {
	game.move(solArray[numMovesPlayed]);
   board.position(game.fen());
	
	numMovesPlayed += 1;
	if (numMovesPlayed === solArray.length) {
	  alert("Solved!");
	  return;
	}	
}
var onDrop = function(source, target) {
	console.log("source: " + source)
	console.log("target: " + target)
	
  if(recordstart === 0 && solveMode === 0) {
	return true
  }
  console.log("game.fen(): " + game.fen())
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });
  
  // illegal move
  if (move === null) {
		console.log("illegal move!")
		return 'snapback';
	}
	if(solveMode === 1) {
		var lsol = game.history();
		console.log("played1: " + lsol);
		
		var lsolarray = lsol.toString().split(',');
		
		console.log("played: " + lsol[numMovesPlayed]);
		console.log("expected: " + solArray[numMovesPlayed]);
		console.log("move num: " + numMovesPlayed);
		
		if(lsol[numMovesPlayed] != solArray[numMovesPlayed]) {
		
			game.undo();
			return 'snapback';
		}
	}
	
	if (move.promotion){
			 mente();
		if (game.turn() === 'w'){
			  
		     pbh();			      
     }
	     else{ pwh();	      
	 }	 
	 }
	 
  numMovesPlayed++;
	if (numMovesPlayed === solArray.length) {
	  alert("Solved!");
	  return;
	}	
  if(solveMode === 1) {
	  setTimeout(playNextMove,500)
	}
  updateStatus();
};

// update the board position after the piece snap 
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  if(recordstart === 0) {
	return true
  }	
  console.log("game.fen(): " + game.fen())
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
var Hint = function() {
   game.move(solArray[numMovesPlayed]);
   board.position(game.fen());
   setTimeout(undo, 1000);
   
}
var reset = function() {
	window.open(window.location.href,"_self")
}
var SharePuzzle = function() {
	console.log("History: " + game.history())
	startPos = startPos.replace(/ /g,"_");
	var gameUrl = "https://chesser.azurewebsites.net/puzzlecreator.html?fen="+startPos+"&sol="+game.history();
	//var gameUrl = "file:///D:/chess/chesser/chesser/puzzlecreator.html?fen="+startPos+"&sol="+game.history();
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
function record() {
	//console.log("Board pos: " + board.fen());
	recordstart = 1
	if(startPos === "") {
		startPos = board.fen() + " " + "w" + " KQkq - 0 1";
	} 
	console.log("Board pos: " + startPos);
	game = new Chess();
	game.load(startPos);
	board.position(game.fen());
	console.log("game pos: " + game.fen());
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
	if(recordstart === 0 && solveMode === 0) {
		alert("Undo applicable only after record starts")
		return
	}
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

function main() {

	params = getUrlVars();
	if("fen" in params) {
		startPos = params["fen"];
		startPos = startPos.replace(/_/g, " ");
		var x = document.getElementById("userbtns1");
		x.style.display = "none"
		solveMode = 1;
	} else {
		var x = document.getElementById("userbtns2");
		x.style.display = "none"
	}
	
	if("sol" in params) {
		var soln = params["sol"];
		solArray = soln.split(',');
		
	}
	
	board = ChessBoard('board', {
	draggable: true,
	dropOffBoard: 'trash',
	sparePieces: true,
	onDragStart: onDragStart,
	onDrop: onDrop,
	onSnapEnd: onSnapEnd,
	moveSpeed: 'slow', 
});
	if(solveMode === 1) {
		game = new Chess();
		game.load(startPos);
		board.position(game.fen());
	}
	updateStatus();
}
var board
var game
var numMovesPlayed = 0
var solArray = ""
var statusEl = $('#status');
var startPos = ""
var recordstart = 0;
var solveMode = 0;
var meta = document.createElement('meta');
meta.name = "twitter:domain";
meta.content = window.location.href;
document.getElementsByTagName('head')[0].appendChild(meta);

main()