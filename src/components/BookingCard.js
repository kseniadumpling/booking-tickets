import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from "react-bootstrap/Form";
import './BookingCard.css';

class BookingCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			time: null,
			availableTickets: null,
			bookedTickets: 0,
			name: '',
			phone: '',
			ticketValid: false,
			nameValid: false,
			phoneValid: false,
			formValid: false

		};
		this.handleShowModal = this.handleShowModal.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.renderTimeButtons = this.renderTimeButtons.bind(this);
	}

	handleShowModal() {
		this.setState({
			showModal: true,
		});
	}


	handleSessionSelection(time, tickets) {
		this.setState({
			time: time,
			availableTickets: tickets,
		});
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({
			[name]: value},
			() => { this.validateField(name, value)}
		);
	};

	handleSubmit() {
		console.log( [
			this.props.data.name,
			this.props.sessions[0].date,
			this.state.time,
			this.state.bookedTickets+' ticket(s)',
			this.state.name,
			this.state.phone
			]
		);
		this.setState({
			showModal: false,
			time: null,
			availableTickets: null,
			bookedTickets: 0,
			name: '',
			phone: '',
		})
	}

	handleCancel() {
		this.setState({
			showModal: false,
			time: null,
			availableTickets: null,
			bookedTickets: 0,
			name: '',
			phone: '',
		})
	}

	validateField(fieldName, value) {
		let ticketValid = this.state.ticketValid;
		let nameValid = this.state.nameValid;
		let phoneValid = this.state.phoneValid;
		switch(fieldName) {
			case 'bookedTickets':
				ticketValid = (+value > 0 && +value <= this.state.availableTickets);
				break;
			case 'name':
				nameValid = value.match(/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/);
				break;
			case 'phone':
				phoneValid = value.match(/^((\+\d{1})[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
				break;
			default:
				break;
		}
		this.setState({
			ticketValid: ticketValid,
			nameValid: nameValid,
			phoneValid: phoneValid
		}, this.validateForm);
	}

	validateForm() {
		this.setState({
			formValid: this.state.ticketValid &&
						this.state.nameValid &&
						this.state.phoneValid
		});
	}

	renderTimeButtons() {
		return this.props.sessions.map(item => {
			if (item.availableTickets !== "0") {
				return (
					<Button
						key={item.time}
						className="mr-2"
						size="sm"
						onClick={() => this.handleSessionSelection(item.time, item.availableTickets)}
					>
						{item.time}
					</Button>
				);
			} else {
				return (
					<OverlayTrigger key={item.time} overlay={
						<Tooltip id="tooltip-disabled">No available tickets</Tooltip>
					}>
					  	<span className="d-inline-block">
							<Button size="sm" className="mr-2" disabled style={{pointerEvents: 'none'}}>
						  	{item.time}
							</Button>
					 	 </span>
					</OverlayTrigger>
				);
			}
		});
	}

	render() {
		return (
			<div key={this.props.data.id}>
				<Button className="float-right" variant="primary" onClick={this.handleShowModal}>
					Book
				</Button>
				<Modal show={this.state.showModal} size="lg">
					<Modal.Body>
						<img width={150} height={200}
							 className="mr-3 float-left"
							 src={this.props.data.imgURL}
							 alt="poster"
						/>
						<h5>{this.props.data.name}</h5>
						<p>{this.props.data.description}</p>
						<h6 className="pt-4">{this.props.sessions[0].date}</h6>
						{this.renderTimeButtons()}
						<small><br/>Tickets available: {this.state.availableTickets}</small>
						<Form className="pt-5">
							<Form.Row>
								<div className="col-lg-2 col-sm-12">
									<small>Amount</small>
									<Form.Control type="number" placeholder="Tickets"
												  name="bookedTickets"
												  value={this.state.bookedTickets}
												  onChange={this.handleUserInput}
									/>
								</div>
								<div className="col-lg-5 col-sm-12">
									<small>Your name</small>
									<Form.Control type="text" placeholder="Enter name"
												  name="name"
												  value={this.state.name}
												  onChange={this.handleUserInput}
									/>
								</div>
								<div className="col-lg-5 col-sm-12">
									<small>Your phone</small>
									<Form.Control type="tel" placeholder="+1-234-567-8901"
												  name="phone"
												  value={this.state.phone}
												  onChange={this.handleUserInput}
									/>
								</div>
							</Form.Row>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button className="float-left" variant="secondary" onClick={this.handleCancel}>
							Cancel
						</Button>
						<Button variant="primary" type="submit"
								disabled={!this.state.formValid}
								onClick={this.handleSubmit}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default BookingCard;