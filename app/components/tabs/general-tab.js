import Ember from 'ember';


export default Ember.Component.extend({
  isActive: function(){
    return this.activeTabName.toLowerCase() === "general";
  }.property("activeTabName"),

});