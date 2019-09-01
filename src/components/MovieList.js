import React, {Component} from 'react';
import MovieCard from './MovieCard';
import Demo from '../demo/demoList.json';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import './MovieList.css';
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import en from 'date-fns/locale/en-GB';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
registerLocale('en', en);
setDefaultLocale('en');


class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date('09/01/2019'),
			genre: null,
		};
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	handleDateChange(date) {
		this.setState( {
			date: date,
		});
	}

	handleGenreSelection(genre) {
		this.setState({
			genre: genre,
		});
	}

	renderGenresDropdown() {
		let res = MovieList.getGenresList().map((item, i) => {
			return (
				<Dropdown.Item key={i} as="button"
					onClick={() => this.handleGenreSelection({item})}>
					{item}
				</Dropdown.Item>
			);
		});
		res.push(
			<React.Fragment key={res.length+1}>
				<Dropdown.Divider/>
				<Dropdown.Item as="button"
					onClick={() => this.handleGenreSelection(null)}>
					Show all
				</Dropdown.Item>
			</React.Fragment>
		);
		return res;
	}

	static getGenresList() {
		let genres = [];
		for (let i = 0; i < Demo.movieList.length; i++) {
			if(!genres.includes(Demo.movieList[i].genre)) {
				genres.push(Demo.movieList[i].genre);
			}
		}
		return genres;
	}


	static renderMovieCards(genre, date) {
		let movieArr = [];
		for (let i = 0; i < Demo.movieList.length; i++) {
			let dateSession = MovieList.findDate(Demo.movieList[i].sessions, date);
			// Requesting a movie card with proper genre and date
			if ((!genre || Demo.movieList[i].genre === genre.item) && dateSession) {
				movieArr.push(<MovieCard key={i} data={Demo.movieList[i]} date={dateSession}/>);
			}
		}
		if (!movieArr.length){
			movieArr.push(
				<h6 className="text-center pt-5">
					Sorry, there is no movie for these parameters
				</h6>
			);
		}
		return movieArr;
	}

	// Finding & getting a date as a string (like in the json), not as a js-object
	static findDate(sessions, date) {
		let res = sessions.find(item => new Date(item.date).getTime() === date.getTime());
		return res ? res.date : null;
	}

	render() {
		return (
			<Container className="p-lg-5 p-md-5">
				<Col lg="10" md="12" sm="12" className="mx-auto">
					<Row className="py-2 justify-content-center text-center">
						<Col lg="3" md="4" sm="5" className="pb-2">
							<DatePicker
								className="form-control btn btn-primary btn-size"
								type="button"
								dateFormat="MMMM d"
								minDate={new Date('08/29/2019')}
								maxDate={new Date('09/04/2019')}
								selected={this.state.date}
								onChange={this.handleDateChange}
							/>
						</Col>
						<Col lg="3" md="4" sm="5" className="pb-2">
							<DropdownButton title="Choose genre"  block>
								{this.renderGenresDropdown()}
							</DropdownButton>
						</Col>
					</Row>
					{MovieList.renderMovieCards(this.state.genre, this.state.date)}
				</Col>
			</Container>
		);
	}
}

export default MovieList;
