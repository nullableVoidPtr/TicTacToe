/*
 * MAIN.JS
 * 
 * Javascript functions and executable code for 'Ultimate Tic Tac Toe'.
 * See www.github.com/met4000/TicTacToe for development of this.
 * 
 */

/*
 * Contains all data for the game
 */
game = {
	version: "1.2.1",
	winner: "",
	width: 3,
	height: 3,
};
game.board = Array.from(Array(game.width), () =>
	Array.from(Array(game.height), () => 
		({
			data: {
				locations: Array.from(Array(3), () => Array.from(Array(3), () => "")),
				winner: "",
			},
		})
	)
);
game.active = {
	symbol: 'x',
	board: {
		wildcard: false,
		x: Math.floor(game.width / 2),
		y: Math.floor(game.height / 2),
	},
	toggle: () => {
		if (game.active.symbol.toLowerCase() == 'x')
			game.active.symbol = 'o';
		else if (game.active.symbol.toLowerCase() == 'o')
			game.active.symbol = 'x';
	},
};

// Contains a table of the X and O ascii values
valueArr = {
	x: ["______", "      ", "  \\\/  ", "  \/\\  ", "______"],
	o: ["______", "  __  ", " |  | ", " |__| ", "______"]
};

onload = function () {
	//Document Load Trigger
	
	//Create Board
	for (var a = 0; a < game.height; a++) {
		for (var z = 0; z < game.width; z++) {
			var board = document.createElement("div");
			board.className = `board`;
			console.log(z, a)
			board.setAttribute("data-x", z);
			board.setAttribute("data-y", a);
			document.getElementById("board").appendChild(board);
			for (var i = 0; i < 3; i++) {
				var button = document.createElement("span");
				button.className = "boardButton";
				button.setAttribute("data-x", i);
				button.setAttribute("data-y", 0);
				button.innerText = "______"
				board.appendChild(button);
				board.innerHTML += (i != 2) ? "_" : "<br>";
			}

			for (var o = 0; o < 3; o++) {
				for (var i = 0; i < 3; i++) {
					board.innerHTML += '|';
					for (var n = 0; n < 3; n++) {
						var button = document.createElement("span");
						button.className = "boardButton";
						button.setAttribute("data-x", n);
						button.setAttribute("data-y", o);
						button.innerText = "      ";
						board.appendChild(button);
						board.innerHTML += "|";
					}
					board.innerHTML += '<br>';
				}
				board.innerHTML += '|';
				for (var n = 0; n < 3; n++) {
					var button = document.createElement("span");
					button.className = "boardButton";
					button.setAttribute("data-x", n);
					button.setAttribute("data-y", (o > 1 ? 2 : o + 1));
					button.innerText = "______";
					board.appendChild(button);
					board.innerHTML += "|";
				}
				board.innerHTML += '<br>';
			}
		}
		document.getElementById("board").innerHTML += "<br>";
	}
	
	//Load eventListener
	[...document.querySelectorAll('.boardButton')].map(x => x.addEventListener("click", buttonOnClick));
	
	//Update active board colour
	updateColourEntire();
	
	//Add version tag
	document.getElementById("version").innerHTML = "v" + game.version;
};

/*
 * void updateInner(x, y, z, a, value)
 * x - The x location of the box
 * y - The y location of the box
 * z - The z location of the box
 * a - The a location of the box
 * value - The value to change the box to: 'x', 'X', 'o', 'O'
 */
function updateInner(x, y, z, a, value) {
	if (!!game.board[z][a].data.winner)
		return false;
	if (!(game.active.board.x == z && game.active.board.y == a) && !game.active.board.wildcard)
		return false;
	if (!(value.toLowerCase() == 'x' || value.toLowerCase() == 'o'))
		return false;
	if (game.board[z][a].data.locations[x][y] != '')
		return false;
	
	game.board[z][a].data.locations[x][y] = value.toLowerCase();
	[...document.querySelectorAll(`.board[data-x="${z}"][data-y="${a}"] .boardButton[data-x="${x}"][data-y="${y}"]`)].map((button, i) =>
		button.innerHTML = valueArr[value.toLowerCase()][i]
	);
	return true;
}

/*
 * void updateActive
 */
function updateActive(x, y) {
	game.active.board = {
		x: x,
		y: y,
		wildcard: !!game.board[x][y].data.winner,
	};
}

/*
 * bool same(...a)
 * return - If all the values are identical
 * 
 * NB: Values are converted to lowercase before being compared
 */
