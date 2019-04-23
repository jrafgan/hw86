import React, {Fragment, Component} from 'react';
import FormElement from "../components/FormElement";
import {loginUser} from "../store/actions/usersActions";
import {connect} from "react-redux";

class Login extends Component {

    state = {
        username: '',
        password: '',
    };

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    submitFormHandler = e => {
        e.preventDefault();
        this.props.loginUser({...this.state});
    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {
        return (
            <Fragment>
                <h2>Login</h2>
                {this.props.error &&
                <div className="alert">
                    {this.props.error.error || this.props.error.global}
                </div>}
                <form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="username"
                        title="Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        placeholder="Enter username you registered with"
                        autocomplete="current-username"
                        error={this.getFieldError('username')}
                    />



                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        placeholder="Enter password"
                        autocomplete="current-password"
                        error={this.getFieldError('password')}
                    />

                    <div>
                            <button type="submit">Login</button>
                    </div>
                </form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.loginError,
});

const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);