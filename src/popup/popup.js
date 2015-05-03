document.getElementById('signin').addEventListener('click', function () {
    chrome.tabs.create({
        url: process.env.BASE_URL + '/auth/twitter'
    }, function (tab) {
        console.log(tab)
    })
    return false
})
