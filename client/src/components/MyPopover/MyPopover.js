import React from 'react';
import {connect} from 'react-redux';

import './MyPopover.scss';

import { Popover } from 'antd';

class MyPopover extends React.Component {
    
    one_word_renderer(word, word_without_starts, analysis, word_root, context, file_name=undefined){
        return(
        <Popover
            title={<p style={{color: "#2e81ff", direction: 'rtl'}}>{context.before}{<mark>{word}</mark>}{context.after}</p>}
            content={
                <div>
                    {file_name ? <p style={{color: "#2e81ff", direction: 'rtl'}}>קובץ: {file_name}</p> : undefined}
                    <p style={{color: "#2e81ff", direction: 'rtl'}}>לקסמה: {word_root}</p>
                    <p style={{color: "#2e81ff", direction: 'rtl'}}>ניתוח: {analysis}</p>
                </div>
            }
            // trigger="click"
            trigger="hover"
            >
            <p style={{color: "#2e81ff", direction: 'rtl'}}>{word_without_starts}</p>
        </Popover>
        );
    }

    long_line(words, wanted_line_length){
        let arr_to_ret = [];
        let m = 0;
        if (words.length % wanted_line_length === 0){
            for (let i = 0; i < (words.length) / wanted_line_length; i++){
                arr_to_ret[i] = Array(wanted_line_length);
                for (let j = 0; j < arr_to_ret[i].length; j++){
                    arr_to_ret[i][j] = words[m];
                    m++;
                }
            }
        } else {
            for (let i = 0; i < ((words.length) / wanted_line_length) + 1; i++){
                if (i !== ((words.length) / wanted_line_length)){
                    arr_to_ret[i] = Array(wanted_line_length);
                    for (let j = 0; j < arr_to_ret[i].length; j++){
                        arr_to_ret[i][j] = words[m];
                        m++;
                    }
                } else {
                    arr_to_ret[i] = Array(words.length % wanted_line_length);
                    for (let j = 0; j < arr_to_ret[i].length; j++){
                        arr_to_ret[i][j] = words[m];
                        m++;
                    }
                }
            }
            
        }
        return arr_to_ret;
    }
    getContext(idx, words){
        let before = "";
        let after = "";
        for (let i = Math.max(0, idx - 5); i < idx; i++)
            before += words[i].word_in_text + ' ';
        for (let i = idx + 1; i <= Math.min(idx + 5, words.length - 1); i++)
            after += ' ' + words[i].word_in_text;
        return { before: before, after: after }
    }
    words_renderer(answer, file_name=undefined) {
        let words_analysis_array = [];
        let length = answer.length;
        if (answer.length === 0){
            return
        }
        let counter_index = Array(answer[(answer.length - 1)].line_index + 1);
        let m = -1;
        let n = -1;
        for (let i  = 0; i < counter_index.length; i++){
            for (let j = n + 1; j < length; j++){
                if (j === length - 1){
                    counter_index[i] = Array(j - n).fill(0);
                    n = j;
                    break;
                } else if (j + 1 < answer.length && (answer[j + 1].line_index > i)){
                    counter_index[i] = Array(j - n).fill(0);
                    n = j;
                    break;
                }
            }
        }

        for (let i  = 0; i < counter_index.length; i++){
            for (let j = m + 1; j < length; j++){
                if (j === length - 1){
                    counter_index[i][answer[j].index]++;
                    break;
                } else if (j + 1 < answer.length && (answer[j + 1].line_index > i)){
                    counter_index[i][answer[j].index]++;
                    m = j;
                    break;
                }
                counter_index[i][answer[j].index]++;
            }
        }
        
        for (let i = 0; i < length; i++){
            let word = answer[i].word_in_text;
            let word_without_starts = answer[i].word_without_starts;
            let word_root = answer[i].root;
            let analysis = answer[i].analysis;
            let context = this.getContext(i, answer);
            if (this.props.selected_options.length === 0){
                words_analysis_array[i] = this.one_word_renderer(word, word_without_starts, analysis.toString(), word_root, context, file_name);
            } else {
                for (let j = 0; j < this.props.selected_options.length; j++){
                    if (analysis.includes(this.props.selected_options[j])){
                        words_analysis_array[i] = this.one_word_renderer(word, word_without_starts, analysis.toString(), word_root, context, file_name);
                        break;
                    }
                }
            }
        }
        
        let divs = [];
        let k = 0;
        let x = 0;
        for (let i = 0; i < counter_index.length; i++){
            let a = (counter_index[i]).reduce((acc, curr) => acc + curr, 0);
            let wanted_line_length = 20;
            if (a > wanted_line_length){
                let returned_arr = this.long_line(words_analysis_array.slice(k, k + a), wanted_line_length);
                for (let j = 0; j < returned_arr.length; j++){
                    divs[x + j] =
                    <div className="lines">
                        {returned_arr[j]}
                    </div>
                }
                x += returned_arr.length + 1;
                k += a;
            } else {
                divs[x] = 
                <div className="lines">
                    {words_analysis_array.slice(k, k + a)}
                </div>;
                k += a;
                x++;
            }
        }
        return divs;
    }

    words_renderer_array(answers, file_names, text_array){
        let res = [];
        for (let i = 0; i < answers.length; i++) {
            res[i] = 
            <div>
                
                <Popover
                    title={<p style={{color: "#2e81ff", direction: 'rtl', width: "600px"}}>{file_names[i]}</p>}
                    content={
                        <div className="lines" id="container" style={{direction: 'rtl', width: "600px"}}>
                            <p style={{color: "#2e81ff", direction: 'rtl', width: "600px"}}>{text_array[i]}</p>
                        </div>
                    }
                    // trigger="click"
                    trigger="hover"
                    >
                        <h3 style={{color: "#2e81ff", direction: 'rtl'}}>{file_names[i]}</h3>
                </Popover>
                {this.words_renderer(answers[i], file_names[i])}
            </div>
        }
        return res;
    }
    
    render(){
        return(
            <div className="content-section implementation" style={{direction: 'rtl'}}>
                {this.props.done && this.props.render_editor && this.words_renderer(this.props.answer)}
                {this.props.done && (!this.props.render_editor) && this.words_renderer_array(this.props.answer_array, this.props.file_name_array, this.props.text_array)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        render_editor: state['myRadio'].get('render_editor'),
        done: state['myAnalyzeButton'].get('done'),
        answer: state['myAnalyzeButton'].get('answer'),
        answer_array: state['myAnalyzeButton'].get('answer_array'),
        text_array: state['myAnalyzeButton'].get('text_array'),
        file_name_array: state['myAnalyzeButton'].get('file_name_array'),
        selected_options: state['myFilter'].get('selected_options')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPopover);
