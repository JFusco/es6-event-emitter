# es6-event-emitter
[![Build Status](https://travis-ci.org/JFusco/es6-event-emitter.svg?branch=master)](https://travis-ci.org/JFusco/es6-event-emitter)
[![devDependency Status](https://david-dm.org/JFusco/es6-event-emitter/dev-status.svg)](https://david-dm.org/JFusco/es6-event-emitter#info=devDependencies)

> Custom event/messaging system for JavaScript **es2015**.

## Getting Started ##

#### Install
```
npm install es6-event-emitter
```

#### Usage
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
            baz: 'buzz
        });
    }
}

//-- Create a new component
cont component = new Component();

//-- Register listeners
component.on('component:action', () => {
	console.log('action triggered');
});

component.on('component:otheraction', data => {
	console.log('other action triggered with data', data);
});

//-- Call methods
component.someAction();
component.someOtherAction();
```

## API ##
* **`on(event:String, callback:Function)`** - registers a listener
* **`off(event:String, callback:Function)`** - removes a registered listener from the event stack
* **`trigger(event:String, ...args:*)`** - triggers a registered event with optional data

## Tests ##
```
npm test
```

## License ##

 * [MIT License](http://www.opensource.org/licenses/mit-license.php)