import React from 'react';
import MyAnalyzeButtonActions from "./actions";
import {connect} from 'react-redux';
import {ProgressBar} from 'primereact/progressbar';


import './MyAnalyzeButton.scss';

import { Button } from 'antd';

class MyAnalyzeButton extends React.Component {
     
    render(){

        return(
            <div className="text_area">
                <div className="content-section implementation" style={{direction: 'rtl'}}>
                    <p></p>
                    <Button type="primary" icon="experiment"
                        disabled={(this.props.render_progress_bar && (!this.props.done)) || (this.props.failed)}
                        onClick={() => {this.props.UploadAndAnalyseTextEventHandler(this.props.text)}} style={{direction: 'ltr'}}>
                            נתח
                    </Button>
                </div>
                <p></p>
                {this.props.render_progress_bar && (!this.props.done) && <ProgressBar mode="indeterminate" style={{height: '6px'}}></ProgressBar>}
                <p></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        render_progress_bar: state['myAnalyzeButton'].get('render_progress_bar'),
        text: state['myEditor'].get('text'),
        answer: state['myAnalyzeButton'].get('answer'),
        done: state['myAnalyzeButton'].get('done'),
        failed: state['myAnalyzeButton'].get('failed')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        UploadAndAnalyseTextEventHandler: (text) => {
            dispatch(MyAnalyzeButtonActions.uploadAction(text));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAnalyzeButton);
