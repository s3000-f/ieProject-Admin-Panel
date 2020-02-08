import React, {Component} from 'react'
import {List, Avatar} from 'antd';
import MenuList from '@material-ui/icons/List';
import {Link} from "react-router-dom";
import {formsList, server, submittedForms} from '../Utils/Constants'
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

class FormList extends Component {
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

    componentDidMount() {
        let url = server + formsList
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': this.state.token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({'data': data.forms}));
    }

    render() {
        console.log(this.state.data)
        return (
            <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<MenuList/>}
                            title={<Link to={`/submitted/${item["_id"]}/list`}>{item.title}</Link>}
                        />
                    </List.Item>
                )}
            />
        )
    }
}

export default withCookies(FormList)
