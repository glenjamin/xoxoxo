var _ = require('lodash');

exports.create = function create() {
    return _.times(9).map( () => 0 );
}
exports.createPlayer = function createPlayer() {
    return 1;
}

exports.play = function play(game, x, y, p) {
    var nextGame = game.slice();
    nextGame[3 * y + x] = p;
    var nextPlayer = (p * -1) + (p < 0 ? 1 : 0);
    return [nextGame, nextPlayer];
}

exports.symbol = symbol;
function symbol(i) {
    if (i > 0) return 'x';
    if (i < 0) return 'o';
    return '.';
}

exports.pretty = function pretty(game) {
    return game.slice(0, 3).map(symbol).join("") + "\n" +
        game.slice(3, 6).map(symbol).join("") + "\n" +
        game.slice(6, 9).map(symbol).join("") + "\n";
}

var winners = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [3, 4, 6]             // diagonals
];
exports.winner = function winner(game) {
    var winner;
    winners.forEach(function(idxs) {
        if (idxs.every(i => game[i] > 0)) {
            winner = Math.max(...idxs);
            return false;
        }
        if (idxs.every(i => game[i] < 0)) {
            winner = Math.min(...idxs);
            return false;
        }
    });
    if (!winner && _.all(game)) {
        return "draw";
    }
    return winner;
}
