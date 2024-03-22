import { withPluginApi } from "discourse/lib/plugin-api";
import { getOwnerWithFallback } from "discourse-common/lib/get-owner";

export default {
  name: "close-composer-on-page-change",
  
  initialize() {
    withPluginApi("0.8", (api) => {
      const site = api.container.lookup("site:main");

      if (!site.mobileView) {
        return;
      }
      
      api.onPageChange((url, title) => {
        const composerService = getOwnerWithFallback(this).lookup("service:composer");
        const composerDraft = document.querySelector("#reply-control.draft");
      
        if (!composerDraft) {
          composerService.toggle();
        }
      });
    });
  },
};
