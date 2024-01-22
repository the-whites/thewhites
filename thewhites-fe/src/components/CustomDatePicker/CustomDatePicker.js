// DatePickerComponent.js
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../MainStyles.css";
import "./CustomDatePicker.css";

const CustomDatePicker = ({ label = "", value = null, placeholder = "Kies een datum", dateFormat = "yyyy-MM-dd HH:mm", timeFormat = "HH:mm", isInvalid = false, required = false, canEdit = true, handleChange = () => {} }) => {
	const [selectedDateTime, setSelectedDateTime] = useState(value);

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
					<p className="label">{label} {required && "*"}</p>
				</Col>
				<Col md={1}>
					<DatePicker
						selected={selectedDateTime}
						onChange={handleDateChange}
						showTimeSelect
						timeFormat={timeFormat}
						timeIntervals={30}
						dateFormat={dateFormat}
						placeholderText={placeholder}
						className={`form-control custom-date-picker ${isInvalid ? "is-invalid" : ""}`}
						disabled={!canEdit}
						id={`datepicker-${label.toLowerCase().replace(/\s+/g, "")}`}
					/>
					
				</Col>
			</Row>
			<Row>
				<Col md={2} />
				<Col md={10}>
					{isInvalid && <div className="invalid-text invalid-date-picker-text">Vul de {label.toLowerCase()} correct in</div>}
				</Col>
			</Row>
		</>
	);
};

export default CustomDatePicker;
