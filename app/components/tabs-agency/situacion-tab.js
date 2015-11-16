import Ember from 'ember';


export default Ember.Component.extend({
  // shared list of markers to all different map actors to share
  changedFields: [],
  fieldsWithErrors: [],

  // can't think of a simpler way of doing this
  // but will watch below in each child input field and reset
  // as not edited when resetTrigger goes up
  resetTrigger: 0,
  actions: {
    checkDirtyState: function(changedFieldInfo){
      var changedFields = this.get("changedFields");
      var fieldsWithErrors = this.get("fieldsWithErrors");

      if (changedFieldInfo.hasErrors) {
        fieldsWithErrors.pushObject(changedFieldInfo.fieldName);
      } else{
        fieldsWithErrors.removeObject(changedFieldInfo.fieldName);
      }
      var hasErrors = (fieldsWithErrors.length > 0);
      this.set("hasErrors",hasErrors);

      if (changedFieldInfo.hasChanged) {
        changedFields.pushObject(changedFieldInfo.fieldName);
      } else{
        changedFields.removeObject(changedFieldInfo.fieldName);
      }
      // if we have more than one field that has changed
      // consider this component as "hasChanged"
      var hasChanged = (changedFields.length > 0);
      this.set("hasChanged",hasChanged);
    },
    saveAddressDetails: function() {
      var addressDetails = this.get("addressDetails");
      addressDetails.save(function(success) {
        this.set("changedFields", []);
        this.set("hasChanged", false);
        this.set("fieldsWithErrors", []);
        this.set("hasErrors", false);
        this.set("resetTrigger", this.get("resetTrigger") + 1);
        debugger;
      }.bind(this), function(error) {
        debugger;
        var errorMessage = "Sorry, there has been an error.";
        if (error.responseJSON && error.responseJSON.errors) {
          errorMessage = error.responseJSON.errors[0];
        }
        // this.set('serverError', errorMessage);
      }.bind(this));
    },
    stopConfirming: function() {
      this.set("isConfirming", false);
    },
    mapClicked: function(locationInfo) {
      this.set("gmapLocationObject", locationInfo.clickedLocation);
      this.set("isConfirming", true);
    },

    // will set new address from typing in search box
    // - this new address will have to be confirmed
    updateFromSearch: function(searchResultObject) {
      // var newAddress = {};
      // TODO - parse searchResultObject.address_components..
      // newAddress.street_address = searchResultObject.formatted_address;
      // // newAddress.direccionPropiedad = searchResultObject.formatted_address;
      // newAddress.latitude = searchResultObject.geometry.location.lat();
      // newAddress.longitude = searchResultObject.geometry.location.lng();
      // this.set("newAddress", newAddress);
      this.set("gmapLocationObject", searchResultObject);
      this.set("isConfirming", true);
    },

    // confirming address details 
    // after clicking on map or typing in searchbox 
    updateConfirmedAddress: function(newAddressDetails) {
      var addressDetails = this.get("addressDetails");
      // addressDetails.latitude = newAddressDetails.latitude;
      // addressDetails.longitude = newAddressDetails.longitude;
      // addressDetails.direccionPropiedad = newAddressDetails.direccionPropiedad;
      addressDetails.set("street_address", newAddressDetails.street_address);
      addressDetails.set("city", newAddressDetails.city);
      addressDetails.set("postal_code", newAddressDetails.postal_code);
      addressDetails.set("country", newAddressDetails.country);
      addressDetails.set("region", newAddressDetails.region);
      addressDetails.set("longitude", newAddressDetails.longitude);
      addressDetails.set("latitude", newAddressDetails.latitude);

      addressDetails.save(function(success) {
        this.set("isConfirming", false);
      }.bind(this), function(error) {
        debugger;
        var errorMessage = "Sorry, there has been an error.";
        if (error.responseJSON && error.responseJSON.errors) {
          errorMessage = error.responseJSON.errors[0];
        }
        // this.set('serverError', errorMessage);
      }.bind(this));
      // .then(transitionToPost).catch(failure);
    }
  },
  situacionRightInputFields: [
    //this comment tricks prettify ;) 
    {
      labelTextTKey: "fieldLabels.zona",
      tooltipTextTKey: false,
      fieldName: "region",
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
      labelTextTKey: "fieldLabels.localidad",
      tooltipTextTKey: "",
      fieldName: "region",
      fieldType: "dynamicSelect",
      optionsKey: "provinces",
    }, {
      labelTextTKey: "country",
      tooltipTextTKey: false,
      fieldName: "country",
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
  situacionLeftInputFields: [
    //this comment tricks prettify ;) 
    // {
    //   labelTextTKey: "fieldLabels.direccion",
    //   tooltipTextTKey: false,
    //   fieldName: "direccion",
    //   fieldType: "simpleInput",
    //   inputType: "text",
    //   constraints: {
    //     inputValue: {
    //       length: {
    //         minimum: 2,
    //         tooShort: "needs to have %{count} characters or more"
    //       }
    //     }
    //   }
    // }, 
    {
      labelTextTKey: "fieldLabels.direccionReal",
      tooltipTextTKey: false,
      fieldName: "street_address",
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
      labelTextTKey: "city",
      tooltipTextTKey: false,
      fieldName: "city",
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
      labelTextTKey: "fieldLabels.codigoPostal",
      tooltipTextTKey: false,
      fieldName: "postal_code",
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
    },
    // {
    //   labelTextTKey: "fieldLabels.direccionMapa",
    //   tooltipTextTKey: false,
    //   fieldName: "direccionPropiedad",
    //   fieldType: "simpleInput",
    //   inputType: "text",
    //   constraints: {
    //     inputValue: {
    //       length: {
    //         minimum: 2,
    //         tooShort: "needs to have %{count} characters or more"
    //       }
    //     }
    //   }
    // },
  ],

  geo: function() {
    var geo = Ember.Object.create({
      longitude: this.get("addressDetails.longitude"),
      latitude: this.get("addressDetails.latitude"),
      streetAddress: this.get("addressDetails.street_address"),
      searchResults: "",
      map: "",
      allMapMarkers: null,
    });

    return geo;
  }.property(),
  isActive: function() {
    return this.activeTabName.toLowerCase() === "location";
  }.property("activeTabName"),

});
