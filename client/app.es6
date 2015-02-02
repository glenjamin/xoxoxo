/* jshint browser: true */

var React = require('react');

var _ = require('lodash');

var gamelib = require('./game.es6');

var game = window.game = gamelib.create();

var p = 1;
function toggleCell(x, y) {
    [game, p] = gamelib.play(game, x, y, p);
    render();
}

var App = React.createClass({
    render() {
        var winner = gamelib.winner(this.props.game);
        winner = winner && (winner == "draw" ? "nobody" : game.symbol(winner));
        return <div>
            {winner && <p>{winner} wins.</p>}
            <Game game={this.props.game} />
        </div>;
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
                            {symbol(this.props.game[y * 3 + x])}
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

