import Ember from 'ember';


export default Ember.Component.extend({
  activateTooltip: function() {
    this.$(".ayuda").tooltip();
    // this.set("inputValue", this.get("propertyResource." + this.fieldDetails.fieldName));
  }.on('didInsertElement'),
  // inputValue: null,

  inputValue: function() {
    // debugger;
    return this.get("propertyResource." + this.fieldDetails.fieldName);
  }.property("propertyResource"),
  //  http://blog.abuiles.com/blog/2015/03/30/removing-prototype-extensions-with-ember-watson/
  updateValue: Ember.observer('inputValue', function() {
    var inputValue = this.get("inputValue");
    this.set("propertyResource." + this.fieldDetails.fieldName, inputValue);
    if (inputValue > 3) {
      this.set("error", "ddddd");
    }
    else{
      this.set("error", "");
    }
  }),

  // propertyResourceSetup: function() {
  //   debugger;
  //   // do something
  // }.observes('fieldDetails.fieldName').on('init')
  // propertyResourceSetup: function() {
  //   // debugger;
  //   // do something
  // }.observes('inputValue'),

  // keyUp: function() {
  //   this.doUpdate();
  // },

  // click: function() {
  //   this.doUpdate();
  // },

  // doUpdate: function() {
  //   var inputValue = this.get("inputValue");
  //   this.set("propertyResource." + this.fieldDetails.fieldName, inputValue);
  //   // var content = this.$('.note-editable').html();
  //   // this.set('content', content);
  // }

});
