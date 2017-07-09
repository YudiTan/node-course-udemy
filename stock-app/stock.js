const request = require('request');

var stockTicker = (ticker, callBack) => {
  request({
  	url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=U4J8G59LS66TT56U`,
  	json: true
  }, (error, response, body) => {
  	if (error){
      callBack('Unable to connect to AlphaVantage servers.');
  	} else if (body["Error Message"]){
      callBack('Ticker invalid.');
  	} else if (body["Time Series (Daily)"]){
      callBack(undefined, {
        Ticker: `${ticker}`,
        Date: Object.keys(body['Time Series (Daily)'])[0],
        Open: body['Time Series (Daily)'][Object.keys(body['Time Series (Daily)'])[0]]['1. open'],
        Close: body['Time Series (Daily)'][Object.keys(body['Time Series (Daily)'])[0]]['4. close'],
      });

  }});

};

module.exports.stockTicker = stockTicker;
