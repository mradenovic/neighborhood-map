import 'jquery';
import OAuth from 'oauth';
import {YELP_API_KEYS as auth} from 'yelp-api-keys';

function cb(data) {
  console.log('cb(data) executed')
}

let term = "grocery";
let ll = '40.7436618,-73.9264847'
let radius = 500;

let accessor = {
  consumerSecret: auth.consumerSecret,
  tokenSecret: auth.accessTokenSecret
};

let parameters = [];
parameters.push(['term', term]);
parameters.push(['ll', ll]);
parameters.push(['radius_filter', radius]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

let message = {
  'action': 'https://api.yelp.com/v2/search',
  'method': 'GET',
  'parameters': parameters
};

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);

let parameterMap = OAuth.getParameterMap(message.parameters);

let request_config = {
  'url': message.action,
  'data': parameterMap,
  'dataType': 'jsonp',
  'jsonpCallback': 'cb',
  'cache': true
}

export default request_config;
