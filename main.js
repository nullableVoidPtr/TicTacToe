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

onload = function () {
	//Document Load Trigger
	
	//Create Board
	for (var a = 0; a < game.height; a++) {
		var row = document.createElement("tr");
		for (var z = 0; z < game.width; z++) {
			var cell = document.createElement("td");
			row.appendChild(cell);
			var board = document.createElement("table");
			cell.appendChild(board);
			for (var i = 0; i < 3; i++) {
				var boardRow = document.createElement("tr");
				board.appendChild(boardRow);
				for (var j = 0; j < 3; j++) {
					var boardCell = document.createElement("td");
					boardCell.classList.add("button");
					boardRow.appendChild(boardCell);
				}
			}
		}
		document.getElementById("board").appendChild(row);
	}
	
	//Load eventListener
	[...document.querySelectorAll('td.button')].map(x => x.addEventListener("click", buttonOnClick));
	
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
	document.querySelector(`table > tr:nth-child(${a + 1}) > td:nth-child(${z + 1}) > table tr:nth-child(${y + 1}) > td.button:nth-child(${x + 1})`).innerText = value.toLowerCase();
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
		document.querySelector(`table#board > tr:nth-child(${a + 1}) > td:nth-child(${z + 1})`).innerHTML = win;
		document.querySelector(`table#board > tr:nth-child(${a + 1}) > td:nth-child(${z + 1})`).setAttribute("data-winner", win);
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
	if (!!game.winner) return;
	var board = game.board;
	if (!!(game.winner = findWinnerEntire(game.board)))
		alert("Player " + (game.winner == 'x' ? 1 : (game.winner == 'o' ? 2 : 'ERR')) + " has won the game!");
}

/*
 * void updateColourEntire()
 */
function updateColourEntire() {
	if (game.active.board.wildcard) {	
		[...document.querySelectorAll('table tr td table')].map(e => e.classList.add("active"));
	} else {
		[...document.querySelectorAll('table tr td table')].map(e => e.classList.remove("active"));
		document.querySelector(`table#board > tr:nth-child(${game.active.board.y + 1}) > td:nth-child(${game.active.board.x + 1}) > table`).classList.add("active");
	}
}

/*
 * void buttonOnClick(e)
 * e - The span element this is executed from ('this')
 */
function buttonOnClick(e) {
	var entireX = e.target.parentElement.parentElement.parentElement.cellIndex, entireY = e.target.parentElement.parentElement.parentElement.parentElement.rowIndex,
		innerX = e.target.cellIndex, innerY = e.target.parentElement.rowIndex;
	if (!(game.active.board.x == entireX && game.active.board.y == entireY) && !game.active.board.wildcard)
		return false;
	var changed = updateInner(innerX, innerY, entireX, entireY, game.active.symbol);
	game.active.toggle();
	if (updateWinnerInner(entireX, entireY)) updateWinnerEntire();
	if (changed) updateActive(innerX, innerY);
	updateColourEntire();
}
