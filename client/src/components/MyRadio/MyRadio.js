import React from 'react';
import MyRadioActions from "./actions";
import {connect} from 'react-redux';

import './MyRadio.scss';

import { Radio } from 'antd';

class MyRadio extends React.Component {
    
    render(){
        return(
            <div className="content-section implementation" style={{direction: 'rtl'}}>
                <Radio.Group onChange={(e) => this.props.InputEventHandler(e)} value={this.props.render_editor}>
                    <Radio style={{display: 'block', height: '30px', lineHeight: '30px'}} value={true}>
                        הזנת טקסט
                    </Radio>
                    <Radio style={{display: 'block', height: '30px', lineHeight: '30px'}} value={false}>
                        העלאת קובץ טקסט
                    </Radio>
                </Radio.Group>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        render_editor: state['myRadio'].get('render_editor')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        InputEventHandler: (e) => {
            dispatch(MyRadioActions.changeInput(e.target.value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRadio);
