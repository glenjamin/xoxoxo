/* jshint browser: true */

var React = require('react');

var _ = require('lodash');

var p = 1;
var game = {
    winner: 0,
    cells: Array(9)
};
function toggleCell(x, y) {
    game.cells[y * 3 + x] = p;
    checkWinner(game);
    p *= -1;
    render();
}
var winners = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [3, 4, 6]             // diagonals
];
function checkWinner(game) {
    if (game.winner) return;
    var g = game.cells;
    winners.forEach(([a, b, c]) => {
        if (g[a] == g[b] && g[b] == g[c] && g[a]) {
            game.winner = g[a];
            return false;
        }
    });
}
function symbol(i) {
    if (i > 0) return 'x';
    if (i < 0) return 'o';
    return '.';
}

var App = React.createClass({
    render() {
        if (this.props.game.winner) {
            return <p>{symbol(this.props.game.winner)} wins.</p>;
        }
        return <Game cells={this.props.game.cells} />;
    }
});

var Game = React.createClass({
    cellStyle: {
        display: 'inline-block',
        width: '50px',
        height: '50px',
        lineHeight: '50px',
        textAlign: 'center',
        border: '1px solid black',
        fontFamily: 'Gill Sans, sans-serif',
        fontSize: '20px',
        cursor: 'pointer',
    },
    render() {
        return <div>
            {_.times(3, y => {
                return <div key={y}>
                    {_.times(3, x => {
                        return <b
                            onClick={toggleCell.bind(0, x, y)}
                            style={this.cellStyle} key={x + "-" + y}
                        >
                            {symbol(this.props.cells[y * 3 + x])}
                        </b>;
                    })}
                </div>;
            })}
        </div>;
    }
});

function render() {
    React.render(<App game={game} />, document.body);
}
render();

