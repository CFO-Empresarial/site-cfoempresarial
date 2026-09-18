export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  if (
    url.hostname === "www.cfoempresarial.com.br" &&
    (request.method === "GET" || request.method === "HEAD")
  ) {
    url.hostname = "cfoempresarial.com.br";
    return Response.redirect(url.toString(), 301);
  }

  return next();
}
