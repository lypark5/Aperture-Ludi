import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [pwType, setPwType] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        history.push('/photos/all');
        closeModal();
    }
  };

  useEffect(() => {
    if (password.length >= 6) setDisabled(false);
    else setDisabled(true);
    showPassword === false ? setPwType("password") : setPwType("text");
  }, [password, showPassword])

  const handleShowPW = () => {
    !showPassword ? setShowPassword(true) : setShowPassword(false);
  };

  //route = '/login'
  return (
    <div id="loginmodal" className="modal">
      <h2 style={{color: 'rgb(46, 147, 255)'}}>Log In</h2>
      <form onSubmit={handleSubmit} id='login-form'>
        <div id='login-input-container'>
          <input
            className="login-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div style={{display: "flex", flexDirection: "row", width: "100%", marginLeft: "25px"}}>
            <input
              className="login-input"
              type={pwType}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
            { !showPassword && <i className="fas fa-eye" style={{color: "grey", alignSelf: "center", position: "absolute", marginLeft: "68%", zIndex: "2"}} onClick={handleShowPW}></i>}

            { showPassword && <i className="fas fa-eye-slash" style={{color: "grey", alignSelf: "center", position: "absolute", marginLeft: "68%", zIndex: "2"}} onClick={handleShowPW}></i>}
          </div>

          {errors.map((error, idx) => (
            <p className="errors" key={idx}>{error}</p>
          ))}
        </div>
        <button disabled={disabled} id={disabled ? "disabled-login-button" : "enabled-login-button"} type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
