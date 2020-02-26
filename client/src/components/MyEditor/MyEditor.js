import React from 'react';
import MyEditorActions from "./actions";
import {connect} from 'react-redux';

import './MyEditor.scss';

import { Input } from 'antd';
const { TextArea } = Input;

class MyEditor extends React.Component {
    
    render(){
        return(
            <div className="content-section implementation" style={{direction: 'rtl'}}>
                <p></p>
                <div className="lines">
                    <TextArea
                        value={this.props.text}
                        onChange={this.props.EditTextEventHandler}
                        placeholder="טקסט לניתוח"
                        autoSize
                    />                    
                </div>
                <p></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        text: state['myEditor'].get('text')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        EditTextEventHandler: (e) => {
            e.persist();
            dispatch(MyEditorActions.editTextField(e.target.value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyEditor);
