import React from 'react';
import {connect} from 'react-redux';

import { Button } from 'antd';
import './MyDownloadFile.scss';

class MyDownloadFile extends React.Component {
    
    render(){

        function download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
          
            element.style.display = 'none';
            document.body.appendChild(element);
          
            element.click();
          
            document.body.removeChild(element);
          }          
          
        return(
            <div className="content-section implementation" style={{direction: 'rtl'}}>
                <div id="container" style={{direction: 'ltr'}}>
                    <Button type="primary" icon="download" onClick={(_e) => {download("analysis.txt", this.props.analysis_as_is)}}>הורדת ניתוח</Button>
                    <p></p>
			    </div>
                <p></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        analysis_as_is: state['myAnalyzeButton'].get('analysis_as_is'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDownloadFile);
