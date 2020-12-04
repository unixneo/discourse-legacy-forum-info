import computed from "discourse-common/utils/decorators";
export default Ember.Component.extend({
  @computed("topic.custom_fields.import_id")
  importId(cf) {
    let currentUser = Discourse.User.current();
    let enabledSetting = false;
    if (
      Discourse.User.current() == null &&
      Discourse.SiteSettings.enable_for_guests == false
    ) {
      return "";
    } else {
      if (Discourse.User.current() != null) {
        let min_trust_level_setting = Discourse.SiteSettings.min_trust_level;
        let trustLevel = parseInt(Discourse.SiteSettings.min_trust_level);
        if (min_trust_level_setting > 0) {
          trustLevel = min_trust_level_setting;
        } else {
          trustLevel = 4;
        }
        if (parseInt(currentUser.trust_level) >= parseInt(trustLevel)) {
          enabledSetting = true;
        }
      }

      if (enabledSetting || Discourse.SiteSettings.enable_for_guests) {
        let legacyId = "";
        if (typeof cf !== "undefined") {
          let myArray = cf.split("-");
          let raw = myArray[1];
          if (parseInt(raw) > 0) {
            legacyId = raw;
          } else legacyId = 0;
        } else {
          legacyId = 0;
        }
        let link = "";
        let uC = document.querySelectorAll("link[rel='canonical']")[0];
        if (legacyId > 1) {
          Discourse.SiteSettings.legacy_found = true;
          link =
            '<span class="category-name import-id">Reference Thread ID: <a class="import-id-link" href="https://www.unix.com/showthread.php?t=' +
            legacyId +
            '">' +
            legacyId +
            "</a></span>";
          if (uC && Discourse.SiteSettings.enable_hide_canonical) {
            uC.setAttribute("rel", "alternate");
            uC.style.display = "none";
            uC.disabled = true;
          }
        } else {
          Discourse.SiteSettings.legacy_found = false;
          if (uC && Discourse.SiteSettings.enable_hide_canonical) {
            uC.setAttribute("rel", "canonical");
            uC.style.display = "inline";
            uC.disabled = false;
          }
          //link = '<span class="category-name">Imported Thread ID: Not Found</span>';
          link = "";
        }

        return Ember.String.htmlSafe(link);
      } else {
        return "";
      }
    }
  },
});
