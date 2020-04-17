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

          function filter_analysis(analysis_as_is, selected_options) {
            if (selected_options.length === 0){
                return "";
            } else {
                let filtered_analysis = "";
                let analysis_arr = analysis_as_is.split('\n');
                let used = Array(analysis_arr.length).fill(0);
                for (let i = 0; i < analysis_arr.length; i++){
                    for (let j = 0; j < selected_options.length; j++){
                        if (analysis_arr[i].includes(selected_options[j]) && used[i] === 0){
                            filtered_analysis = (filtered_analysis.concat(analysis_arr[i])).concat('\n');
                            used[i] = 1;
                        }
                    }
                }
                return filtered_analysis;
            }
        }

        function get_lemma(answer) {
            let list_to_return = "";
            for (let i = 0; i < answer.length; i++){
                list_to_return = (list_to_return.concat(answer[i].word_in_text)).concat('\n');
            }
            return list_to_return;
        }

        function get_lexeme(answer) {
            let list_to_return = "";
            for (let i = 0; i < answer.length; i++){
                list_to_return = (list_to_return.concat(answer[i].root)).concat('\n');
            }
            return list_to_return;
        }

        function get_lemma_with_analysis(answer) {
            let list_to_return = "";
            for (let i = 0; i < answer.length; i++){
                list_to_return = (((list_to_return.concat(answer[i].word_in_text)).concat(" ")).concat(answer[i].analysis)).concat('\n');
            }
            return list_to_return;
        }

        function get_lexeme_with_analysis(answer) {
            let list_to_return = "";
            for (let i = 0; i < answer.length; i++){
                list_to_return = (((list_to_return.concat(answer[i].root)).concat(" ")).concat(answer[i].analysis)).concat('\n');
            }
            return list_to_return;
        }

        function get_lemma_with_filters(answer, selected_options) {
            let list_to_return = "";
            let used = Array(answer.length).fill(0);
            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < selected_options.length; j++){
                    if (answer[i].analysis.includes(selected_options[j]) && used[i] === 0) {
                        list_to_return = (list_to_return.concat(answer[i].word_in_text)).concat('\n');
                        used[i] = 1;
                    }
                }
            }
            return list_to_return;
        }

        function get_lexeme_with_filters(answer, selected_options) {
            let list_to_return = "";
            let used = Array(answer.length).fill(0);
            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < selected_options.length; j++){
                    if (answer[i].analysis.includes(selected_options[j]) && used[i] === 0) {
                        list_to_return = (list_to_return.concat(answer[i].root)).concat('\n');
                        used[i] = 1;
                    }
                }
            }
            return list_to_return;
        }

        function get_lemma_with_analysis_and_filters(answer, selected_options) {
            let list_to_return = "";
            let used = Array(answer.length).fill(0);
            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < selected_options.length; j++){
                    if (answer[i].analysis.includes(selected_options[j]) && used[i] === 0) {
                        list_to_return = (((list_to_return.concat(answer[i].word_in_text)).concat(" ")).concat(answer[i].analysis)).concat('\n');
                        used[i] = 1;
                    }
                }
            }
            return list_to_return;
        }

        function get_lexeme_with_analysis_and_filters(answer, selected_options) {
            let list_to_return = "";
            let used = Array(answer.length).fill(0);
            for (let i = 0; i < answer.length; i++){
                for (let j = 0; j < selected_options.length; j++){
                    if (answer[i].analysis.includes(selected_options[j]) && used[i] === 0) {
                        list_to_return = (((list_to_return.concat(answer[i].root)).concat(" ")).concat(answer[i].analysis)).concat('\n');
                        used[i] = 1;
                    }
                }
            }
            return list_to_return;
        }

        function download_helper (array_to_download, file_name_array, identifier) {
            let all_download_array = [];
            for (let i = 0; i < array_to_download.length; i++){
                all_download_array[i] = "File name: " + file_name_array[i] + "\n" + identifier + ": \n" + array_to_download[i];
            }
            let all_downloads = all_download_array.join("\n\n_________________________________________________________________________\n\n");
            return all_downloads;
        }

        return(
            <div className="content-section implementation" style={{direction: 'rtl'}}>
                {this.props.render_editor ?
                    <div>
                        <div className="lines" id="container" style={{direction: 'ltr'}}>
                            <Button type="primary" icon="download" onClick={(_e) => {download("filtered_analysis.txt", filter_analysis(this.props.analysis_as_is, this.props.selected_options))}}>הורדת כל הניתוח אחרי פילטר</Button>
                            <p></p>
                            <Button type="primary" icon="download" onClick={(_e) => {download("analysis.txt", this.props.analysis_as_is)}}>הורדת כל הניתוח</Button>
                        </div>
                        <p></p>
                        <div className="lines" id="container" style={{direction: 'ltr'}}>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lemma_with_analysis_and_filters.txt", get_lemma_with_analysis_and_filters(this.props.answer, this.props.selected_options))}}>הורדת לימות עם ניתוח ואחרי פילטר</Button>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lemma_with_filters.txt", get_lemma_with_filters(this.props.answer, this.props.selected_options))}}>הורדת לימות אחרי פילטר</Button>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lemma_with_analysis.txt", get_lemma_with_analysis(this.props.answer))}}>הורדת לימות עם ניתוח</Button>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lemma.txt", get_lemma(this.props.answer))}}>הורדת לימות</Button>
                        </div>
                        <p></p>
                        <div className="lines" id="container" style={{direction: 'ltr'}}>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lexeme_with_analysis_and_filters.txt", get_lexeme_with_analysis_and_filters(this.props.answer, this.props.selected_options))}}>הורדת לקסמות עם ניתוח ואחרי פילטר</Button>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lexeme_with_filters.txt", get_lexeme_with_filters(this.props.answer, this.props.selected_options))}}>הורדת לקסמות אחרי פילטר</Button>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lexeme_with_analysis.txt", get_lexeme_with_analysis(this.props.answer))}}>הורדת לקסמות עם ניתוח</Button>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lexeme.txt", get_lexeme(this.props.answer))}}>הורדת לקסמות</Button>
                        </div>
                        <p></p>
                    </div>:
                    <div>
                        <div className="lines" id="container" style={{direction: 'ltr'}}>
                            <Button type="primary" icon="download" onClick={(_e) => {download("filtered_analysis.txt", download_helper((this.props.analysis_as_is_array).map((element) => filter_analysis(element, this.props.selected_options)), this.props.file_name_array, "Filtered analysis"))}}>הורדת כל הניתוחים אחרי פילטר</Button>
                            <p></p>
                            <Button type="primary" icon="download" onClick={(_e) => {download("analysis.txt", download_helper(this.props.analysis_as_is_array, this.props.file_name_array, "Analysis"))}}>הורדת כל הניתוחים</Button>
                        </div>
                        <p></p>
                        <div className="lines" id="container" style={{direction: 'ltr'}}>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lemma_with_analysis_and_filters.txt", download_helper((this.props.answer_array).map((element) => get_lemma_with_analysis_and_filters(element, this.props.selected_options)), this.props.file_name_array, "Lemmas with analysis and filters"))}}>הורדת לימות עם ניתוחים ואחרי פילטר</Button>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lemma_with_filters.txt", download_helper((this.props.answer_array).map((element) => get_lemma_with_filters(element, this.props.selected_options)), this.props.file_name_array, "Lemmas with filters"))}}>הורדת לימות אחרי פילטר</Button>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lemma_with_analysis.txt", download_helper((this.props.answer_array).map((element) => get_lemma_with_analysis(element, this.props.selected_options)), this.props.file_name_array, "Lemmas with analysis"))}}>הורדת לימות עם ניתוחים</Button>
                            <Button type="primary" icon="download" onClick={(_e) => {download("lemma.txt", download_helper((this.props.answer_array).map((element) => get_lemma(element)), this.props.file_name_array, "Lemmas"))}}>הורדת לימות</Button>
                        </div>
                        <p></p>
                        <div className="lines" id="container" style={{direction: 'ltr'}}>
                                <Button type="primary" icon="download" onClick={(_e) => {download("lexeme_with_analysis_and_filters.txt", download_helper((this.props.answer_array).map((element) => get_lexeme_with_analysis_and_filters(element, this.props.selected_options)), this.props.file_name_array, "Lexemes with analysis and filters"))}}>הורדת לקסמות עם ניתוחים ואחרי פילטר</Button>
                                <Button type="primary" icon="download" onClick={(_e) => {download("lexeme_with_filters.txt", download_helper((this.props.answer_array).map((element) => get_lexeme_with_filters(element, this.props.selected_options)), this.props.file_name_array, "Lexemes with filters"))}}>הורדת לקסמות אחרי פילטר</Button>
                                <Button type="primary" icon="download" onClick={(_e) => {download("lexeme_with_analysis.txt", download_helper((this.props.answer_array).map((element) => get_lexeme_with_analysis(element, this.props.selected_options)), this.props.file_name_array, "Lexemes with analysis"))}}>הורדת לקסמות עם ניתוחים</Button>
                                <Button type="primary" icon="download" onClick={(_e) => {download("lexeme.txt", download_helper((this.props.answer_array).map((element) => get_lexeme(element)), this.props.file_name_array, "Lexemes"))}}>הורדת לקסמות</Button>
                        </div>
                    </div>}
                <p></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        file_name_array: state['myAnalyzeButton'].get('file_name_array'),
        analysis_as_is_array: state['myAnalyzeButton'].get('analysis_as_is_array'),
        analysis_as_is: state['myAnalyzeButton'].get('analysis_as_is'),
        answer: state['myAnalyzeButton'].get('answer'),
        answer_array: state['myAnalyzeButton'].get('answer_array'),
        selected_options: state['myFilter'].get('selected_options'),
        render_editor: state['myRadio'].get('render_editor')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDownloadFile);
