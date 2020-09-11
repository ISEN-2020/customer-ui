import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import NavBar from './components/NavBar'
import RepositoryTable from './components/RepositoryTable'
import TagsTable from './components/TagsTable'
import ManifestCard from './components/ManifestCard'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import 'typeface-roboto';

class App extends Component {

    constructor(props) {
        super(props);
        this.tagTable = React.createRef();
        this.manifestCard = React.createRef();
    }

    clickRepository = (event, rowData) => {
        this.tagTable.current.setRepo(rowData.repo)
    }

    clickTag = (event, rowData) => {
        this.manifestCard.current.setManifest(rowData)
    }

    render() {
        return (
            <Router>
                <div>
                <Route exact path="/" component={SignUp} />
                <Route path="/composant_1" component={ManifestCard} />
                <Route path="/composant_2" component={RepositoryTable} />
                </div>
            </Router>
        );
    }
}

export default App;
