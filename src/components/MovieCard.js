import React, {Component} from 'react';
import Media from "react-bootstrap/Media";
import BookingCard from "./BookingCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


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
						<Col md="7" sm="12">
							<h5>{this.props.data.name}</h5>
							<h6>{this.props.data.genre}</h6>
							<p>{this.props.data.description}</p>
						</Col>
						<Col md="3" sm="6" className="text-center my-auto">
							{MovieCard.getTimetable(sessions)}
						</Col>
						<Col md="2" sm="6" className="text-center my-auto">
							<BookingCard data={this.props.data} sessions={sessions}/>
						</Col>
					</Row>
				</Media.Body>
			</Media>
		);
	}
}

export default MovieCard;
