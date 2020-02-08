import React, {Component} from 'react'
// import { withFormik } from 'formik'
// import * as Yup from 'yup'
// import classnames from 'classnames'
import { instanceOf } from 'prop-types';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {Link} from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import {server, users} from "../Utils/Constants";

class Soosk extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            token: cookies.get('token') || 'Ben'
        };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let dat = {
                    "email": values.email,
                    "password": values.password
                }
                console.log('Received values of form: ', values);
                let url = server + users + '/login';
                fetch(url, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dat) // body data type must match "Content-Type" header
                }).then(r => r.json())
                    .then(data => {
                        console.log(data)
                        if (data.status === "OK") {
                            const { cookies } = this.props;
                            let token = data.user.access_token;
                            cookies.set('token', token);
                            this.setState({ token });
                            window.location.assign("/list");
                        }
                    })

            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="Email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {/*{getFieldDecorator('remember', {*/}
                    {/*    valuePropName: 'checked',*/}
                    {/*    initialValue: true,*/}
                    {/*})(<Checkbox>Remember me</Checkbox>)}*/}
                    {/*<br/>*/}
                    {/*<a className="login-form-forgot" href="">*/}
                    {/*    Forgot password*/}
                    {/*</a>*/}
                    {/*<br/>*/}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        {/*<Link to={`/list`}>Log in</Link>*/}
                        Log In
                    </Button>
                    {/*<br/>*/}
                    {/*Or <a href="">register now!</a>*/}
                </Form.Item>
            </Form>
        );
    }
}

const FormTest = Form.create({name: 'normal_login'})(Soosk);

export default withCookies(FormTest)


