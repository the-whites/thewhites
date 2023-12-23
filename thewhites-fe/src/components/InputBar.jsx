import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

import "./InputBar.css";

const InputBar = ({ type, placeholder, controlId, label, size, handleChange, textPosition }) => {
	const sizes = {
		small: "15%",
		medium: "30%",
		large: "50%",
	};

	const textPositions = {
		left: 2,
		top: 3,
	};

	const inputBarSize = sizes[size];
	const textPositionSm = textPositions[textPosition];

	return (
		<Form>
			<Form.Group as={Row} className="mb-3" controlId={controlId}>

				<Form.Label column sm={textPositionSm}>
				{label}
				</Form.Label>

				<Col sm="10">
					<Form.Control
						type={type}
						style={{ width:	inputBarSize }}
						placeholder={placeholder}
						onChange={handleChange}
					/>
				</Col>
			</Form.Group>
		</Form>
	);
};

InputBar.propTypes = {
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	controlId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	size: PropTypes.oneOf(["small", "medium", "large"]).isRequired,
	handleChange: PropTypes.func.isRequired,
	textPosition: PropTypes.oneOf(["top", "left"]).isRequired
};

InputBar.defaultProps = {
	type: "text",
	placeholder: "Sample placeholder",
	controlId: "", 
	label: "",
	size: "medium",
	handleChange: () => {},
	textPosition: "left"
  };

export default InputBar;