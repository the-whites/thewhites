import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

import "./InputBar.css";

const InputBar = ({ type = "text", placeholder = "", label = "", handleChange = () => {}, textPosition = "left" }) => {

	const textPositions = {
		left: 2,
		top: 3,
	};

	const textPositionSm = textPositions[textPosition];

	return (
		<>
			<Form.Group as={Row} className="mb-3">
				<Form.Label column sm={textPositionSm}>
					{label}
				</Form.Label>
				<Col sm="10">
					<Form.Control
						type={type}
						placeholder={placeholder}
						onChange={handleChange}
						required={true}
						className="input-bar"
						as={type === "textarea" ? "textarea" : "input"}
						rows={type === "textarea" ? 4 : 1}
					/>
				</Col>
			</Form.Group>
		</>
	);
};

InputBar.propTypes = {
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	textPosition: PropTypes.oneOf(["top", "left"]).isRequired
};

export default InputBar;