1. `npm init -y`
2. `npm install express`
3. `npm i --save-dev nodemon` - restart server automatically after changes
![[Pasted image 20251123201824.png]]
4. Change the "scripts" section -> this is restart the server automatically without manual intervention after every change.
![[Pasted image 20251123205311.png]]
5. this is the basic, Server express code
6. we can do a bunch of different stuff with the res.
![[Pasted image 20251123210019.png]]
7. here everything is self explanatory, and also the `res.render` needs a "Engine" to display, which is `ejs`
---
## Routing
1. Basically adding a `'/'` is called route, '/about' -> this is a sample route, 
![[Pasted image 20251123210723.png]]
2. we can also define multiple routes in a separate folder, and from there we can import our routes using export, 
	1. for `routes` -> `express.routes()`
	2. then export it using `export default route`
	3. then import in main server.js
![[Pasted image 20251123212918.png]]
3. for more advanced routing, we need to pass in para meters, 
![[Pasted image 20251123213546.png]]
this is how we can pass the parameters
![[Pasted image 20251123213755.png]]
but in cases, like above, to update and delete also the route is the same thing, so what we can do is we can use `.route()`
in node.js, like the below image, 
![[Pasted image 20251123214143.png]]
in this way, we can have `get` `put` `delete` request with the same ID, 
