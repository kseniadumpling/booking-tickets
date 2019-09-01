import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from "react-bootstrap/Form";
import './BookingCard.css';
import Col from "react-bootstrap/Col";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

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

	handleSubmit() {
		console.log(this.setOutput());
		this.dropStates();
	};

	handleCancel() {
		this.dropStates();
	}

	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState(
			{[name]: value },
			() => { this.validateField(name, value)}
		);
	};

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

	dropStates() {
		this.setState({
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
		});
	}

	setOutput() {
		return (
			[
				this.props.data.name,
				this.props.sessions[0].date,
				this.state.time,
				this.state.bookedTickets+' ticket(s)',
				this.state.name,
				this.state.phone
			]
		);
	}

	static renderErrorBorder(err, enabled) {
		return (err && enabled  ? 'has-error' : '');
	}

	renderTimeButtons() {
		return this.props.sessions.map(item => {
			if (item.availableTickets !== "0") {
				return (
					<ToggleButton
						key={item.time}
						value={item.time}
						className="mr-2 rounded"
						variant="outline-primary"
						onClick={() => this.handleSessionSelection(item.time, item.availableTickets)}
					>
						{item.time}
					</ToggleButton>
				);
			} else {
				return (
					<OverlayTrigger key={item.time} overlay={
						<Tooltip id="tooltip-disabled">No available tickets</Tooltip>
					}>
					  	<span className="d-inline-block">
							<Button className="mr-2"
									variant="outline-primary"
									disabled style={{pointerEvents: 'none'}}>
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
			<React.Fragment key={this.props.data.id}>
				<Button variant="primary" onClick={this.handleShowModal}>
					Book
				</Button>
				<Modal show={this.state.showModal} size="lg">
					<Modal.Body className="bg-gray-light">
						<img width={150} height={200}
							 className="mr-3 float-left"
							 src={this.props.data.imgURL}
							 alt="poster"
						/>
						<h5>{this.props.data.name}</h5>
						<p>{this.props.data.description}</p>
						<h6 className="pt-4">{this.props.sessions[0].date}</h6>
						<ToggleButtonGroup type="radio" name="options">
							{this.renderTimeButtons()}
						</ToggleButtonGroup>
						<small><br/>Tickets available: {this.state.availableTickets}</small>
						<Form className="pt-5" noValidate validated={this.state.formValid}>
							<Form.Row>
								<Col lg="2" sm="12">
									<Form.Control type="number" placeholder="Tickets"
												  name="bookedTickets"
												  min="1" max={this.state.availableTickets}
												  disabled={!this.state.availableTickets}
												  onChange={this.handleUserInput}
												  className={`${BookingCard.renderErrorBorder(!this.state.ticketValid, this.state.time)}`}
												  required
									/>
								</Col>
								<Col lg="5" sm="12">
									<Form.Control type="text" placeholder="Enter name"
												  name="name"
												  disabled={!this.state.time}
												  onChange={this.handleUserInput}
												  className={`${BookingCard.renderErrorBorder(!this.state.nameValid, this.state.time)}`}
												  required
									/>
								</Col>
								<Col lg="5" sm="12">
									<Form.Control type="tel" placeholder="Enter phone"
												  name="phone"
												  disabled={!this.state.time}
												  onChange={this.handleUserInput}
												  className={`${BookingCard.renderErrorBorder(!this.state.phoneValid, this.state.time)}`}
												  required
									/>
								</Col>
							</Form.Row>
						</Form>
					</Modal.Body>
					<Modal.Footer className="bg-gray-light">
						<Button variant="secondary" onClick={this.handleCancel}>
							Cancel
						</Button>
						<Button variant="primary" type="submit"
								disabled={!this.state.formValid}
								onClick={this.handleSubmit}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			</React.Fragment>
		);
	}
}

export default BookingCard;