goog.provide('Blockly.Blocks.texts');  // Deprecated
goog.provide('Blockly.Constants.Text');
goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.JavaScript['example_CreateDataSet'] = function(block) {
    return "class Analysis { constructor () { this.value = 0 } increment () { this.value += 1 return this } display () { console.log(this.value) } }new Analysis"
}

Blockly.JavaScript['example_IncrementDataSet'] = function(block) {
    return '.increment()'
}

Blockly.JavaScript['example_DisplayDataSet'] = function(block) {
    return '.display()'
}