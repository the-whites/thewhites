import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";

import "./InputBar.css";

const InputBar = ({ type, placeholder, controlId, label, size, handleChange }) => {
	const getSizeFromName = () => {
		switch (size) {
			case "small": return "15%";
			case "medium": return "30%";
			case "large": return "50%";
			default: return "";
		}
	};

	const inputBarSize = getSizeFromName(size);

	return (
		<Form>
			<Form.Group as={Row} className="mb-3" controlId={controlId}>

				<Form.Label column sm="3">
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
	handleChange: PropTypes.func.isRequired
};

InputBar.defaultProps = {
	type: "text",
	placeholder: "Sample placeholder",
	controlId: "", 
	label: "",
	size: "medium",
	handleChange: () => {}
  };

export default InputBar;