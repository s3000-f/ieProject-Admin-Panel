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

const { Option } = Select
class Asdsd extends Component {
    constructor() {
        super();
        this.state = {
            formItems: []
        }
    }
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
    normFile = e => {
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
    }

    componentWillMount() {
        let {id} = this.props.match.params
        let url = server + formsList + `/${id}`
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
            if (item.type === 'Text') {
                if (item.options){
                    ops = [];
                    for (let j in item.options) {
                        let op = item.options[j]
                        ops.push(<Option key={op.value} value={op.value} >{op.label}</Option>);
                    }
                    items.push(
                        <Row key={item.name}>
                            <Form.Item label={item.title} hasFeedback>
                                {getFieldDecorator(item.name, {
                                    rules: [{ required: true, message: `Please select ${item.title}` }],
                                })(
                                    <Select placeholder="Please select an Option">
                                        {ops}
                                    </Select>,
                                )}
                            </Form.Item>
                        </Row>,
                    );

                } else {
                    items.push(
                        <Row key={item.name}>
                        <Form.Item label={item.title}>
                            {getFieldDecorator(item.title, {
                                rules: [{required: !!item.required, message: `Please input your ${item.title}`}],
                            })(
                                <Input
                                    prefix={<Icon type="form" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder={item.title}
                                />,
                            )}
                        </Form.Item>
                        </Row>,
                    )
                }
            } else if (item.type === 'Location') {
                const style = {
                    width: '400px',
                    height: '400px',
                    margin: '16px'
                };
                ops = [];
                var sumlat = 0.0
                var sumlng = 0.0
                if (item.options) {
                    for (let j in item.options) {
                        let op = item.options[j]
                        let lat1 = parseFloat(op.value.lat)
                        let lng1 = parseFloat(op.value.long)
                        sumlat += lat1
                        sumlng += lng1
                        ops.push(<Marker
                            key={j}
                            title={op.label}
                            name={`item-${j}`}
                            position={{lat: lat1, lng: lng1}} />);
                    }
                    sumlat = sumlat / item.options.length
                    sumlng = sumlng / item.options.length
                }
                items.push(
                    <Row key={item.name} style={{height: 450}}>
                    <Form.Item label={item.title} >
                                <Map initialCenter={{lat: sumlat, lng:sumlng}} google={this.props.google} style={style} zoom={5}>
                                    {ops}
                                    <InfoWindow>
                                        <div>
                                            <h1>{item.title}</h1>
                                        </div>
                                    </InfoWindow>
                                </Map>
                    </Form.Item>
                    </Row>,

                )
            } else if (item.type === 'Number') {
                items.push(
                    <Row key={item.name}>
                    <Form.Item label={item.title}>
                        {getFieldDecorator(item.title, {
                            rules: [{required: !!item.required, message: `Please input your ${item.title}`}],
                        })(
                            <InputNumber onChange={this.onChangeNum()}/>,
                        )}
                    </Form.Item>
                    </Row>,
                )
            } else if (item.type === 'Date') {
                items.push(
                    <Row key={item.name}>
                    <Form.Item label={item.title}>
                        {getFieldDecorator(item.title, {
                            rules: [{required: !!item.required, message: `Please input your ${item.title}`}],
                        })(
                            <DatePicker onChange={this.handleChange()} placeholder={item.title}/>,
                        )}
                    </Form.Item>
                    </Row>,
                )
            }
        }
        this.setState({formItems: items})
        return items
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <h1> View </h1>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                {/*<Form onSubmit={this.handleSubmit} className="login-form">*/}
                    <Row gutter={24}>
                        {this.state.formItems}
                    </Row>

                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        )
    }
}

const mapWrapper = GoogleApiWrapper({
    apiKey: ("AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28")
})(Asdsd)
const ViewForm = Form.create({ name: 'validate_other' })(mapWrapper);

export default withRouter(ViewForm)







