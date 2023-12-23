import React from "react";
import InputBar from "../components/InputBar";
import { useState } from "react";
import { Form } from "react-bootstrap";

const OverOns = () => {
	const [inputValue, setInputValue] = useState("");

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<>
			<br></br>
			<Form>
				<InputBar handleChange={handleChange} textPosition="left" size="large" placeholder="jan@gmail.com" type="text" label="Vul hieronder uw email adres"/>
			</Form>
			
			{inputValue ? inputValue : "geen input"}
		</>
		
	);
};
export default OverOns;
