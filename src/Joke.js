import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
	getColorAndEmoji(votes) {
		if (votes >= 15) {
			return { color: '#4CAF50', emoji: 'em em-rolling_on_the_floor_laughing' };
		} else if (votes >= 12) {
			return { color: '#8BC34A', emoji: 'em em-laughing' };
		} else if (votes >= 9) {
			return { color: '#CDDC39', emoji: 'em em-smiley' };
		} else if (votes >= 6) {
			return { color: '#FFEB3B', emoji: 'em em-slightly_smiling_face' };
		} else if (votes >= 3) {
			return { color: '#FFC107', emoji: 'em em-neutral_face' };
		} else if (votes >= 0) {
			return { color: '#FF9800', emoji: 'em em-confused' };
		} else {
			return { color: '#f44336', emoji: 'em em-angry' };
		}
	}
	render() {
		const joke = this.props.joke;

		return (
			<div className="Joke">
				<div className="Joke-buttons">
					<button onClick={this.props.downvote}>
						<i className="material-icons">thumb_down_alt</i>
					</button>
					<span className="Joke-votes" style={{ borderColor: this.getColorAndEmoji(joke.votes).color }}>
						{joke.votes}
					</span>
					<button onClick={this.props.upvote}>
						<i className="material-icons">thumb_up_alt</i>
					</button>
				</div>
				<div className="Joke-text">
					<p>{joke.jokeText}</p>
				</div>
				<div className="Joke-smiley">
					<i className={this.getColorAndEmoji(joke.votes).emoji} />
				</div>
			</div>
		);
	}
}
export default Joke;
