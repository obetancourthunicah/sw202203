import validateApiKey from "@server/utils/apiKeyValidator";
const apiKeyMW = (req, res, next)=>{
  const apikey = req.get('apikey') || '';
  if (validateApiKey(apikey)){
    return next();
  }
  return res.status(406).json({"error":"APIKEY Not valid!"});
}

export default apiKeyMW;
