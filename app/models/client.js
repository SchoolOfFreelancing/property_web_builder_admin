import DS from 'ember-data';
// import { translationMacro as t } from "ember-i18n";

export default DS.Model.extend({

  // i18n: Ember.inject.service(),

  firstNames: DS.attr(),
  lastNames: DS.attr(),
  // extras: DS.attr({dontSerialize: true}),


});