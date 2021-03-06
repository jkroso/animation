# animation

  A base class for animations. Used by [move](//github.com/jkroso/move) and [timeline](//github.com/jkroso/timeline)

## Installation

`npm install @jkroso/animation`

then in your app:

<!--js window = global -->

```js
import Animation from 'animation'
```

## API

### Animation#duration(n:Number|String)

  set duration to `n` milliseconds. You can also
  pass a natural language string

```js
animation.duration('1.2s')
```

### Animation#ease(fn:String|Function)

  Set easing function to `fn`.

```js
animation.ease('in-out-sine')
```

### Animation#run([n]:Number|String)

  run the animation with an optional duration

```js
animation.run()
```

## Expected extensions

### Animation#render(n:Number)

  render the animation at point `n` between its endpoints where `n` is a number from `0` to `1`. Subclasses may also choose to apply the `._ease()` function to `n` within render.

```js
Mover.prototype.render = function(n){
  // apply changes here
}
```
