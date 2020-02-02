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

const {Option} = Select

class Asdsd extends Component {
    constructor() {
        super();
        this.state = {
            formItems: []
        }
    }

    /*
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    let {id} = this.props.match.params
                    fetch(`http://localhost:3002/api/forms/${id}`, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'no-cors', // no-cors, *cors, same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        redirect: 'follow', // manual, *follow, error
                        referrerPolicy: 'no-referrer', // no-referrer, *client
                        body: JSON.stringify(values) // body data type must match "Content-Type" header
                    }).then(r => console.log(r));
                }
            });
        };
    */

    /*normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    handleChange = (date, dateString) => {
        console.log(date, dateString);

    }
    handleSelect = (value) => {
        console.log(`selected ${value}`);
        this.setState({selectedShit: value})
    }
    onChangeNum = (value) => {
        console.log(value)
    }*/

    componentWillMount() {
        let {id, vid} = this.props.match.params
        let url = server + formsList + `/${id}/list/${vid}`
        console.log(url)
        fetch(url)
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
        for (let i in fields) {
            let item = fields[i]
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
        this.setState({formItems: items})
        return items
    }

    render() {
        return (
            <div>
                {this.state.formItems}
            </div>
        )
    }
}

const mapWrapper = GoogleApiWrapper({
    apiKey: ("AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28")
})(Asdsd)
const SubmittedViewForm = Form.create({name: 'validate_other'})(mapWrapper);

export default withRouter(SubmittedViewForm)







