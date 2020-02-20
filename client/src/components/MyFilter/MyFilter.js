import React from 'react';
import MyFilterActions from "./actions";
import {connect} from 'react-redux';

import './MyFilter.scss';

import {MultiSelect} from 'primereact/multiselect';

class MyFilter extends React.Component {
    
    render(){
        return(
            <div className="lines" style={{direction: 'ltr'}}>
                <p></p>
                <MultiSelect
                    value={this.props.selected_options}
                    options={this.props.options}
                    onChange={(e) => this.props.ChangeOptionsEventHandler(e.value, this.props.options)}
                    style={{minWidth: '12em'}}
                    filter={true}
                    placeholder={"אפשרויות חיפוש"}>
                </MultiSelect>
                <p></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        options: state['myFilter'].get('options'),
        selected_options: state['myFilter'].get('selected_options'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ChangeOptionsEventHandler: (e) => {
            dispatch(MyFilterActions.changeOptions(e));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFilter);
