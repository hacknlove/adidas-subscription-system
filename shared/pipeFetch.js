import fetch from 'node-fetch';

export function pipeFetch(res, ...fetchParams) {
  return fetch(...fetchParams).then(response => response.body.pipe(res)).catch((error) => {
    console.error(error)
    res.status(500).json({ serverError: true})
  })
}

export default function pipeFetchFactory(getParams) {
  return (req, res) => {
    const [url, originalOptions] = getParams(req)

    const options = { ...originalOptions }

    if (options.data) {
      options.body = JSON.stringify(options.data);
      options.headers = { ...options.headers, 'Content-Type': 'application/json' };
      delete options.data;
    }

    pipeFetch(res, url, options)
  } 
}