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
  //in pgn viewer we dont want any user movements
   return 0;	
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
	for(var i = istep; i > 0; i--) {
        game.undo();
    }
	
    board.position(game.fen());
    istep = 0;
  });

  // 6. If End button clicked, go to end position
  $('#endPositionBtn5').on('click', function() {
	for(var i = istep; i < solArray.length; i++) {
        game.move(solArray[i]);
    }
	 });
   // 7. just for test
  $('#testbtn').on('click', function() {
	console.log("move_score_array: ", move_score_array)
  });
  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
			var reader = new FileReader();
			reader.onload = function(e) {
			pgnText = reader.result;
			game.load_pgn(pgnText);
			board.position(game.fen())
			  
			var lsol = game.history();
		
			solArray = lsol.toString().split(',');
			istep = solArray.length;
			move_score_array = new Array(istep);
			for(var j = 0; j< istep;j++) {
				move_score_array[j] = 999
			}
			create_table();
			AnalyzePGN();
			console.log("move_score_array: ",move_score_array);
			console.log("solArray: ", solArray)
			  //statusEl.html(pgnText);
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

function create_table()
    {
       

		var myTable= "<table><tr><td style='width: 100px; color: red;'>White move</td>";
		myTable+= "<td style='width: 100px; color: red; text-align: right;'>CP eval</td>";
		myTable+="<td style='width: 100px; color: red; text-align: right;'>Black move</td>";
		myTable+="<td style='width: 100px; color: red; text-align: right;'>CP eval</td></tr>";

		myTable+="<tr><td style='width: 100px;                   '>---------------</td>";
		myTable+="<td     style='width: 100px; text-align: right;'>---------------</td>";
		myTable+="<td     style='width: 100px; text-align: right;'>---------------</td>";
		myTable+="<td     style='width: 100px; text-align: right;'>---------------</td></tr>";
		
		var num_rows = Math.floor(solArray.length/2);
		var remainder = solArray.length % 2;
		if(remainder !== 0) {
			num_rows++;
		}
		var cntr = 0
	    for (var i=0; i<num_rows; i++) {
		  myTable+="<tr id=i.toString()><td id=cntr.toString() style='width: 100px;text-align: right;'>" + solArray[cntr] + "</td>";
		  cntr++
		  myTable+="<td id=cntr.toString() style='width: 100px; text-align: right;'>0.0</td>";
		  var move = ""
		  if(cntr < solArray.length) {
			move = solArray[cntr]
		  }
		  myTable+="<td id=cntr.toString() style='width: 100px; text-align: right;'>" + move + "</td>";
		  myTable+="<td id=cntr.toString() style='width: 100px; text-align: right;'>0.0</td></tr>";
		  cntr++
	    }  
	   myTable+="</table>";
	   document.getElementById('tablePrint').innerHTML = myTable;
	    //var Row = document.getElementById(0);
		//var Cells = Row.getElementById(0);
		//alert(Cells[0].innerText);
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

//Stockfish code below

function error(str)
{
	str = str || "Unknown error";
	
	alert("An error occured.\n" + str);
	throw new Error(str);
}

function load_engine()
{
	var worker = new Worker("js/stockfish6.js"),
		engine = {started: Date.now()},
		que = [];
	
	function get_first_word(line)
	{
		var space_index = line.indexOf(" ");
		
		/// If there are no spaces, send the whole line.
		if (space_index === -1) {
			return line;
		}
		return line.substr(0, space_index);
	}
	
	function determine_que_num(line, que)
	{
		var cmd_type,
			first_word = get_first_word(line),
			cmd_first_word,
			i,
			len;
		
		if (first_word === "uciok" || first_word === "option") {
			cmd_type = "uci"
		} else if (first_word === "readyok") {
			cmd_type = "isready";
		} else if (first_word === "bestmove" || first_word === "info") {
			cmd_type = "go";
		} else {
			/// eval and d are more difficult.
			cmd_type = "other";
		}
		
		len = que.length;
		
		for (i = 0; i < len; i += 1) {
			cmd_first_word = get_first_word(que[i].cmd);
			if (cmd_first_word === cmd_type || (cmd_type === "other" && (cmd_first_word === "d" || cmd_first_word === "eval"))) {
				return i;
			}
		}
		
		/// Not sure; just go with the first one.
		return 0;
	}
	
	worker.onmessage = function (e)
	{
		var line = e.data,
			done,
			que_num = 0,
			my_que;
		
		/// Stream everything to this, even invalid lines.
		if (engine.stream) {
			engine.stream(line);
		}
		
		/// Ignore invalid setoption commands since valid ones do not repond.
		if (line.substr(0, 14) === "No such option") {
			return;
		}
		
		que_num = determine_que_num(line, que);
		
		my_que = que[que_num];
		
		if (!my_que) {
			return;
		}
		
		if (my_que.stream) {
			my_que.stream(line);
		}
		
		if (typeof my_que.message === "undefined") {
			my_que.message = "";
		} else if (my_que.message !== "") {
			my_que.message += "\n";
		}
		
		my_que.message += line;
		
		/// Try to determine if the stream is done.
		if (line === "uciok") {
			/// uci
			done = true;
			engine.loaded = true;
		} else if (line === "readyok") {
			/// isready
			done = true;
			engine.ready = true;
		} else if (line.substr(0, 8) === "bestmove") {
			/// go [...]
			done = true;
			/// All "go" needs is the last line (use stream to get more)
			my_que.message = line;
		} else if (my_que.cmd === "d" && line.substr(0, 15) === "Legal uci moves") {
			done = true;
		} else if (my_que.cmd === "eval" && /Total Evaluation[\s\S]+\n$/.test(my_que.message)) {
			done = true;
		} else if (line.substr(0, 15) === "Unknown command") {
			done = true;
		}
		///NOTE: Stockfish.js does not support the "debug" or "register" commands.
		///TODO: Add support for "perft", "bench", and "key" commands.
		///TODO: Get welcome message so that it does not get caught with other messages.
		///TODO: Prevent (or handle) multiple messages from different commands
		///      E.g., "go depth 20" followed later by "uci"
		
		if (done) {
			if (my_que.cb && !my_que.discard) {
				my_que.cb(my_que.message);
			}
			
			/// Remove this from the que.
			//G.array_remove(que, que_num);
		}
	};
	
	engine.send = function send(cmd, cb, stream)
	{
		cmd = String(cmd).trim();
		
		/// Can't quit. This is a browser.
		///TODO: Destroy the engine.
		if (cmd === "quit") {
			return;
		}
		
		if (debugging) {
			//console.log("1: " + cmd);
		}
		
		/// Only add a que for commands that always print.
		///NOTE: setoption may or may not print a statement.
		if (cmd !== "ucinewgame" && cmd !== "flip" && cmd !== "stop" && cmd !== "ponderhit" && cmd.substr(0, 8) !== "position"  && cmd.substr(0, 9) !== "setoption") {
			que[que.length] = {
				cmd: cmd,
				cb: cb,
				stream: stream
			};
		}
		worker.postMessage(cmd);
	};
	
	engine.stop_moves = function stop_moves()
	{
		var i,
			len = que.length;
		
		for (i = 0; i < len; i += 1) {
			if (debugging) {
				console.log(i, get_first_word(que[i].cmd))
			}
			/// We found a move that has not been stopped yet.
			if (get_first_word(que[i].cmd) === "go" && !que[i].discard) {
				engine.send("stop");
				que[i].discard = true;
			}
		}
	}
	
	engine.get_cue_len = function get_cue_len()
	{
		return que.length;
	}
	
	return engine;
}
function printOutPut() 
{
	
	console.log("=====Calculation done!=====");
	console.log("move_score_array: ",move_score_array);
	console.log("solArray: ", solArray)
	board.position(game.fen());
    istep = solArray.length;
}
function AnalyzePGN()
{
	console.log("Init Analyze")	
	if (typeof Worker === "undefined") {
		return alert("Sorry, analyzer does not support this browser.");
	}
	
	for(var i = istep; i > 0; i--) {
        game.undo();
    }
	
    board.position(game.fen());
    istep = 0;
	evaler = load_engine();
	evaler.send("uci");
	evaler.send("ucinewgame");
	for(var i = istep; i < solArray.length; i++) {
        game.move(solArray[i]);
		//console.log("Evaluating fen " + game.fen())
		evaler.send("position fen " + game.fen());
		//evaler.send("go movetime 1000");
		evaler.send("go movetime 1000", function ongo(str,i)
		{
			console.log("Calculating")
			console.log("Move " + i + " score: " + move_score)	
			move_score_array[i] = move_score	
			var matches = str.match(/^bestmove\s(\S+)(?:\sponder\s(\S+))?/);
			
			evaler.busy = false;
			//move_score_array.push(move_score);
			if(i + 1 == solArray.length) {
				printOutPut();
			}			
			//G.events.trigger("evaled", {ply: ply});
		}, function stream(str)
		{
			//console.log("str: ", str)
			var matches = str.match(/depth (\d+) .*score (cp|mate) ([-\d]+) .*pv (.+)/),
				score,
				type,
				depth,
				pv,
				data;
			 if (matches) {
					depth = Number(matches[1]);
					type = matches[2];
					score = Number(matches[3]);
					pv = matches[4].split(" ");
					move_score = score;
					//console.log("Depth: ", depth)	
					//console.log("type: ", type)	
					//console.log("score: ", score)	
					//console.log("pv: ", pv)	
			} else {
				statusEl.html("Score: No matches");	
			}			
			
		});
    }
    
    
	
	
	
}
var board
var game = new Chess()
var statusEl = $('#pgn5');
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
var layout = {};
var evaler;
var debugging = true;
var move_score = 0.0;
var move_score_array = []
document.getElementById('files').addEventListener('change', handleFileSelect, false);
main()