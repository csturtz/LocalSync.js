LocalSync.js
============

Sync your javascript properties to localStorage in real time


## Examples

### Setup Synchronization
<code>myObj.localSync('myProp','key.in.local.storage');</code>

This does 2 things:
+ initialize <code>myObj.myProp</code> with the current value of 'key.in.local.storage' in localStorage
+ setup synchronization so that any change to <code>myObj.myProp</code> is immediately pushed to localStorage


## TODO
+ Provide way to remove synchronization of a property (needs Object.unwatch)
+ Tests
