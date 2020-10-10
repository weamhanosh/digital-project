import React from 'react';
import MyFileUploadActions from "./actions";
import {connect} from 'react-redux';
import './MyFileUpload.scss';

class MyFileUpload extends React.Component {
     
    render(){

        return(
            <div className="text_area">
                <div className="content-section implementation">
                    <p></p>
                    <input type="file" id="files" style={{width: "370px"}} name="file" multiple={true} accept="text/plain" onChange={this.props.UploadEventHandler}/>
                </div>
                <p></p>
                <p></p>
            </div>
        );
    }
}

async function read_files(files){
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

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        UploadEventHandler: async (files) => {
            let res = read_files(files);
            res
            .then((data) => {
                dispatch(MyFileUploadActions.updateFiles(data.names, data.results));
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFileUpload);
