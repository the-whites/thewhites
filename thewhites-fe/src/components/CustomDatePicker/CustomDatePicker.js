// DatePickerComponent.js
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../MainStyles.css";
import "./CustomDatePicker.css";

const CustomDatePicker = ({ label = "", placeholder = "Kies een datum", isInvalid = false, handleChange = () => {} }) => {
	const [selectedDateTime, setSelectedDateTime] = useState(null);

	const handleDateChange = (date) => {
		setSelectedDateTime(date);
		if (handleChange) {
			handleChange(date);
		}
	};

	return (
		<>
			<Row className="mb-3">
				<Col md={2}>
					<p className="label">{label}</p>
				</Col>
				<Col md={1}>
					<DatePicker
						selected={selectedDateTime}
						onChange={handleDateChange}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={30}
						dateFormat="yyyy-MM-dd HH:mm"
						placeholderText={placeholder}
						className={`form-control custom-date-picker ${isInvalid ? "is-invalid" : ""}`}
					/>
					
				</Col>
			</Row>
			<Row>
				<Col md={2}></Col>
				<Col md={10}>
					{isInvalid && <div className="invalid-text invalid-date-picker-text">Vul de {label.toLowerCase()} correct in</div>}
				</Col>
			</Row>
		</>
	);
};

export default CustomDatePicker;
