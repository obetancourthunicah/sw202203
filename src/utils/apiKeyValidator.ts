const apiKeys = (process.env.API_KEYS || '').split('|');
// ['asd0f976asdf8907asd0897asdflkjh','anotherSimpleApiKeySchemaData']

const validateApiKey = (apikey:string) =>
{
  return apiKeys.includes(apikey);
}

export default validateApiKey;
