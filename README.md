# es6-event-emitter

[![Build Status][build-image]][build-url]

[![devDependency Status][dev-dep-image]][dev-dep-url]

[![MIT][mit-image]][mit-url]
[![npm][npm-version-image]][npm-url]

> Custom, simple, extendable event/messaging system written in ES6

## Getting Started ##

#### Installation
From the root of your project.
```sh
npm install vue-popover --save
```

#### Usage
Simple implementation of emitter. See [api](#api) below.
```
import Emitter from 'es6-event-emitter';

export default class Component extends Emitter {
	constructor(){
		super();
	}
	
	//-- Trigger
	someAction(){
		...
	
		this.trigger('component:action');
	}
	
	//-- Trigger with data
	someOtherAction(){
		...
	
        this.trigger('component:otheraction', {
            foo: 'bar',
            baz: 'buzz'
        });
    }
}

//-- Create a new component
const component = new Component();

//-- Set up functions for listeners - best practice in case you want to remove them later.
const action = () => {
	console.log('action triggered');
}

const otheraction = data => {
	console.log(`other action triggered with data ${data}`);
}

//-- Register listeners
component.on('component:action', action);
component.on('component:otheraction', otheraction);

//-- Call methods
component.someAction();
component.someOtherAction();
```

<a name="api"></a>
#### API
* **[`on`](#on)**
* **[`off`](#off)**
* **[`trigger`](#trigger)**

<a name="on"></a>
##### on - **`on(event:String, callback:Function)`**
Registers a listener
```js
component.on('component:action', action);
```

<a name="off"></a>
##### off - **`off(event:String, callback:Function)`**
Removes a registered listener from the event stack
```js
component.off('component:action', action);
```

<a name="trigger"></a>
##### trigger - **`trigger(event:String, ...args:*)`**
Triggers a registered event with optional data
```js
this.trigger('component:action');

//-- With data
this.trigger('component:action', {
    foo: 'bar',
    baz: 'buzz'
});
```


## Tests ##
```
npm test
```
 
[build-image]: https://travis-ci.org/JFusco/es6-event-emitter.svg?branch=master
[build-url]: https://travis-ci.org/JFusco/es6-event-emitter
[mit-image]: https://img.shields.io/npm/l/es6-event-emitter.svg?style=flat-square
[mit-url]: https://github.com/JFusco/es6-event-emitter/blob/master/LICENSE
[npm-version-image]: https://img.shields.io/npm/v/npm.svg?maxAge=2592000
[npm-url]: https://www.npmjs.com/package/es6-event-emitter
[dev-dep-image]: https://david-dm.org/JFusco/es6-event-emitter/dev-status.svg
[dev-dep-url]: https://david-dm.org/JFusco/es6-event-emitter?type=dev