function same(...a) {
	return a.every((current, i, array) => current.toLowerCase() === array[0].toLowerCase()) && !!a[0];
}

/*
 * String findWinnerInner(board)
 * board - The board
 */
function findWinnerInner(board) {
	
	for (let i = 0; i < 3; i++) {
		//Vertical
		if (same(board[i][0], board[i][1], board[i][2]))
			return board[i][0].toLowerCase();
	
		//Horizontal
		if (same(board[0][i], board[1][i], board[2][i]))
			return board[0][i].toLowerCase();
	}
	//Diagonal
	if (same(board[0][0], board[1][1], board[2][2]))
		return board[0][0].toLowerCase();
	if (same(board[2][0], board[1][1], board[0][2]))
		return board[2][0].toLowerCase();
	return "";
}

/*
 * void updateWinner(z, a)
 * z - The z location of the board
 * a - The a location of the board
 */
function updateWinnerInner(z, a) {
	if (!!game.board[z][a].data.winner)
		return false;
	
	var board = game.board[z][a].data.locations;
	
	var win = game.board[z][a].data.winner = findWinnerInner(board);
	if (!!win) {
		if (win == "x") {
			document.querySelector(`.board[data-x="${z}"][data-y="${a}"]`).innerHTML = "____________________<br>|                    |<br>|     \\        /     |<br>|      \\      /      |<br>|       \\    /       |<br>|        \\  /        |<br>|         \\/         |<br>|         /\\         |<br>|        /  \\        |<br>|       /    \\       |<br>|      /      \\      |<br>|     /        \\     |<br>|____________________|";
		} else if (win == "o") {
			document.querySelector(`.board[data-x="${z}"][data-y="${a}"]`).innerHTML = "____________________<br>|    ____________    |<br>|   |            |   |<br>|   |            |   |<br>|   |            |   |<br>|   |            |   |<br>|   |            |   |<br>|   |            |   |<br>|   |            |   |<br>|   |            |   |<br>|   |            |   |<br>|   |____________|   |<br>|____________________|";
		}
		document.querySelector(`.board[data-x="${z}"][data-y="${a}"]`).setAttribute("data-winner", win);
		return true;
	}
	return false;
}

/*
 * String findWinnerEntire(board)
 * board - The board
 */
function findWinnerEntire(board) {
	
	for (var i = 0; i < 3; i++) {
		//Vertical
		if (same(board[i][0].data.winner, board[i][1].data.winner, board[i][2].data.winner))
			return board[i][0].data.winner.toLowerCase();
	
		//Horizontal
		if (same(board[0][i].data.winner, board[1][i].data.winner, board[2][i].data.winner))
			return board[0][i].data.winner.toLowerCase();
	}
	//Diagonal
	if (same(board[0][0].data.winner, board[1][1].data.winner, board[2][2].data.winner))
		return board[0][0].data.winner.toLowerCase();
	if (same(board[2][0].data.winner, board[1][1].data.winner, board[0][2].data.winner))
		return board[2][0].data.winner.toLowerCase();
	return "";
}

/*
 * void updateWinnerEntire()
 */
function updateWinnerEntire() {
	if (!!game.winner)
	var board = game.board;
	game.winner = findWinnerEntire(game.board);
	if (!!game.winner)
		alert("Player " + (game.winner == 'x' ? 1 : (game.winner == 'o' ? 2 : 'ERR')) + " has won the game!");
}

/*
 * void updateColourEntire()
 */
function updateColourEntire() {
	if (game.active.board.wildcard) {	
		[...document.querySelectorAll('.board')].map(e => e.classList.add("active"));
	} else {
		[...document.querySelectorAll('.board')].map(e => e.classList.remove("active"));
		document.querySelector(`.board[data-x="${game.active.board.x}"][data-y="${game.active.board.y}"]`).classList.add("active");
	}
}

/*
 * void buttonOnClick(e)
 * e - The span element this is executed from ('this')
 */
function buttonOnClick(e) {
	var entireX = e.target.parentElement.getAttribute("data-x"), entireY = e.target.parentElement.getAttribute("data-y"),
		innerX = e.target.getAttribute("data-x"), innerY = e.target.getAttribute("data-y");
	if (!(game.active.board.x == entireX && game.active.board.y == entireY) && !game.active.board.wildcard)
		return false;
	var changed = updateInner(innerX, innerY, entireX, entireY, game.active.symbol);
	game.active.toggle();
	if (updateWinnerInner(entireX, entireY)) updateWinnerEntire();
	if (changed) updateActive(innerX, innerY);
	updateColourEntire();
}
