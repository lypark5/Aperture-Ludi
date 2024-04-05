import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import {useHistory} from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [bio, setBio] = useState('');
	const [profilePic, setProfilePic] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [disabled, setDisabled] = useState(true);
	const [buttonClass, setButtonClass] = useState("disabled-signup-button");
	const [imageLoading, setImageLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [userBackgroundImg, setUserBackgroundImg] = useState(null)
	const [pwType, setPwType] = useState("password");
	const { closeModal } = useModal();

	useEffect(() => {
		const errObj = {};
		if (username && username.length < 4) errObj.username = "Username must be at least 4 characters long";
		if (password && password.length < 6) errObj.password = "Password must be at least 6 characters long";
		if (firstName && (firstName.length < 3 || firstName.length > 50)) errObj.firstName = "First name must be between 3 and 50 characters";
		if (lastName && (lastName.length < 3 || lastName.length > 50)) errObj.lastName = "Last name must be between 3 and 50 characters";
		if (bio && bio.length > 200) errObj.bio = "Bio must be 200 characters or less";
		if (confirmPassword && confirmPassword !== password) errObj.confirmPassword = "Password and Confirm Password fields must match";

		if (username.length >= 4 && password.length >= 6 && firstName.length >= 3 && firstName.length <= 50 && lastName.length >= 3 && lastName.length <= 50 && password === confirmPassword) {
			setDisabled(false);
			setButtonClass("enabled-signup-button")
		}

		showPassword === false ? setPwType("password") : setPwType("text");

		setErrors(errObj);
	}, [firstName, lastName, username, password, confirmPassword, showPassword, bio]);

	const handleShowPW = () => {
		!showPassword ? setShowPassword(true) : setShowPassword(false);
	};

	const handleSubmit = async (e) => {
		// if (profilePic === null) {
		// 	const signUpData = {email, username, firstName, lastName, profilePic: 'https://aperture-bucket-april-2023.s3.amazonaws.com/default.jpeg', password}
		// 	await dispatch(sessionActions.signUpNoFile(signUpData));
		// 	closeModal();
		// 	setEmail('')
		// 	setUsername('')
		// 	setPassword('')
		// 	setProfilePic('')
		// 	setFirstName('')
		// 	setLastName('')
		// 	history.push("/photos/all");
		// } else{
			e.preventDefault();
			const formData = new FormData()
			formData.append("email", email)
			formData.append("username", username)
			formData.append("first_name", firstName)
			formData.append("last_name", lastName)
			if(profilePic)formData.append("profile_pic", profilePic)
			formData.append("password", password)
			formData.append("bio", bio)
			if(userBackgroundImg)formData.append('user_background_pic', userBackgroundImg)
			await dispatch(sessionActions.signUp(formData));
			closeModal();
			setEmail('')
			setUsername('')
			setPassword('')
			setProfilePic('')
			setFirstName('')
			setLastName('')
			history.push("/photos/all");
		// }
	};
	return (
		<div className='modal' id="signup-modal">
			<h2 style={{color: 'rgb(46, 147, 255)', paddingTop: '2px', paddingBottom: '4px'}}>Sign Up for Aperture</h2>
			<form onSubmit={handleSubmit} encType="multipart/form-data" id='signup-form'>
				{/* <ul>
					{Object.keys(errors).map((error, idx) => (
						<li key={idx}>{error}</li>
					))}adf
				</ul> */}
				<div id='signup-input-container'>

						<input
							className="signup-input"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
							placeholder="First Name"
						/>

					{errors.firstName && <p className="errors">{errors.firstName}</p>}

						<input
							className="signup-input"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
							placeholder="Last Name"
						/>

					{errors.lastName && <p className="errors">{errors.lastName}</p>}


						<input
							className="signup-input"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							placeholder="Username"
						/>

					{errors.username && <p className="errors">{errors.username}</p>}


						<input
							className="signup-input"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="Email"
						/>

					{errors.email && <p className="errors">{errors.email}</p>}

						<div style={{display: "flex", flexDirection: "row", width: "100%", marginLeft: "25px"}}>
							<input
								className="signup-input"
								type={pwType}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								placeholder="Password"
								/>
							{ !showPassword && <i className="fas fa-eye" style={{color: "grey", alignSelf: "center", position: "absolute", marginLeft: "65%", zIndex: "2"}} onClick={handleShowPW}></i>}
							{ showPassword && <i className="fas fa-eye-slash" style={{color: "grey", alignSelf: "center", position: "absolute", marginLeft: "65%", zIndex: "2"}} onClick={handleShowPW}></i>}
						</div>

					{errors.password && <p className="errors">{errors.password}</p>}

						<input
							className="signup-input"
							type={pwType}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							placeholder="Confirm Password"
						/>

					{errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}

						<textarea
							className="signup-input"
							type="textarea"
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							placeholder="Bio (optional)"
							style={{height: '80px'}}
						/>
						<p>{bio.length}/200</p>
					{errors.bio && <p className="errors">{errors.bio}</p>}

					<label id='file-label'>Upload your profile picture:</label>
						<input
							className="signup-input"
							type="file"
							onChange={(e) => setProfilePic(e.target.files[0])}
							// placeholder="Profile Picture"
							accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
						/>
					
					<label id='file-label'>Upload your background picture:</label>
						<input
							className="signup-input"
							type="file"
							onChange={(e) => setUserBackgroundImg(e.target.files[0])}
							// placeholder="Profile Picture"
							accept="image/png, image/jpeg, image/jpg, image/gif, image/pdf"
						/>

				</div>
				<button disabled={disabled} className={buttonClass} type="submit">Sign Up</button>
				{(imageLoading)&& <p>Loading...</p>}
			</form>
		</div>
	);
}

export default SignupFormModal;
