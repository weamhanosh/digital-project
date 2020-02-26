import React from 'react';
import {connect} from 'react-redux';
import logo from './TestTube.ico';
import './App.css';
import MyEditor from "../MyEditor";
import MyAnalyzeButton from "../MyAnalyzeButton";
import MyPopover from "../MyPopover";
import MyFilter from "../MyFilter";
import MyDownloadFile from '../MyDownloadFile';
import { Button, Result, Icon, Popover } from 'antd';

class App extends React.Component {

    render() {
                
        return (
            <div className="App">
                <div className="App-header">
                    <a className="App-link" href="https://www.lit-lab.bgu.ac.il/" target="_blank" rel="noopener noreferrer">
                        <h1 style={{color: "#2e81ff"}}>יותר מדי מילים</h1>
                        <img src={logo} className="App-logo" alt="logo"/>
                    </a>
                </div>
                <Popover
                        title={<p style={{color: "#2e81ff", direction: 'rtl'}}>הוראות שימוש</p>}
                        content={
                            <div>
                                <p style={{color: "#2e81ff", direction: 'rtl'}}>יש להזין טקסט עבורו נדרש הניתוח וללחוץ על "נתח"</p>
                                <p style={{color: "#2e81ff", direction: 'rtl'}}>ניתן לסנן את תוצאות הניתוח באמצעות "אפשרויות חיפוש"</p>
                                <p style={{color: "#2e81ff", direction: 'rtl'}}>לאחר קבלת תוצאות הניתוח יש להזיז את העכבר אל התוצאה הרצויה על מנת לקבל את הניתוח עבור תוצאה זו</p>
                                <p style={{color: "#2e81ff", direction: 'rtl'}}>ניתן ללחוץ על אחד מכפתורי ההורדה על מנת להוריד את הניתוח המבוקש</p>
                                <p style={{color: "#2e81ff", direction: 'rtl'}}></p>
                                <p style={{color: "#2e81ff", direction: 'rtl'}}></p>
                            </div>
                        }
                        // trigger="click"
                        trigger="hover"
                    >
                        <Icon type="question-circle" />
                    </Popover>
                <MyEditor/>
                <MyFilter/>
                <MyAnalyzeButton/>
                {this.props.done &&
                    <MyDownloadFile/>
                }
                <MyPopover/>
                {this.props.failed &&
                    <Result
                        status="error"
                        title="פעולה נכשלה"
                        extra={[
                            <Button type="primary" onClick={() => window.location.reload(false)}>
                                רענן דף
                            </Button>
                        ]}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        failed: state['myAnalyzeButton'].get('failed'),
        done: state['myAnalyzeButton'].get('done'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

