import Ember from 'ember';

import TabWithForm from "../base/tab-with-form";

export default TabWithForm.extend({
  changedFields: [],

  // clientResource: {},
  actions: {
    createClientResource: function() {
      var clientResource = this.get("resourceObject");
      var self = this;

      function transitionToClient(clientResource) {
        // router is injected here through an initializer
        self.get('router').transitionTo('admin.contacts.edit', clientResource.id);
      }

      function failure(reason) {
        // handle the error
      }
      clientResource.saveNew(transitionToClient, failure);
    }
  },

  leftSideInputFields: [{
    labelTextTKey: "fieldLabels.firstNames",
    fieldName: "first_name",
    fieldType: "simpleInput",
    inputType: "text",
    constraints: {
      inputValue: {
        length: {
          minimum: 2,
          tooShort: "needs to have %{count} characters or more"
        }
      }
    }
  }, {
    labelTextTKey: "fieldLabels.lastNames",
    fieldName: "lastNames",
    fieldType: "simpleInput",
    inputType: "text",
    constraints: {
      inputValue: {
        length: {
          minimum: 2,
          tooShort: "needs to have %{count} characters or more"
        }
      }
    }
  }, {
    labelTextTKey: "fieldLabels.nationality",
    fieldName: "nationality",
    fieldType: "simpleInput",
    inputType: "text",
    constraints: {
      inputValue: {
        length: {
          minimum: 2,
          tooShort: "needs to have %{count} characters or more"
        }
      }
    }
  }, {
    labelTextTKey: "fieldLabels.documentationType",
    fieldName: "documentationType",
    fieldType: "simpleInput",
    inputType: "text",
    constraints: {
      inputValue: {
        length: {
          minimum: 2,
          tooShort: "needs to have %{count} characters or more"
        }
      }
    }
  }, {
    labelTextTKey: "fieldLabels.documentationId",
    fieldName: "documentationId",
    fieldType: "simpleInput",
    inputType: "text",
    constraints: {
      inputValue: {
        length: {
          minimum: 2,
          tooShort: "needs to have %{count} characters or more"
        }
      }
    }
  }],
  rightSideInputFields: [{
    labelTextTKey: "fieldLabels.primaryPhone",
    fieldName: "phoneNumberPrimary",
    fieldType: "simpleInput",
    inputType: "text",
    constraints: {
      inputValue: {
        length: {
          minimum: 2,
          tooShort: "needs to have %{count} characters or more"
        }
      }
    }
  }, {
    labelTextTKey: "fieldLabels.otherPhone",
    fieldName: "phoneNumberOther",
    fieldType: "simpleInput",
    inputType: "text",
    constraints: {
      inputValue: {
        length: {
          minimum: 2,
          tooShort: "needs to have %{count} characters or more"
        }
      }
    }
  }, {
    labelTextTKey: "fieldLabels.email",
    fieldName: "email",
    fieldType: "simpleInput",
    inputType: "text",
    constraints: {
      inputValue: {
        length: {
          minimum: 2,
          tooShort: "needs to have %{count} characters or more"
        }
      }
    }
  }, {
    labelTextTKey: "fieldLabels.fax",
    fieldName: "fax",
    fieldType: "simpleInput",
    inputType: "text",
    constraints: {
      inputValue: {
        length: {
          minimum: 2,
          tooShort: "needs to have %{count} characters or more"
        }
      }
    }
  }, {
    labelTextTKey: "fieldLabels.skype",
    fieldName: "skype",
    fieldType: "simpleInput",
    inputType: "text",
    constraints: {
      inputValue: {
        length: {
          minimum: 2,
          tooShort: "needs to have %{count} characters or more"
        }
      }
    }
  }],

});
