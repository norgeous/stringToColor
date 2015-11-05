import { Color } from 'brehaut/color-js/color';
import { crc32hex } from 'norgeous/crc32hex';

export class stringToColor {
		
	constructor(config = {}) {

		// extend default options
		this.options = Object.assign({
			useCache: true,
			mode: 0
		}, config);

		// create empty cache
		this.objectCache = {};
		
		// instantiate class that mints crcs (only one instance required)
		this.crc = new crc32hex();
		
		// unpack modemask number to bit flipped binary form
		this.modeMask = [];
		for (let v of [3,5,6,9,10,12,17,18,20,24,33,34,36,40,48,65,66,68,72,80,96,129,130,132,136,144,160,192]) {
			this.modeMask.push( ( "00000000" + ((v^255)>>> 0).toString(2) ).slice(-8) );
		}
		
	}

	colorize(str = "", config = {}) {

		// extend class options with incoming
		let options = Object.assign({}, this.options, config);

		// validate options.mode
		if(isNaN(parseInt(options.mode)) || !isFinite(options.mode) || options.mode >= this.modeMask.length || options.mode < 0) options.mode = 0;			// mode can be 0 to 27
		
		// force string
		str = str.toString();

		// setup unique key for this operation to be used in cache dictionary
		let cache_key = str+':'+JSON.stringify(options).replace(/[\[\]\"{}:,]/g,"");

		// check str with this config already cached
		if(this.objectCache[cache_key] !== undefined) {

			// recall from cache
			this.objectCache[cache_key].config.fromCache = true;
			return this.objectCache[cache_key];

		} else {

			// make hex crc32
			let crc = this.crc.str(str);
			
			// substring 6 of the 8 digits, by removing 2
			let mm = this.modeMask[options.mode];
			let hashSlice = crc.split('').map(function(e,i){
				return ( mm[i]==='1' ? e : '' );
			}).join('');

			// generate color model from substring of crc
			let brehautColorObject = new Color('#'+hashSlice);

			// apply brehaut transforms
			if(options.transform !== undefined){
				for(let transform of options.transform){
					let transform_method = Object.keys(transform)[0];
					let transform_value = transform[transform_method];
					brehautColorObject = brehautColorObject[transform_method](transform_value);
				}
			}

			// add some additional configuration properties into the object for debugging purposes
			brehautColorObject.config = {
				crc: crc,
				mode: options.mode,
				modeMask: this.modeMask[options.mode],
				cachingOn: options.useCache,
				fromCache: false
			};

			// cache result
			if (options.useCache === true) {
				this.objectCache[cache_key] = brehautColorObject;
			}
			
			// return brehaut color object
			return brehautColorObject;

		}

	}

} 
