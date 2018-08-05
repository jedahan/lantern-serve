module.exports = function Cors(req, res, next) {
  
    process.env.ORIGINS = process.env.ORIGINS +",https://lantern.global,http://lantern.global,https://lantern.local,http://lantern.local,https://localhost,http://localhost,http://localhost:3000";
    var allowed_origins = process.env.ORIGINS.split(",");
    var origin = req.headers.origin;
    if(allowed_origins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, authorization, x-requested-with, x-http-method-override, content-type, origin, referer, x-csrf-token');
    res.header('Access-Control-Allow-Credentials', true);


    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.status(200).send();
    }
    else {
    //move on
      next();
    }
};