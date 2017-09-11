// This component is based on the
// landing page 3-column services section
import Ember from 'ember';

export default Ember.Component.extend({
  // isEditing: true,
  currentLocaleFragment: function() {
    var currentLocaleFragment = this.get("pwbPage").getLocaleFragment(this.get("locale"), this.get("cmsPartInfo.label"));
    // var currentLocaleFragment = this.get("pwbPage.details.fragments")[this.cmsPartInfo.label][this.get("locale")];
    if (!currentLocaleFragment) {
      currentLocaleFragment = {
        blocks: {}
      };
      currentLocaleFragment.locale = this.get("locale");
      currentLocaleFragment.label = this.get("cmsPartInfo.label");
    }
    return currentLocaleFragment;
    // return Ember.Object.create(currentLocaleFragment);
  }.property("pwbPage"),

  setupComponent: function() {
    var fragmentHtml = { content: "" }
    var currentLocaleFragment = this.get("pwbPage").getLocaleFragment(this.get("locale"), this.get("cmsPartInfo.label"));
    // var currentFragment = this.get("pwbPage.pageFragments")[this.cmsPartInfo.label][this.get("locale")];
    if (currentLocaleFragment && currentLocaleFragment.html) {
      fragmentHtml.content = currentLocaleFragment.html;
    } 
    this.set("fragmentHtml",fragmentHtml);
  }.on('didInsertElement'),


  actions: {
    updateCaches: function(updatedCaches) {
      this.sendAction("updateCachesAction", updatedCaches);
    },
    startEditing: function() {
      this.set("isEditing", true);
    },
    cancelEditing: function() {
      // var cmsPage = this.get("cmsPage");
      // cmsPage.rollbackAttributes();
      // this.set("contentValue", this.get("originalContentValue"));
      this.set("isEditing", false);
    },
    previewContent: function() {}
  },

  labelSuffixKey: Ember.computed('locale', {
    get(key) {
      return "webContentLabels.suffix" + this.get("locale").capitalize();
    }
  })
});
