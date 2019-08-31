import React, {Component} from 'react';
import Media from "react-bootstrap/Media";
import BookingCard from "./BookingCard";
import Row from "react-bootstrap/Row";
import './MovieCard.css';


class MovieCard extends Component {
	getProperSessions(date) {
		return this.props.data.sessions.filter(item => item.date === date);
	}

	static getTimetable(sessions) {
		return sessions.map(item => {
			return(<h6 key={item.time}>{item.time}</h6>);
		});
	}

	render() {
		let sessions = this.getProperSessions(this.props.date);
		return (
			<Media className="py-4" key={this.props.data.id}>
				<img width={105} height={140}
					 className="mr-3"
					 src={this.props.data.imgURL}
					 alt="poster"
				/>
				<Media.Body>
					<Row>
						<div className="col-7">
							<h5>{this.props.data.name}</h5>
							<h6>{this.props.data.genre}</h6>
							<p>{this.props.data.description}</p>
						</div>
						<div className="col-3">
							{MovieCard.getTimetable(sessions)}
						</div>
						<div className="col-2">
							<BookingCard data={this.props.data} sessions={sessions}/>
						</div>
					</Row>
				</Media.Body>
			</Media>
		);
	}
}

export default MovieCard;
