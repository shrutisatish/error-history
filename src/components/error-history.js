import React, { Component } from 'react'
import update from 'react-addons-update';
import FilterButton from './filter-button'
import uniq from 'lodash.uniq';

import { data } from './../data'

export default class ErrorHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors : [],
            errorsTotal:[],
            loaded : false,
            activeFilterButton : null,
        }
    }

    componentDidMount = () => {
        this.setState({
            errors: data,
            errorsTotal: data
        })
    }

    listItems = (column_name) => {
        return uniq(this.state.errorsTotal.map(error => error[column_name]))
    }

    selectedItems = (column_name) => {
        return uniq(this.state.errors.map(error => error[column_name]));
    }
    
    resetFilterButton = (column_name) => {
        this.setState({
            activeFilterButton : column_name
        });
    }
    
    onFilterChange = (column_name, selected) => {
        let selectedCheckboxError = this.searchErrors(column_name, selected)
        this.setState(update(this.state, {
            errors: {
                $set : selectedCheckboxError
            }
        }));
    }
    
    searchErrors(column_name, selected) {
        let filtered = this.state.errorsTotal.filter((error) => {
            return selected.indexOf(error[column_name]) > -1
        });
        return filtered;
    }

    render() {
        return (
                <div className="errors" onClick={this.handleDefault}>
                    {   
                        <div>
                        <h1>Error History</h1>
                        <span className="errors-count">Total Number of Errors: {this.state.errors.length}</span>
                            <table className="error-table">
                            <thead>
                                <tr className='error-item'>
                                    <th><FilterButton list={this.listItems('errmsg')} selected={this.selectedItems('errmsg')} column_name='errmsg' onFilterChange={this.onFilterChange} resetFilterButton={this.resetFilterButton} activeFilterButton={this.state.activeFilterButton}/>Errors</th>
                                    <th><FilterButton list={this.listItems('product_line')} selected={this.selectedItems('product_line')} column_name='product_line' onFilterChange={this.onFilterChange} resetFilterButton={this.resetFilterButton} activeFilterButton={this.state.activeFilterButton}/>Production Line</th>
                                    <th><FilterButton list={this.listItems('area')} selected={this.selectedItems('area')} column_name='area' onFilterChange={this.onFilterChange} resetFilterButton={this.resetFilterButton} activeFilterButton={this.state.activeFilterButton}/>Area</th>
                                    <th><FilterButton list={this.listItems('workspace')} selected={this.selectedItems('workspace')} column_name='workspace' onFilterChange={this.onFilterChange} resetFilterButton={this.resetFilterButton} activeFilterButton={this.state.activeFilterButton}/>Test Station</th>
                                    <th><FilterButton list={this.listItems('container')} selected={this.selectedItems('container')} column_name='container' onFilterChange={this.onFilterChange} resetFilterButton={this.resetFilterButton} activeFilterButton={this.state.activeFilterButton}/>Container</th>
                                    <th><FilterButton list={this.listItems('timestamp')} selected={this.selectedItems('timestamp')} column_name='timestamp' onFilterChange={this.onFilterChange} resetFilterButton={this.resetFilterButton} activeFilterButton={this.state.activeFilterButton}/>Timestamp</th>
                                </tr>
        
                            </thead>
                            <tbody>
                                {
                                    this.state.errors.map((a, index) => {
                                        return <tr className='error-item' key={index}>
                                                    <td>{a.errmsg}</td>
                                                    <td>{a.product_line}</td>
                                                    <td>{a.area}</td>
                                                    <td>{a.workspace}</td>
                                                    <td>{a.container}</td>
                                                    <td>{a.timestamp.toString() || a.timestamp}</td>
                                                </tr>
                                        })
                                }
                            </tbody>
        
                            </table>
                        </div>
                    }
                </div>
            );
    
        }
}