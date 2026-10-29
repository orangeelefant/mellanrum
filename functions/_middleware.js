// www sends visitors to the apex domain.
export const onRequest = ({ request, next }) => {
  const url = new URL(request.url);
  if (url.hostname === 'www.mellanrumpsykoterapi.se') {
    url.hostname = 'mellanrumpsykoterapi.se';
    return Response.redirect(url.toString(), 301);
  }
  return next();
};
