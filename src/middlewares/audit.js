const auditMiddleware = (request, response, next) => {
  const startDate = new Date.now();
  const isAuthenticated = !!request.headers.authorization;
  response.on('finsh', () => {
    const log = {
      ip: request.ip,
      method: request.method,
      path: request.path,
      body: request.body,
      query: request.query,
      params: request.params,
      startTime: startDate,
      endTime: new Date.now(),
      msDuration: new Date.now() - startDate,
      httpStatus: response.statusCode,
      isAuthenticated: isAuthenticated,
    };
  });
  // Store log in database
  next();
};

export { auditMiddleware };
