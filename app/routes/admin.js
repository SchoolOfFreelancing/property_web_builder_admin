import Ember from 'ember';
import AdminMeta from '../models/admin_meta';

export default Ember.Route.extend({

  model(params) {
    // debugger;
    var adminMeta = AdminMeta.get(this.paramsFor('admin.propiedades.editar').idPropiedad);
    return adminMeta;
  },

  setupController(controller, model) {
    controller.set("fieldKeys", model.selectValues);
    controller.set("leftNavItems", [{
      tabIconClass: "fa fa-home",
      tabTitle: "Inicio",
      tabRoute: "admin.inicio"
    }, {
      tabIconClass: "fa fa-building-o",
      tabTitle: "Propiedades",
      tabRoute: "admin.propiedades"
    }, {
      tabIconClass: "fa fa-users",
      tabTitle: "Clientes",
      tabRoute: "admin.default"

    }, {
      tabIconClass: "fa fa-calendar",
      tabTitle: "Actividades",
      tabRoute: "admin.default"

    }, {
      tabIconClass: "fa fa-desktop",
      tabTitle: "Web",
      tabRoute: "admin.default"
    }, {
      tabIconClass: "fa fa-user",
      tabTitle: "Mi perfil",
      tabRoute: "admin.default"
    }, {
      tabIconClass: "fa fa-support",
      tabTitle: "Soporte",
      tabRoute: "admin.default"
    }, {
      tabIconClass: "fa fa-sign-out",
      tabTitle: "Salir",
      tabRoute: "admin.default"
    }]);
  }
});