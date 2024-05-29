const responseMiddleware = ({set, response}: any) => {
  set.status = 200;
  //return response directly cause [object Object] when response refers to an object of typeorm
  //Here is a quick workaround: we need first format it to json then parse it back to object
  return JSON.parse(JSON.stringify(response));
}
export default responseMiddleware;