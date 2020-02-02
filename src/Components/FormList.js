import React, {Component} from 'react'
import {List, Avatar} from 'antd';
import MenuList from '@material-ui/icons/List';
import {Link} from "react-router-dom";
import {formsList, server, submittedForms} from '../Utils/Constants'

class FormList extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        let url = server + formsList
        console.log(url)
        fetch(url)
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

export default FormList
