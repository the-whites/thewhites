import React, { useContext, useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import { logout } from "../logout";
import { fetchApi } from "../../hooks/useApi";
import { ROLES } from "../../constants/roles";

const UserDropdown = () => {
	const { username, role } = useContext(UserContext);
	const [meldingenCount, setMeldingenCount] = useState(0);

	const navigate = useNavigate();

	const handleLogout = async () => {
		logout();
		setTimeout(() => {
			window.location.href = "/";
		}, 1500);
	};

	const handlePortaal = () => {
		switch(role) {
		case ROLES.ervaringsdeskundige:
			navigate("/ervaringsdeskundige");
			break;
		case ROLES.bedrijf:
			navigate("/bedrijf");
			break;
		case ROLES.beheerder:
			navigate("/beheerder");
			break;
		default:
			navigate("/");
		}
	};

	const fetchMeldingenCount = async () => {
		try {
			const response = await fetchApi({ route: "api/gebruiker/meldingen/ongelezen-aantal" });
	
			if (response.status === 200) {
				setMeldingenCount(response.data);
			} else {
				console.error("Failed to fetch meldingen count:", response.statusText);
			}
		} catch (error) {
			console.error("An error occurred while fetching meldingen count:", error.message);
		}
	};
	
	useEffect(() => {
		fetchMeldingenCount();
	}, []);

	return (
		<NavDropdown title={`${username}`} className="nav-bar-item" onToggle={fetchMeldingenCount}>
			<NavDropdown.Item  onClick={() => handlePortaal()}>Bekijk portaal</NavDropdown.Item>
			<NavDropdown.Item as={Link} to="/meldingen">Meldingen {meldingenCount > 0 ? `(${meldingenCount})` : ""}</NavDropdown.Item>
			<NavDropdown.Divider />
			<NavDropdown.Item onClick={() => handleLogout()}>Uitloggen</NavDropdown.Item>
		</NavDropdown>
	);
};

export default UserDropdown;
