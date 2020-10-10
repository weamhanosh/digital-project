const express = require('express');
const router = express.Router();

let FilesModel = require('../../model/files');
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

async function get_server_responses(texts){
  let server_responses = [];
  for (let i = 0; i < texts.length; i++){
    await FilesModel.
    findOne({text: texts[i]})
    .then(doc => server_responses[i] = doc)
  }
  return server_responses;
}

router.post('/', function (req, res) {

  let names = req.body.names;
  let texts = req.body.texts;
  
  let server_responses_promise = get_server_responses(texts);
  
  let final_res = [];
  server_responses_promise
  .then((docs) => {
    let texts_to_analyse = [];
    let indexes_of_texts_to_analyse = [];
    for (let i = 0; i < docs.length; i++) {
      if (docs[i] === null) {
        // text is not just whitespaces
        if (/\S/.test(texts[i])) {
          texts_to_analyse.push(texts[i]);
          indexes_of_texts_to_analyse.push(i);
        } else {
          texts_to_analyse.push("\n\r\n");
          indexes_of_texts_to_analyse.push(i);
        }
      } else {
        final_res.push(docs[i]);
      }
    }
    let all_texts = texts_to_analyse.join("\nTHISISADELIMITERDONOTADDTOFILES\n");
    if (final_res.length === texts.length) {
      console.log('all texts found in db!');
      res.json(final_res);
      res.end();
    } else {
      console.log('creating new entry in db!');
      let curr_id = make_id();
      let data_promise = all(all_texts, curr_id);
      let k = -1;
      data_promise
      .then((whole_data) => {
        fs.unlink('C:\\project\\' + curr_id + '.txt', (err) => { if (err) console.error(err)})
        fs.unlink('C:\\project\\delimited' + curr_id + '.txt', (err) => { if (err) console.error(err)})
        fs.unlink('C:\\project\\taggeddelimited' + curr_id + '.txt', (err) => {if (err) console.error(err)})
        let all_data = whole_data.split("0 THISISADELIMITERDONOTADDTOFILES THISISADELIMITERDONOTADDTOFILES THISISADELIMITERDONOTADDTOFILES foreign unspecified unspecified unspecified unspecified unspecified");
        all_data.forEach((data) => {
          k++;
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
          let text_array = texts[indexes_of_texts_to_analyse[k]].split('\n');
          for(let i = 0; i < text_array.length; i++){
            line_length_arr[i] = {
              line_index: i,
              line_length: text_array[i].split(' ').length
            }
          }
          
          let answer = new FilesModel({text: texts[indexes_of_texts_to_analyse[k]], file_name: names[indexes_of_texts_to_analyse[k]], analysis_as_is: data.split(" unspecified").join(""), analysed_text_arr: arr, line_length_arr: line_length_arr, newline_counter: texts[indexes_of_texts_to_analyse[k]].split('\n').length});
          answer
          .save(answer)
          .then(() => {
            final_res.push(answer);
            if (data === all_data[all_data.length - 1]) {
              res.json(final_res);
              res.end();
              return;
            }
          })
        });
        
      })
      .catch((e) => {
        console.log(e);
      });
    }
  })
});

module.exports = router;
