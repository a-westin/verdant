import React, { Component } from "react";
import "./loginform.css";
import API from "../../utils/API";

class LogInForm extends Component {
  // Setting the component's initial state
  state = {
    email: "",
    password: "",
  };

  handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    if (name === "email") {
      value = value.substring(0, 25);
    }
    // Updating the input's state
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (!this.state.email || !this.state.password) {
      alert("Please enter your email and password!");
    }

    API.logInUser({
      email: this.state.email,
      password: this.state.password,
    }).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      if (err) throw err;
    })

    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
        <form className="loginform">
          <div>
            <input
              value={this.state.email}
              name="email"
              onChange={this.handleInputChange}
              type="email"
              placeholder="Email"
              id="loginEmail"
            />
          </div>
          <div>
            <input
              value={this.state.password}
              name="password"
              onChange={this.handleInputChange}
              type="password"
              placeholder="Password"
            />
          </div>
          <button className="loginBtn" onClick={this.handleFormSubmit}>Log In</button>
        </form>
      </div>
    );
  }
}

export default LogInForm;
