
// Case or service link handler + fade out page //
let lastLocationURL = document.referrer;

function linkCases(x) {
  if (lastLocationURL.includes("lydbranding")) {
    window.location.href = '/da/sider/lydbranding.html#lydbrandingCases';
  } else if (lastLocationURL.includes("kultur-installation")) {
    window.location.href = '/da/sider/kultur-installation.html#installationCases';
  } else if (lastLocationURL.includes("medier-film-spil")) {
    window.location.href = '/da/sider/medier-film-spil.html#medierCases';
  } else if (lastLocationURL.includes("media-film-games")) {
    window.location.href = '/en/pages/media-film-games.html#mediaCases';
  } else if (lastLocationURL.includes("culture-installation")) {
    window.location.href = '/en/pages/culture-installation.html#cultureCases';
  } else if (lastLocationURL.includes("sound-branding")) {
    window.location.href = '/en/pages/sound-branding.html#soundBrandingCases';
  } else if (lastLocationURL.includes("en/pages/cases")) {
    window.location.href = '/en/pages/cases.html' + x.toString();
  } else {
    window.location.href = '/da/sider/cases.html' + x.toString();
  }
}
