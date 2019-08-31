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
		let res = MovieList.getGenresList().map(item => {
			return (
				// TODO: add a key attribute
				<Dropdown.Item as="button"
					onClick={() => this.handleGenreSelection({item})}>
					{item}
				</Dropdown.Item>
			);
		});
		res.push(
			<div>
				<Dropdown.Divider/>
				<Dropdown.Item as="button"
					onClick={() => this.handleGenreSelection(null)}>
					Show all
				</Dropdown.Item>
			</div>
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
				movieArr.push(<MovieCard data={Demo.movieList[i]} date={dateSession}/>);
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
			<div className="container p-lg-5 p-md-5">
				<Row className="py-3">
					<div className="col-lg-3 col-md-4 col-sm-5 pb-2">
						<DatePicker
							className="form-control"
							dateFormat="MMMM d"
							minDate={new Date('08/29/2019')}
							maxDate={new Date('09/04/2019')}
							selected={this.state.date}
							onChange={this.handleDateChange}
						/>
					</div>
					<div className="col-lg-3 col-md-4 col-sm-5 pb-2">
						<DropdownButton id="dropdown-basic-button" title="Choose genre">
							{this.renderGenresDropdown()}
						</DropdownButton>
					</div>
				</Row>
				{MovieList.renderMovieCards(this.state.genre, this.state.date)}
			</div>
		);
	}
}

export default MovieList;
