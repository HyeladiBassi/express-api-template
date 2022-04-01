export function success(data = null, messages = null) {
  return {
    status: 'OK',
    errors: null,
    messages,
    data,
  };
}

export function error(error, messages = null, status = 'ERR') {
  return {
    status,
    errors: error,
    messages,
    data: null,
  };
}

export function logError(error) {
  let obj;
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    obj = {
      status: error.response.status,
      statusText: error.response.statusText,
      config: {
        baseUrl: error.response.config.baseURL,
        url: error.response.config.url,
        method: error.response.config.method,
        headers: error.response.config.headers,
        requestData: error.response.config.data,
      },
      responseData: error.response.data,
    };
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    obj = error.request;
  } else {
    // Something happened in setting up the request that triggered an Error
    obj = {
      message: error.message,
    };
  }
  console.log(obj);
}
