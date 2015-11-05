# stringToColor
Javascript for converting a string to a color, via CRC32 hash

* ES6 module
* return objects are cached (for performance)

## Install
This ES6 module can be used with JSPM.
```shell
jspm install github:norgeous/stringToColor
```
## Usage
Example class (ES6) ```my-class.js```:
```js
import { stringToColor } from 'norgeous/stringToColor';

export class MyClass {

	constructor() {

		this.stringToColor = new stringToColor();
		this.arr = [ 'foo', 'bar', 'baz', 'qux', 'quux', 'corge', 'grault', 'garply', 'waldo', 'fred', 'plugh', 'xyzzy', 'thud', 'plumless', 'buckeroo' ];

		this.processArr();

	}

	processArr() {

		for(let word of this.arr){
			let c = this.stringToColor.colorize(word);
			document.write('<div style="background:'+c.toCSS()+'">'+word+'</div>');
		}

	}

}
```
## Demo
demo: https://rawgit.com/norgeous/stringToColor/master/demo1/index-sfx.html

doc: https://github.com/norgeous/stringToColor/tree/master/demo1

### Color manipulation

All of the following are optional
```js
let config = {
	useCache:true,
	mode:0,
	transform:[
		{setSaturation:1},
		{setLightness:0.2}
	]
};
```
```useCache``` turns caching on or off. defaults to true.

```mode``` affects which bits are selected from the CRC when choosing the color. 28 modes to choose from 0 to 27. default mode is 0.

```transform``` contains an array of key value objects that correspond to these methods https://github.com/brehaut/color-js/#methods

There are two ways to apply the config

* config applied on constructor is used for all operations:
```js
this.stringToColor = new stringToColor(config);
```

* config applied on function is used temporarly:
```js
this.stringToColor.colorize(word,config);
```

Or you can chain the transforms directly onto the return object of ```colorize()```, but these are not cached:
```js
this.stringToColor.colorize(word).setSaturation(1).setLightness(0.2);
```