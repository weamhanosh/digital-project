let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let filesSchema = new Schema({
  analysis_as_is: String,
  text: String,
  file_name: String,
  analysed_text_arr: [{
    index: String,
    word_in_text: String,
    root: String,
    word_without_starts: String,
    line_index: Number,
    analysis: [String]
  }],
  line_length_arr: [{line_index: Number, line_length: Number}],
  newline_counter: Number
});

module.exports = mongoose.model('files', filesSchema);
