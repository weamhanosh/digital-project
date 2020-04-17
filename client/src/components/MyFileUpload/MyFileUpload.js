import React from 'react';
import MyFileUploadActions from "./actions";
import {connect} from 'react-redux';
// import {ProgressBar} from 'primereact/progressbar';


import './MyFileUpload.scss';

// import { Button } from 'antd';

class MyFileUpload extends React.Component {
     
    render(){

        return(
            <div className="text_area">
                <div className="content-section implementation">
                    <p></p>
                    {/* <Button type="primary" icon="experiment"
                        disabled={(this.props.render_progress_bar && (!this.props.done)) || (this.props.failed)}
                        onClick={() => {this.props.UploadAndAnalyseTextEventHandler(this.props.text)}} style={{direction: 'ltr'}}>
                            נתח
                    </Button> */}
                     <input type="file" id="files" style={{width: "370px"}} name="file" multiple={true} accept="text/plain" onChange={this.props.UploadEventHandler}/>
                </div>
                <p></p>
                {/* {this.props.render_progress_bar && (!this.props.done) && <ProgressBar mode="indeterminate" style={{height: '6px'}}></ProgressBar>} */}
                <p></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // render_progress_bar: state['myFileUpload'].get('render_progress_bar'),
        // text: state['myEditor'].get('text'),
        // answer: state['myFileUpload'].get('answer'),
        // done: state['myFileUpload'].get('done'),
        // failed: state['myFileUpload'].get('failed')
    }
};

async function a(files){
    let names = [];
    let results = [];
    let tmp = files.target.files;
    for (let i = 0; i < tmp.length; i++){
        if (tmp[i] && tmp[i].type === "text/plain"){
            const name = tmp[i].name;
            await tmp[i].text()
            .then((res) => {
                names.push(name);
                results.push(res);
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    return {names, results};
}

const mapDispatchToProps = (dispatch) => {
    return {
        UploadEventHandler: async (files) => {
            let res = a(files);
            res
            .then((data) => {
                dispatch(MyFileUploadActions.updateFiles(data.names, data.results));
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFileUpload);
