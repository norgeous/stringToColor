define(['./brehaut-color-1.0.1','./norgeous-crc32hex-0.0.1'],function (brehautcolor, crc32hex) {
	return {
		modemasks:[3,5,6,9,10,12,17,18,20,24,33,34,36,40,48,65,66,68,72,80,96,129,130,132,136,144,160,192],
		brehautColorObjectCache: {},
		colorize: function (str = "", config = {}) {

			// validate arguments and config
			str = str.toString();
			if(isNaN(parseInt(config.mode)) || !isFinite(config.mode) || config.mode >= this.modemasks.length || config.mode < 0) config.mode = 0;			// mode can be 0 to 27

			// setup unique key for this operation to be used in cache dictionary
			var cache_key = str+':'+JSON.stringify(config);

			// check str with this config already cached, if so return it
			if(this.brehautColorObjectCache[cache_key] !== undefined) var brehautColorObject = this.brehautColorObjectCache[cache_key]
			else {

				// unpack modemask number to bit flipped binary form
				var modeMask = ( "00000000" + ((this.modemasks[config.mode]^255)>>> 0).toString(2) ).slice(-8);
				
				// make crc32
				var crc = crc32hex.str(str);
				
				// get 6 of the 8 digits, by removing 2
				var hashSlice = crc.split('').map(function(e,i){
					return ( modeMask[i]==='1' ? e : '' );
				}).join('');

				// generate color model from substring of crc
				var brehautColorObject = new brehautcolor('#'+hashSlice);

				// add some additional properties
				brehautColorObject.crc = crc;
				brehautColorObject.mode = config.mode;
				brehautColorObject.modeMask = modeMask;

				// apply brehaut transforms
				if(config.transform !== undefined){		
					for(var i=0; i<config.transform.length; i++){
						var transform_method = Object.keys(config.transform[i])[0];
						var transform_value = config.transform[i][transform_method];
						brehautColorObject = brehautColorObject[transform_method](transform_value);
					}
				}

				// cache result
				this.brehautColorObjectCache[cache_key] = brehautColorObject;
			}

			// return brehaut color object
			return brehautColorObject;

		}
	};
});