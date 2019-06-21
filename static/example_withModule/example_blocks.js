Blockly.Blocks['example_CreateDataSet'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("CreateDataSet");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['example_IncrementDataSet'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("IncrementDataSet");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['example_DisplayDataSet'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("DisplayDataSet");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(90);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};