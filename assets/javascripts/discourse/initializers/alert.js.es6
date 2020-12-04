import { withPluginApi } from "discourse/lib/plugin-api";
export default {
  name: alert,
  initialize() {
    if (1 == 2) {
      withPluginApi("0.8", (api) => {
        api.onPageChange(() => console.log("user navigated!"));
        let currentUser = api.getCurrentUser();
        console.log("blah", currentUser.trust_level);
      });
    }
  },
};
