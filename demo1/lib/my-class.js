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
            document.getElementById('output').innerHTML += '<div style="background:'+c.toCSS()+'">'+word+'</div>';
        }

    }

} 
