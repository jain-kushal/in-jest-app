import React, { Component } from 'react';
import Joke from './Joke';
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';
import './JokeList.css';
import './Loader.css';

class JokeList extends Component {
	static defaultProps = {
		numOfJokesToGet: 10
	};
	constructor(props) {
		super(props);
		this.state = {
			jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]')
		};
		this.state.jokes.sort((a, b) => b.votes - a.votes);
		this.seenJokes = new Set(this.state.jokes.map((joke) => joke.id));
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		if (this.state.jokes.length === 0) {
			this.getJokes();
		}
	}
	async getJokes() {
		let jokes = [];
		while (jokes.length < this.props.numOfJokesToGet) {
			//Load jokes
			let res = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });

			if (!this.seenJokes.has(res.data.id)) {
				jokes.push({ jokeText: res.data.joke, votes: 0, id: res.data.id });
				this.seenJokes.add(res.data.id);
				// console.log(this.seenJokes);
			} else {
				console.log('DUPLICATE FOUND. Removing...');
				console.log(res.data);
			}

			// console.log(res);
		}

		this.setState(
			(st) => ({
				jokes: [ ...st.jokes, ...jokes ],
				loading: false
			}),
			() => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
		);
	}
	handleVote(id, delta) {
		this.setState(
			(st) => ({
				jokes: st.jokes.map((joke) => (joke.id === id ? { ...joke, votes: joke.votes + delta } : joke))
			}),
			() => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
		);
	}
	handleClick() {
		this.setState({ loading: true }, this.getJokes);
	}
	render() {
		if (this.state.loading) {
			return (
				<div id="loader">
					<span />
					<span />
					<span />
					<span />
				</div>
			);
		}

		return (
			<div className="JokeList">
				<div className="JokeList-Sidebar">
					<h1 className="JokeList-Sidebar-title">
						<strong>in</strong>
						<span>Jest</span>
					</h1>
					<img
						src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
						alt="rofl_emoji"
					/>
					<button className="btn" onClick={this.handleClick}>
						New Jokes
					</button>
					<div>
						<a className="btn credit" href="https://www.kushaljain.com">
							Made by Kushal Jain
						</a>
					</div>
				</div>
				<div className="JokeList-items">
					{this.state.jokes.map((joke) => (
						<Joke
							key={joke.id}
							joke={joke}
							upvote={() => this.handleVote(joke.id, 1)}
							downvote={() => this.handleVote(joke.id, -1)}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default JokeList;
