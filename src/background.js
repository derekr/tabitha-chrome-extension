var nets = require('nets')

var count = 0
function update (e) {
    count += 1
    chrome.browserAction.setBadgeText({text: count + ''});

    var opts = {
        url: process.env.BASE_URL + '/api/tab',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        encoding: undefined,
        body: JSON.stringify({
            id: 'hey'
        })
    }

    console.dir(opts)

    nets(opts, function (err, res) {
        if (err) return console.error(err)

        console.dir(res)
    })
}
chrome.runtime.onInstalled.addListener(update)
chrome.tabs.onCreated.addListener(update)
