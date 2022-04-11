const fetch = require('node-fetch')

const {
  TINYBIRD_TOKEN,
  TINYBIRD_API,
  TINYBIRD_DATASOURCE_NAME
} = process.env

exports.handler = function (event) {
  const url = `${TINYBIRD_API}?name=${TINYBIRD_DATASOURCE_NAME}&wait=false`

  console.log('#Netlify event', event)
  console.log('#Netlify event body', JSON.parse(event.body))

  const request = {
    method: 'POST',
    body: JSON.parse(event.body),
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${TINYBIRD_TOKEN}`
    }
  }

  return fetch(url, request)
    .then(onResponse)
    .then(onSuccess)
    .catch(onError)
}

function onResponse(res) {
  console.log('#Netlify ok', res)
  return true
}

function onSuccess(res) {
  return {
    statusCode: 200,
    body: JSON.stringify(res)
  }
}

function onError(error) {
  console.log('#Netlify error', error)
  return {
    statusCode: 422,
    body: JSON.stringify(error)
  }
}
