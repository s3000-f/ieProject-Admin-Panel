import React from 'react';
// import logo from './logo.svg';
import './App.css';
import FormTest from './Components/FormTest'
import FormList from './Components/FormList'
import ViewForm from './Components/ViewForm'
import MenuIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import MenuView from '@material-ui/icons/Edit';
import MenuList from '@material-ui/icons/List';
import SubmittedFormList from "./Components/SubmittedFormList";
import { withCookies, Cookies } from 'react-cookie';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ButtonAppBar from './Components/ButtonAppBar'
import SubmittedViewForm from "./Components/SubmittedViewForm";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            icon: MenuIcon

        }
        this.swap = this.swap.bind(this)
    }

    swap(page) {
        if (page === "test") {
            this.setState({icon: MenuIcon})
        } else if (page === "list") {
            this.setState({icon: MenuList})
        } else if (page === "view") {
            this.setState({icon: MenuView})
        } else {
            this.setState({icon: MenuView})
        }
    }

    static center = {
        textAlign: 'center',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    }

    render() {
        return (

            <Router>

                <Container>

                    <ButtonAppBar icon="Admin Panel"/>
                    <Container>
                        {/*<Box style={this.center} my={8}>*/}
                        {/*  <Typography variant="h4" component="h1" gutterBottom>*/}
                        {/*    Select A Form To Fill Out*/}
                        {/*  </Typography>*/}
                        {/*</Box>*/}
                        <div>

                            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                            <Switch>
                                <Route path="/view/:id">
                                    {/*{this.swap("view")}*/}
                                    <ViewForm/>
                                </Route>
                                <Route path="/submitted/:id/list">
                                    <SubmittedFormList/>
                                </Route>
                                <Route path="/submitted/:id/view/:vid">
                                    <SubmittedViewForm/>
                                </Route>
                                <Route path="/list">
                                    {/*{this.swap("list")}*/}
                                    <FormList/>
                                </Route>
                                <Route exact path="/">
                                    {/*{this.swap("test")}*/}
                                    <FormTest/>
                                </Route>
                                <Route path="*">
                                    <Box style={App.center} my={8}>
                                        <Typography variant="h4" component="h1" gutterBottom>
                                            404
                                            <br/>
                                            Page Not Found
                                        </Typography>
                                    </Box>
                                </Route>
                            </Switch>
                        </div>
                    </Container>

                </Container>
            </Router>
        );
    }
}

// function App() {
//   return (
//     {/*<div className="App">*/}
//       {/*<header className="App-header">*/}
//         {/*<img src={logo} className="App-logo" alt="logo" />*/}
//         {/*<p>*/}
//           {/*Edit <code>src/App.js</code> and save to reload.*/}
//         {/*</p>*/}
//         {/*<a*/}
//           {/*className="App-link"*/}
//           {/*href="https://reactjs.org"*/}
//           {/*target="_blank"*/}
//           {/*rel="noopener noreferrer"*/}
//         {/*>*/}
//           {/*Learn React*/}
//         {/*</a>*/}
//       {/*</header>*/}
//       {/*<main>*/}
//         {/*<FormTest />*/}
//       {/*</main>*/}
//     {/*</div>*/}

// );
// }

export default withCookies(App);
