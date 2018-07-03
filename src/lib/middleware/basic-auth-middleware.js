import HttpErrors from 'http-errors';
import Account from '../../model/account';

export default (request, response, next) => {
  if (!request.headers.authorization) return next(new HttpErrors(400, 'AUTH MIDDLEWARE - invalid request'));

  // if i make it past the if statement, I know I have the right headers
  const base64AuthHeader = request.headers.authorization.split(' ')[1];
  if (!base64AuthHeader) return next(new HttpErrors(400, 'AUTH MIDDLEWARE - invalid request'));
  
  // base64AuthHeader is base64 encoded, so we use Node's Buffer class to make a new buffer out of it, inform the Buffer class it should expect a base64-encoded string (hence passing in the 'base64' arg), then we toString() it to convert it utf-8 to human readable form
  const stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();
  // at this point, stringAuthHeader loks like this: username:password

  // array destructuring
  const [username, password] = stringAuthHeader.split(':');
  if (!username || !password) return next(new HttpErrors(400, 'AUTH, invalid request'));

  // if we reached this point, we know that the user sent us a username and password
  // this is the same as return Account.findOne({ username: username})
  let account;
  return Account.findOne({ username })
    .then((result) => {
      if (!result) return next(new HttpErrors(400, 'BASIC AUTH - invalid request'));
      account = result;
      return account.verifyPasswordPromise(password);
    })
    .then((verified) => {
      if (verified) {
        request.account = account;
        return next();
      }
      // else
      return next(new HttpErrors(400, 'BASIC AUTH - unable to validate user'));
    })
    .catch(next);
};
