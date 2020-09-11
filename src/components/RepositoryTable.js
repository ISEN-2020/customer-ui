import React, { Component } from 'react';
import MaterialTable from 'material-table'
import {CastByteToNumber} from '../helpers.js'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const columns=[
    { title: 'Name', field: 'bookname' },
    { title: 'Autor', field: 'bookauteur'},
    { title: 'Available', field: 'bookavailable', render: rowData => {
        return (rowData.bookavailable) ? <CheckCircleIcon /> : <CancelIcon />
        } 
    }
]

const options = {
    pageSize: 10
};

const items = [
    {bookname: 'toto', bookauteur: 'Maxime K', bookavailable: true},
    {bookname: 'toto2', bookauteur: 'Budimir U', bookavailable: false}
]

class RepositoryTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.onClick = props.onClick
    }

    componentDidMount() {

        this.setState({
            isLoaded: true,
            items: items
                });
                /*
        fetch("/api/repositories")
            .then(res => res.json())
            .then((result) => {

                this.setState({
                    isLoaded: true,
                    items: result.data
                });
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
            });
            }
        )*/
    }



  render() {
    return (
        <MaterialTable
          title={"Book Market"}
          data={this.state.items}
          columns={columns}
          options={options}
          onRowClick={this.onClick}
          localization={{
            body: {
                emptyDataSourceMessage: 'Loading repositories...',
            },
            }}
        />
    );
  }
  }
  export default RepositoryTable