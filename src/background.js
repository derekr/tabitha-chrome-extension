var nets = require('nets')
var url = require('url')

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

    nets(opts, function (err, res) {
        if (err) return console.error(err)
    })
}

function remove (e) {
    count -= 1
    if (count < 0) return

    chrome.browserAction.setBadgeText({text: count + ''});

    var opts = {
        url: process.env.BASE_URL + '/api/tab',
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        encoding: undefined,
        body: JSON.stringify({
            id: 'hey'
        })
    }

    nets(opts, function (err, res) {
        if (err) return console.error(err)
    })
}

function loaded (id, data) {
    if (data.status !== 'loading') return

    var _host = url.parse(data.url).hostname

    if (['devtools', 'newtab'].indexOf(_host) > -1) return

    var opts = {
        url: process.env.BASE_URL + '/api/url',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        encoding: undefined,
        body: JSON.stringify({
            url: _host
        })
    }

    nets(opts, function (err, res) {
        if (err) return console.error(err)
    })
}

chrome.runtime.onInstalled.addListener(update)
chrome.tabs.onCreated.addListener(update)
chrome.tabs.onRemoved.addListener(remove)
chrome.tabs.onUpdated.addListener(loaded)
