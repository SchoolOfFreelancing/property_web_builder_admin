import Ember from 'ember';
import TabWithForm from "../base/tab-with-form";

export default TabWithForm.extend({
  changedFields: [],

  actions: {
    // saveAgencyDetails: function() {
    //   var agencyDetails = this.get("resourceObject");
    //   agencyDetails.save(function(success) {
    //     // triggerReset is an action in TabWithForm
    //     this.send("triggerReset");
    //   }.bind(this), function(error) {

    //   }.bind(this));
    // }

  },
  mainInputFields: [{
      labelTextTKey: "fieldLabels.companyName",
      // tooltipTextTKey: "toolTips.company_name",
      fieldName: "company_name",
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
      labelTextTKey: "fieldLabels.primaryPhone",
      // tooltipTextTKey: "toolTips.company_name",
      fieldName: "phone_number_primary",
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
      fieldName: "phone_number_other",
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
    }

  ],
  isActive: function() {
    return this.activeTabName.toLowerCase() === "general";
  }.property("activeTabName"),


});
