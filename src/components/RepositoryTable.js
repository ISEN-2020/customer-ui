import React, { Component } from 'react';
import MaterialTable from 'material-table'
import {CastByteToNumber} from '../helpers.js'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';

const columns=[
    { title: 'Name', field: 'bookname' },
    { title: 'Autor', field: 'bookauteur'},

    { title: 'Description', field: 'bookdescription', render: rowData => {
            return (rowData.bookdescription) ? rowData.bookdescription : 'No description available :('
        }
    },
    { title: 'Available', field: 'bookavailable', render: rowData => {
        return (rowData.bookavailable) ? <CheckCircleIcon /> : <CancelIcon />
        } 
    }
]




const items = [
    {bookname: 'Toto', bookauteur: 'Maxime K',bookdescription:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ', bookpublication: '09/09/2022', bookavailable: true},
    {bookname: 'Toto2', bookauteur: 'Budimir U',bookpublication: '09/09/2022', bookavailable: false}
]

const options = {
    pageSize: items.length
};

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
        <div>
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
        </div>
    );
  }

  }
  export default RepositoryTable