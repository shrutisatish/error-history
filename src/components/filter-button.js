import React, { Component } from 'react'
import { faFilter} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class FilterButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected:this.props.list,
            expanded: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected) {
            this.setState({
                selected: nextProps.selected,
                expanded: nextProps.activeFilterButton === this.props.column_name
            });
        }
    }

    handleButtonFilterChange = (index, event) => {
        let filterItem = this.props.list[index];
            let selected = this.state.selected;
        if (this.isChecked(filterItem)) {
            selected.splice(selected.indexOf(filterItem), 1);
        } else {
            selected.push(filterItem);
        }
        return this.setState({
            selected
        }, () => {
            this.props.onFilterChange(this.props.column_name, this.state.selected)

        });
    }

    isChecked = (filterValue) => {
        return this.state.selected.indexOf(filterValue) > -1;
    }

    selectAll = (event) => {
        return this.setState({
            selected: this.props.list
        }, () => {
            this.props.onFilterChange(this.props.column_name, this.state.selected)
        });
    }

    unSelectAll = (event) => {
        return this.setState({
            selected: []
        }, () => {
            this.props.onFilterChange(this.props.column_name, this.state.selected)
        });
    }

    isSelectAllChecked = () => {
        let checked = true;
        if (this.state.selected.length === this.props.list.length) {
            return checked;
        } else if (this.state.selected.length < this.props.list.length) {
            return !checked;
        }
    }

    openDropdown = () => {
        this.props.resetFilterButton(this.props.column_name);
    }

    closeDropdown = (event) => {
        event.preventDefault();
        return this.setState({
            expanded: false
        });
    }
    
    render() {
        return (
            <div className="filter-btn" onClick={this.handleDefault}>
                <FontAwesomeIcon icon={faFilter} onClick={this.openDropdown} />
                {(this.state.expanded) && (
                    <div className="option-list">
                        <span className="btn-close" onClick={this.closeDropdown}>X</span>
                        <p>Choose Filters</p>
                        <ul>
                            <div>
                                {((this.state.selected.length < this.props.list.length) && (
                                    <label className="main-label"><input type="checkbox" onChange={this.selectAll} checked={this.isSelectAllChecked()}/>Select All</label>
                                ))}
                                {((this.state.selected.length >= this.props.list.length) && (
                                    <label className="main-label"><input type="checkbox" onChange={this.unSelectAll} checked={this.isSelectAllChecked()}/>Unselect All
                                    </label>
                                ))}
                            
                                { this.props.list.map((key, index) => 
                                    <li className="main-label-random" key={key + index}>
                                        <input type="checkbox" onChange={this.handleButtonFilterChange.bind(this, index)} checked={this.isChecked(key)}/>{key}
                                    </li>
                                )}
                            </div>
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}
