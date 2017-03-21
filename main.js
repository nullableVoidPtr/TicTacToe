/*
 ______
|      |
|  \/  |
|  /\  |
|______|

 ______
|  __  |
| |  | |
| |__| |
|______|
*/

// Contains a table of the X and O ascii values
valueArr = {};
valueArr.x = ["______", "      ", "  \\\/  ", "  \/\\  ", "______"];
valueArr.o = ["______", "  __  ", " |  | ", " |__| ", "______"];

active = {};
active.symbol = 'x';
active.toggle = function () {
	if (this.symbol.toLowerCase() == 'x')
		this.symbol = 'o';
	else if (this.symbol.toLowerCase() == 'o')
		this.symbol = 'x';
};

onload = function () {
	//Document Load Trigger
	for (var a = 0; a < 1; a++) {
		for (var z = 0; z < 1; z++) {
			for (var y = 0; y < 3; y++) {
				for (var x = 0; x < 3; x++) {
					for (var i = 1, buttons = document.getElementsByClassName("boardButton" + a + "_" + z + "_" + y + "_" + x); i < 4; i++) {
						buttons[i].addEventListener("click", function(){updateInner(this.className.charAt(17), this.className.charAt(15), this.className.charAt(13), this.className.charAt(11), active.symbol); active.toggle(); updateWinner(this.className.charAt(13), this.className.charAt(11));});
					}
				}
			}
		}
	}
};

/*
 * function updateInner
 * x - The x location of the box
 * y - The y location of the box
 * z - The z location of the box
 * a - The a location of the box
 * value - The value to change the box to: 'x', 'X', 'o', 'O'
 */
function updateInner(x, y, z, a, value) {
	if (!(value.toLowerCase() == 'x' || value.toLowerCase() == 'o'))
		return false;
	for (i = 1, buttons = document.getElementsByClassName("boardButton" + a + "_" + z + "_" + y + "_" + x); i < 4; i++) {
		buttons[i].innerHTML = valueArr[value.toLowerCase()][i];
		game.board[z][a].data.locations[x][y] = value.toLowerCase();
	}
}

/*
 * function updateWinner
 * z - The z location of the board
 * a - The a location of the board
 */
function updateWinner(z, a) {
	var board = game.board[z][a].data.locations, win = '';
	if (board[0][0].toLowerCase() != '') {
		if (
			board[0][0].toLowerCase() == board[0][1].toLowerCase() == board[0][2].toLowerCase() ||
			board[0][0].toLowerCase() == board[1][1].toLowerCase() == board[2][2].toLowerCase() ||
			board[0][0].toLowerCase() == board[1][0].toLowerCase() == board[2][0].toLowerCase()
		) {
			win = board[0][0].toLowerCase();
		}
	} if (board[1][0].toLowerCase() != '') {
		if (
			board[1][0].toLowerCase() == board[1][1].toLowerCase() == board[1][2].toLowerCase()
		) {
			win = board[1][0].toLowerCase();
		}
	} if (board[2][0].toLowerCase() != '') {
		if (
			board[2][0].toLowerCase() == board[1][1].toLowerCase() == board[0][2].toLowerCase() ||
			board[2][0].toLowerCase() == board[2][1].toLowerCase() == board[2][2].toLowerCase()
		) {
			win = board[2][0].toLowerCase();
		}
	} if (board[2][1].toLowerCase() != '') {
		if (
			board[2][1].toLowerCase() == board[1][1].toLowerCase() == board[0][1].toLowerCase()
		) {
			win = board[2][1].toLowerCase();
		}
	} if (board[2][2].toLowerCase() != '') {
		if (
			board[2][2].toLowerCase() == board[1][2].toLowerCase() == board[0][2].toLowerCase()
		) {
			win = board[2][2].toLowerCase();
		}
	}
	game.board[z][a].data.winner = win;
}

/*
 * Contains all data for the game
 */
game = {};
game.board = {};
for (var z = 0; z < 1; z++) {
	game.board[z] = {};
	for (var a = 0; a < 1; a++) {
		game.board[z][a] = {};
		game.board[z][a].data = {};
		game.board[z][a].data.locations = {};
		for (var x = 0; x < 3; x++) {
			game.board[z][a].data.locations[x] = {};
			for (var y = 0; y < 3; y++) {
				game.board[z][a].data.locations[x][y] = "";
			}
		}
		game.board[z][a].data.winner = "";
	}
}
