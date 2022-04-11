function track() {
  const url = 'https://escritopor.elenatorro.com/.netlify/functions/track';
  const currentDate = new Date(Date.now())

  const data = {
    'event': 'load',
    'date': currentDate.toLocaleDateString(),
    'timestamp': currentDate.toISOString(),
    'language': navigator.language,
    'languages': JSON.stringify(navigator.languages),
    'useragent': navigator.userAgent,
    'referrer': document.reeferrer,
    'href': location.href,
    'origin': location.origin,
    'screen-x': window.screenX,
    'screen-y': window.screenY
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    },
    body: JSON.stringify(data)
  })
}

(function() {
  window.onload = track
})()
