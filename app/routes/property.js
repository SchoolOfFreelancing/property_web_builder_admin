import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
      return this.store.findRecord('property', params.id); 
    },
    // setupController(controller, model) {
    //   debugger;
    // }
});