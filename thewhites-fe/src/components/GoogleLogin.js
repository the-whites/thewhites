import React from "react";


const GoogleLogin = () => {
	return (
		<>
			<div id="g_id_onload"
				data-client_id="712169306292-k3ch7qbttauabtsdh7p4sv0k1kthr2qg.apps.googleusercontent.com"
				data-login_uri="http://localhost:8055/login"
				data-auto_prompt="false">
			</div>
			<div className="g_id_signin"
				data-type="standard"
				data-shape="rectangular"
				data-theme="outline"
				data-text="signin_with"
				data-size="large"
				data-logo_alignment="left">
			</div>
		</>
	);
};

export default GoogleLogin;