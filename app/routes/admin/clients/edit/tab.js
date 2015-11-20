import Ember from 'ember';
import AdminMeta from '../../../../models/admin_meta';
// var inject = Ember.inject;

export default Ember.Route.extend({
  // configFetcher: inject.service(),

  actions: {
  },
  model(params) {
    // var fieldNames = "";

    // if (Ember.isEmpty(fieldNames)) {
    //   return {};
    // } else {
    //   var adminMeta = AdminMeta.get(fieldNames);
    //   // adminMeta is from http://localhost:3000/api/v1/lang/field_keys/
    //   // and just returns a list of selectValues for provinces and clientResourceTypes..
    //   return adminMeta;
    // }

  },
  setupController(controller, model) {
    var activeTabName = this.paramsFor('admin.clients.edit.tab').tabName || "";
    controller.set("activeTabName", activeTabName.toLowerCase());
    controller.set("clientResource", this.modelFor('admin.clients.edit'));

    // controller.set("fieldKeys", model);


    // below doesn't quite work - not sure how to ensure promise is resolved before assigning it
    // var fieldKeys = this.get("configFetcher").getFieldKeys("").then(function(result){
    //   controller.set("fieldKeys", result);
    // }.bind(this));


    controller.set("tabsList", [{
      tabValue: "general",
      tabTitle: "General"
    }, {
      tabValue: "situacion",
      tabTitle: "Situación"
    }]);
  }
});
