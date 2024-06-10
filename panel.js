/*
 * 🄲🄰🄿🅃🅄🅁🄴 = title=🅷🆃🆃🅿,content=DISABLE,icon=doc.text.magnifyingglass,icon-color=FF6D1F,script-name=🅷🆃🆃🅿-🄲🄰🄿🅃🅄🅁🄴,update-interval=1
 * !name= MitM All Hostnames
 * !desc= Perform MitM on all hostnames except the following hostnames.
 * [MITM]
 * hostname = -cl5.apple.com, -mzstorekit-sb.itunes.apple.com, -gsas.apple.com, -csig.apple.com, -sandbox.itunes.apple.com, -guzzoni.apple.com, -itunes.apple.com, -musicstatus.itunes.apple.com, -*.mzstatic.com, -xp.apple.com, -*.siri.apple.com, -*.push.apple.com, -amp-api.apps.apple.com, -api-edge.apps.apple.com, -play.itunes.apple.com, -search.itunes.apple.com, -amp-api-search-edge.apps.apple.com, -gsa.apple.com, -mzstorekit.itunes.apple.com, -bag.itunes.apple.com, -p56-buy.itunes.apple.com, -inappcheck.itunes.apple.com, *
 */



!(async () => {
let mods = (await httpAPI("GET", "/v1/modules", null))
let modsStatus = /MitM All Hostnames/.test(mods.enabled)
let capture = (await httpAPI("GET", "/v1/features/capture", null))
if ($trigger === "button") {
    if (capture.enabled == false){
        await httpAPI("POST", "/v1/features/capture", {enabled: "true"})
        await httpAPI("POST", "/v1/modules", {"MitM All Hostnames": "true"})
        $done({
            title:"🅷🆃🆃🅿",
            content:"🄲🄰🄿🅃🅄🅁🄴: \u2611   🄷🄾🅂🅃🄽🄰🄼🄴🅂: \u2611",
            icon: "doc.text.magnifyingglass",
            "icon-color": "#00FF00"
        })
    } else {
        await httpAPI("POST", "/v1/features/capture", {enabled: "false"})
        await httpAPI("POST", "/v1/modules", {"MitM All Hostnames": "false"})
        $done({
            title:"🅷🆃🆃🅿",
            content:"🄲🄰🄿🅃🅄🅁🄴: \u2612   🄷🄾🅂🅃🄽🄰🄼🄴🅂: \u2612",
            icon: "touchid",
            "icon-color": "#F20C00"
        })
    }
} else if(modsStatus == true || capture.enabled == true) {
        $done({
            title:"🅷🆃🆃🅿",
            content:"🄲🄰🄿🅃🅄🅁🄴: " + iconStatus(capture.enabled) + "    🄷🄾🅂🅃🄽🄰🄼🄴🅂: " + iconStatus(modsStatus),
            icon: "hand.raised.square.on.square.fill",
            "icon-color": "#00FF00"
        })
} else {
        $done({
            title:"🅷🆃🆃🅿",
            content:"🄲🄰🄿🅃🅄🅁🄴: " + iconStatus(capture.enabled) + "    🄷🄾🅂🅃🄽🄰🄼🄴🅂: " + iconStatus(modsStatus),
            icon: "touchid",
            "icon-color": "F20C00"
        })
}
})();

function httpAPI(method = "", path = "", body = "") {
    return new Promise((resolve) => {
        $httpAPI(method, path, body, (result) => {
            resolve(result);
        });
    });
}

function iconStatus(status) {
  if (status) {
    return "\u2611";
  } else {
    return "\u2612"
  }
}
