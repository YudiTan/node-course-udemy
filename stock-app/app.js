const stock = require('./stock.js');
const yargs = require('yargs');
const argv = yargs
	.options({
		s: {
			demand:true,
			alias:'stockticker',
			describe:"Stock ticker for request.",
			string:true
		}
})
	.help()
	.alias('help', 'h')
	.argv;


stock.stockTicker(argv.s, (errorMessage, results) => {
  	if (errorMessage){
  		console.log(errorMessage);
  	} else {
  		console.log(JSON.stringify(results, undefined, 2));
  	}
  });
