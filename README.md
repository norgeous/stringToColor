# stringToColor
Javascript for converting a string to a color, via CRC32 hash

* ES6 module
* CRC operations are cached (for performance)

## Usage
This ES6 module can be used with JSPM.
Follow the tutorial at: https://github.com/jspm/demo-es6
then use the following command line to install:
```shell
jspm install github:norgeous/stringToColor
```
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

### Coming soon
https://github.com/brehaut/color-js/#methods
