import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useApi } from "../hooks/useApi";


const AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_PATH,
	timeout: 5000, // Timeout in milliseconds
	withCredentials: true
});

export default AxiosInstance;