goog.provide('Blockly.Blocks.texts');  // Deprecated
goog.provide('Blockly.Constants.Text');
goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.JavaScript['example_CreateDataSet'] = function(block) {
    return "class Analysis {\nconstructor () { this.value = 0 }\nincrement () { this.value += 1; return this }\ndisplay () { return this.value }\n}\nnew Analysis()"
}

Blockly.JavaScript['example_IncrementDataSet'] = function(block) {
    return '.increment()'
}

Blockly.JavaScript['example_DisplayDataSet'] = function(block) {
    return '.display()'
}
