# createDataContext

### A function that automates the creationg of context and reducer
It's boringly annoying to keep creating a context, reducer, dispatch, actions, and all that $H!T. So I created a function that takes an actions object that has all the action function (with state, and payload as params), an initial state, and an optional init function for lazy loading. Then, it returns a provider and hook.
The hook returns the as first element in an array as well as an object that has all the actions that can be destructured with the SAME action functions name
