import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { OverlayTrigger, Tooltip, InputGroup } from "react-bootstrap";

import "../MainStyles.css";
import "./InputBar.css";

const InputBar = ({ type = "text", placeholder = "", label = "", value = "", handleChange = (value) => {}, infoText = "", required = false, min = null, isInvalid = false, errorMessage = `${label} is verplicht om ingevuld te worden`, inputRef}) => {

	return (
		<>
			<Form.Group as={Row} className="mb-3">
				<Form.Label column sm="2" className="label" style={{ textAlign: "right" }}>
					{label} {required && "*"}
				</Form.Label>
				<Col sm="6">
					<InputGroup>
						<Form.Control
							ref={inputRef}
							type={type}
							value={value ? value : undefined}
							placeholder={placeholder}
							minLength={min}
							onChange={(e) => handleChange(e.target.value)}
							required={required}
							className="input-bar"
							as={type === "textarea" ? "textarea" : "input"}
							rows={type === "textarea" ? 4 : 1}
							isInvalid={isInvalid}
						/>
						
						{infoText && (
							<OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-right">{infoText}</Tooltip>}>
								<InputGroup.Text className="info-button">&#9432;</InputGroup.Text>
							</OverlayTrigger>
						)}
						<Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
					</InputGroup>
				</Col>
			</Form.Group>
		</>
	);
};

export default InputBar;