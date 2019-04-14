## Aspect/Feature oriented design example

This is a create-react-app with basic Wattifi functionality (theme, auth0 auth, state management, 
routing public and private).

Aspects implementation are pretty simple but enough to get the idea.

Features are independent. They can use only app API.
Aspects can use each other.

## Notes

- CRA is hard when webpack config customization needed. Simple referencing ES modules 
from other local packages doesn't work. I had to use react-scripts-rewired and adjust webpack config.
https://medium.com/capriza-engineering/sharing-source-code-and-libraries-in-react-bd30926df312 (Share components lib with CRA)

- Technically aspects could be implemented as features too. Nothing prevents us in `configure` write
something like this: `app.doSomething = function() { ... }`
But in this case some additional logic should be implemented to track dependencies between aspects and
configure them in correct order. My implementation has its own pros, like inheritance, 
common class/mixin syntax. Dependencies can be addressed by inheriting aspect mixins in correct order.

- Using something like `const MyComponent = app.getComponent('mycomponent)` and then 
`<MyComponent />` seems a bit ugly. One can implement a component using app context. 
It will be something like this: `<AppComponent name="mycomponent" />`  

- It's better to implement MenuItemsAspect with apollo state if we need to filter menu items for 
unauthenticated users. Then Sidebar container, depending on if user is authentication queries all or 
public menu items only.

## Generic app design approach

Any app or computational process can be designed as follows:

- create empty app/context
- fill app/context with aspects (app API)
- configure app by using app API (directly or with features or other modularity approach)
- bootstrap (start server, bundle spa app, visualize app data, etc.)

In my example implementation bootstrapping is done as a `app.start()` in some aspects.
If correctly designed, it should be a dedicated function a class. 
 
