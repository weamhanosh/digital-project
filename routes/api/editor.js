const express = require('express');
const router = express.Router();

let AnswerModel = require('../../model/editor');
let fs = require('fs');
const child_process = require('child_process');
const { promisify } = require('util')
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const runTagger = promisify(child_process.execFile);


function make_id() {
  let length = Math.floor(Math.random() * 10);
  length += 10;
  
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function all(content, curr_id){
  await writeFile('C:\\project\\' + curr_id + '.txt', content);
  await runTagger('C:\\project\\mainBat.bat', ['C:\\project\\' + curr_id + '.txt'], { cwd: 'C:\\project' });
  const data = await readFile('C:\\project\\taggeddelimited' + curr_id + '.txt', 'utf-8');
  return data;
}

router.post('/upload', function (req, res) {

  let content = req.body.text;
          
  AnswerModel
  .findOne({text: content})
  .then(doc => {
    if (doc != null) {
      console.log('text found in db!');
      res.json(doc);
    } else {
      console.log('creating new entry in db!');
      let curr_id = make_id();
      let data_promise = all(content, curr_id);
      data_promise
      .then((data) =>{
        fs.unlink('C:\\project\\' + curr_id + '.txt', (err) => { if (err) console.error(err)})
        fs.unlink('C:\\project\\delimited' + curr_id + '.txt', (err) => { if (err) console.error(err)})
        fs.unlink('C:\\project\\taggeddelimited' + curr_id + '.txt', (err) => {if (err) console.error(err)})
        let data_array = data.split('\n');
        let arr = [];
        let m = -1;
        for (let i = 0; i < data_array.length - 2; i++){
          let line_i = data_array[i].split(' ');
          if (!(line_i[0] === '') && line_i.length >= 5){
            if (line_i[0] === "0" && line_i !== ""){
              m++;
            }
            arr[i] = {
              index: line_i[0],
              word_in_text: line_i[1],
              root: line_i[2],
              word_without_starts: line_i[3],
              line_index: m,
              analysis: line_i.slice(4, line_i.length - 2).filter(a => a !== "unspecified")
            }
          } else if (line_i.length >= 6){
            if (line_i[1] === "0"){
              m++;
            }
            arr[i] = {
              index: line_i[1],
              word_in_text: line_i[2],
              root: line_i[3],
              word_without_starts: line_i[4],
              line_index: m,
              analysis: line_i.slice(5, line_i.length - 2).filter(a => a !== "unspecified")
            }
          }
        }
        let line_length_arr = [];
        let text_array = content.split('\n');
        for(let i = 0; i < text_array.length; i++){
          line_length_arr[i] = {
            line_index: i,
            line_length: text_array[i].split(' ').length
          }
        }
        
        let answer = new AnswerModel({text: content, analysis_as_is: data, analysed_text_arr: arr, line_length_arr: line_length_arr, newline_counter: content.split('\n').length});
        answer
        .save(answer)
        .then(() => {
          res.json(answer);
          res.end();
        })
      })
      .catch((e) => {
        console.log(e);
        // add attempt to restart server
      });
    }
  });
  

});

router.post('/download', function (req, res) {

  let content = req.body.text;
          
  AnswerModel
  .findOne({text: content})
  .then(doc => {
    if (doc != null) {
      console.log('text found in db!');
      res.json(doc.analysis_as_is);
    } else {
      console.log("no entry to download")
    }
  });
  

});


module.exports = router;
