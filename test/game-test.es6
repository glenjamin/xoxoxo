/* global describe, it */

var assert = require('chai').assert;

var gamelib = require('../client/game.es6');

describe("gamelib", () => {
    describe("winner", () => {
        it("should find a win for 'x'", () => {
            var [game, p] = play(
                [0, 0], [1, 1],
                [0, 1], [1, 2],
                [0, 2]
            );
            assert.operator(gamelib.winner(game), '>', 0);
        });
        it("should find a win for 'o'", () => {
            var [game, p] = play(
                [0, 0], [1, 1],
                [0, 1], [1, 2],
                [2, 2], [1, 0]
            );
            assert.operator(gamelib.winner(game), '>', 0);
        });
    });
});

function play(...moves) {
    var game = gamelib.create();
    var player = gamelib.createPlayer();
    return moves.reduce(
        ([g, p], [x, y]) => gamelib.play(g, x, y, p),
        [game, player]
    );
}
