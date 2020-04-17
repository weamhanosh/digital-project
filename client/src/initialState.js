
const { Map } = require('immutable');

export default {
    myEditor: Map({
        text: "",
    }),
    myRadio: Map({
        render_editor: true,
    }),
    myFileUpload: Map({
        names: [],
        texts: []
    }),
    myAnalyzeButton: Map({
        render_progress_bar: false,
        done: false,
        failed: false,
        analysis_as_is: "",
        answer: {
            text: "",
            analysed_text_arr: []
        },
        newline_counter: 0,
        line_length_arr: [],
        answer_array: [],
        analysis_as_is_array: [],
        newline_counter_array: [],
        line_length_arr_array: [],
        file_name_array: [],
        text_array: []
    }),
    myFilter: Map({
        options: [
            {label: 'numeral', value: 'numeral'},
            {label: 'negation', value: 'negation'},
            {label: 'modal', value: 'modal'},
            {label: 'pronoun', value: 'pronoun'},
            {label: 'verb', value: 'verb'},
            {label: 'adverb', value: 'adverb'},
            {label: 'noun', value: 'noun'},
            {label: 'adjective', value: 'adjective'},
            {label: 'properName', value: 'properName'},
            {label: 'temporalSubConj', value: 'temporalSubConj'},
            {label: 'preposition', value: 'preposition'},
            {label: 'definiteArticle', value: 'definiteArticle'},
            {label: 'conjunction', value: 'conjunction'},
            {label: 'relativizer/subordinatingConjunction', value: 'relativizer/subordinatingConjunction'},
            {label: 'at-preposition', value: 'at-preposition'},
            {label: 'shel-preposition', value: 'shel-preposition'},
            {label: 'punctuation', value: 'punctuation'},
            {label: 'pronomial', value: 'pronomial'},
            {label: 'interrogative', value: 'interrogative'},
            {label: 'possessive', value: 'possessive'},
            {label: 'past', value: 'past'},
            {label: 'future', value: 'future'},
            {label: 'infinitive', value: 'infinitive'},
            {label: 'masculine', value: 'masculine'},
            {label: 'feminine', value: 'feminine'},
            {label: 'masculine-and-feminine', value: 'masculine-and-feminine'},
            {label: 'neutral', value: 'neutral'},
            {label: 'singular', value: 'singular'},
            {label: 'plural', value: 'plural'},
            {label: 'absolute', value: 'absolute'},
            {label: 'participle', value: 'participle'},
            {label: 'copula', value: 'copula'},
            {label: 'beinoni', value: 'beinoni'},
            {label: '1', value: '1'},
            {label: '2', value: '2'},
            {label: '3', value: '3'},
            {label: 'quantifier', value: 'quantifier'},
            {label: 'construct', value: 'construct'},
            {label: 'pronomial', value: 'pronomial'},
            {label: 'wPrefix', value: 'wPrefix'},
            {label: 'imperative', value: 'imperative'},
            {label: 'foreign', value: 'foreign'},
            {label: 'numberExpression', value: 'numberExpression'},
            {label: 'existential', value: 'existential'},
            {label: 'temporalSubConj', value: 'temporalSubConj'},
            {label: 'interjection', value: 'interjection'},
            {label: 'dual', value: 'dual'},
            {label: 'title', value: 'title'},
            {label: 'any', value: 'any'}
            
        ],
        selected_options: [],
    }),
    app: Map({ }),
    myPopover: Map({ })
    
};
