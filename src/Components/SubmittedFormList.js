import React, {Component} from 'react'
import {List, Avatar, Button} from 'antd';
import MenuList from '@material-ui/icons/List';
import {Link} from "react-router-dom";
import {server, formsList} from '../Utils/Constants'
import {
    withRouter
} from "react-router";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

class SubmittedFormList extends Component {
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
        let {id} = this.props.match.params
        let url = server + formsList + `/${id}/list`
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': this.state.token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({'data': data}));
    }

    deleteItem = e => {
        let {eid} = e.target.dataset
        let {id} = this.props.match.params
        console.log(eid)
        // eslint-disable-next-line no-restricted-globals
        let con = confirm('Are you sure?')
        if (con) {
            let url = server + formsList + `/${id}/list/${eid}`
            fetch(url, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.result === "ok"){
                        let dat = []
                        this.state.data.forEach(item => {
                            if (item["_id"] !== eid) {
                                dat.push(item)
                            }
                        })
                        this.setState({'data': dat})
                    }

                });
        }
    }

    render() {

        return (
            <List
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                    <List.Item
                        key = {item["_id"]}
                        actions={[<Button data-eid={item["_id"]} icon="delete" type="danger" onClick={this.deleteItem}/>]}
                    >
                        <List.Item.Meta
                            avatar={<MenuList/>}
                            title={<Link
                                to={`/submitted/${this.props.match.params.id}/view/${item["_id"]}`}>{item.username}</Link>}
                        />
                    </List.Item>
                )}
            />
        )
    }
}

export default withCookies(withRouter(SubmittedFormList))
