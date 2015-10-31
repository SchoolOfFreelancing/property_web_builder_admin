import Ember from 'ember';
// import Location from "../models/location";

export default Ember.Component.extend({
  startAdding: true,
  validate: false,
  // isSearching: true,
  markers: [],
  processSearchObject: function(searchBoundaryObject) {
    var map = this.get("mapHolder.map");
    // var mapCenter = map.getCenter();
    var latitude = searchBoundaryObject.geometry.location.lat();
    var longitude = searchBoundaryObject.geometry.location.lng();

    // search for closeby places
    var latlng = new google.maps.LatLng(latitude, longitude);
    // debugger;
    var searchTerm = searchBoundaryObject.address_components[0].short_name;
    console.log(searchTerm);
    var request = {
      keyword: searchTerm,
      location: latlng,
      rankBy: google.maps.places.RankBy.DISTANCE,
      // types: ['cafe', 'night_club', 'restaurant', 'museum', 'bar', 'food', 'store', 'establishment']
    };
    var service = new google.maps.places.PlacesService(map);
    var that = this;
    this.set("isSearching", true);
    service.nearbySearch(request, function(results, status) {
      that.set("isSearching", false);
      if (status == google.maps.places.PlacesServiceStatus.OK) { // that.set('displaySearchResults', true);
        that.set('searchResults', results.slice(0, 20));
      } else {
        // that.set('displaySearchResults', false);
        // clear out any previous results I may have
        that.set('searchResults', []);
      }
    });
  },
  boundaryPlaceValidation: function() {
    if (Ember.isEmpty(this.get("searchBoundaryObject.geometry"))) {
      var place = this.get("searchBoundaryObject");
      var that = this;
      // that.set("boundaryPlaceDisplay", "");
      // The user pressed enter in the input 
      // without selecting a result from the list
      // Let's get the list from the Google API so that
      // we can retrieve the details about the first result
      // and use it (just as if the user had actually selected it)
      var autocompleteService = new google.maps.places.AutocompleteService();

      autocompleteService.getPlacePredictions({
          'input': place.name,
          'offset': place.name.length
          // I repeat the options for my AutoComplete here to get
          // the same results from this query as I got in the 
          // AutoComplete widget
          // 'componentRestrictions': {
          //   'country': 'es'
          // },
          // 'types': ['(regions)']
        },

        function listentoresult(list, status) {
          if (list == null || list.length == 0) {
            // There are no suggestions available.
            // The user saw an empty list and hit enter.
            console.log("No results");
          } else {
            // Here's the first result that the user saw
            // in the list. We can use it and it'll be just
            // as if the user actually selected it
            // themselves. But first we need to get its details
            // to receive the result on the same format as we
            // do in the AutoComplete.
            var placesService = new google.maps.places.PlacesService(that.get("map"));
            placesService.getDetails({
                'reference': list[0].reference
              },
              function detailsresult(detailsResult, placesServiceStatus) {
                // Here's the first result in the AutoComplete with the exact
                // same data format as you get from the AutoComplete.
                that.set('searchBoundaryObject', detailsResult);
                that.processSearchObject(detailsResult);
              }
            );
          }
        }
      ); 

    }
  },
  // }.property('validate', 'searchBoundaryObject'),
  actions: {
    startSearch: function() {
      var searchBoundaryObject = this.get("searchBoundaryObject");
      var searchBoundaryGeo = this.get("searchBoundaryObject.geometry");

      if (!searchBoundaryGeo) {
        // probably user hit enter without selecting from dropdown..
        this.boundaryPlaceValidation();
        return;
      }
      // if (!searchKeywords) {
      //   debugger;
      //   return;
      // }
      this.processSearchObject(searchBoundaryObject);
    },
  },

  _setup: function() {
    this._super();
    var self = this;
    if (this.get("mapHolder.map")) {
      this.set("map", this.get("mapHolder.map"));
      this.displaySearchBox();
    }
    // this.$('#address-picker-input')[0].focus();
  }.on('didInsertElement'),

  keyDown: function(event) {
    if (!event.metaKey) {
      if (event.target.id === "place-keyword-input") {
        if (event.keyCode === 13 || event.keyCode === 9) {
          this.send("startSearch");
        }
      } else if (event.target.id === "boundary-place-input") {
        if (event.keyCode === 9) {
          this.set("searchBoundaryObject", {
            name: event.target.value
          })
          this.send("startSearch");
        }

      }
    }
  },
  // 
  onMapHolderChange: function() {
    if (this.get("mapHolder.map")) {
      this.set("map", this.get("mapHolder.map"));
      this.displaySearchBox();
    }
  }.observes('mapHolder', 'mapHolder.map'),


  displaySearchBox: function() {
    var input = (document.getElementById('boundary-place-input'));
    if (input) {
      var options = {
        // bounds: defaultBounds,
        // ED - could set types to regions to not show addresses...
        // types: ['(regions)']
      };
      var autocomplete = new google.maps.places.Autocomplete(input, options);
      // autocomplete.bindTo('bounds', this.map);

      var that = this;
      google.maps.event.addListener(autocomplete, 'place_changed', function() {

        var place = autocomplete.getPlace();
        that.set('searchBoundaryObject', place);
        that.send("startSearch");

      });
    }
  },
});
