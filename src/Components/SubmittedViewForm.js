import React, {Component} from 'react'
import {
    withRouter
} from "react-router";
import {
    Form,
    Select,
    InputNumber,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Icon,
    Rate,
    Checkbox,
    Row,
    Col,
    DatePicker,
    Input
} from 'antd';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {server, formsList} from "../Utils/Constants";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

const {Option} = Select

class Asdsd extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            token: cookies.get('token') || 'Ben',
            formItems: []
        };
    }

    csvButton = e => {
        let {id, vid} = this.props.match.params
        let url = server + formsList + `/${id}/list/${vid}/csv`
        window.open(url, "_blank")
    }

    componentWillMount() {
        let {id, vid} = this.props.match.params
        let url = server + formsList + `/${id}/list/${vid}`
        console.log(url)
        fetch(url, {
            method: 'GET',
            headers: {
                'x-access-token': this.state.token
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({form: data})
                this.buildForm()
            })
    }

    buildForm = () => {
        let ops;
        const {getFieldDecorator} = this.props.form;
        let fields = this.state.form.fields
        var items = []
        var numericSum = 0
        for (let i in fields) {
            let item = fields[i]
            if (item.type === 'Number') {
                numericSum += parseInt(item.value, 10)
            }
            if (item.type === 'Location') {
                const style = {
                    width: '400px',
                    height: '400px',
                    margin: '16px'
                };
                ops = [];
                var sumlat = 0.0
                var sumlng = 0.0
                let vals = item.value.split('&')
                sumlat = parseFloat(vals[0].split('=')[1])
                sumlng = parseFloat(vals[1].split('=')[1])
                ops.push(<Marker
                    title={item.title}
                    name={item.name}
                    position={{lat: sumlat, lng: sumlng}}/>);
                items.push(
                    <Row key={item.name} style={{height: 450}}>
                        <span>{item.title}:</span>
                        <br/>
                        <Map initialCenter={{lat: sumlat, lng: sumlng}} google={this.props.google} style={style}
                             zoom={5}>
                            {ops}
                            <InfoWindow>
                                <div>
                                    <h1>{item.title}</h1>
                                </div>
                            </InfoWindow>
                        </Map>
                    </Row>,
                )
            } else {
                items.push(
                    <Row key={item.name}>
                        <div style={{borderColor: "grey", borderStyle: "solid", borderWidth: "1px", borderRadius: "20px", padding: "10px", margin: "10px"}}>
                                <span>
                                    {item.title}:
                                </span>
                            <span>
                                    &nbsp; {item.value}
                                </span>
                        </div>
                    </Row>,
                )

            }
        }
        this.setState({formItems: items, sum: numericSum})
        return items
    }

    render() {
        return (
            <div>
                {this.state.formItems}
                <Row>
                    <div style={{borderColor: "grey", borderStyle: "solid", borderWidth: "1px", borderRadius: "20px", padding: "10px", margin: "10px"}}>
                                <span>
                                    Sum Of Numeric Fields:
                                </span>
                        <span>
                                    &nbsp; {this.state.sum}
                                </span>
                    </div>
                </Row>
                <Row style={{margin: "20px"}}>
                    <Button onClick={this.csvButton}>
                        Get CSV
                    </Button>
                </Row>
            </div>
        )
    }
}

const mapWrapper = GoogleApiWrapper({
    apiKey: ("AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28")
})(Asdsd)
const SubmittedViewForm = Form.create({name: 'validate_other'})(mapWrapper);

export default withCookies(withRouter(SubmittedViewForm))







