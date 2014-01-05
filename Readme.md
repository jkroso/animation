
# animation

  A base class for animations. Used by [move](//github.com/jkroso/move) and [timeline](//github.com/jkroso/timeline)

## Installation

With your favorite package manager:

- [packin](//github.com/jkroso/packin): `packin add jkroso/animation`
- [component](//github.com/component/component#installing-packages): `component install jkroso/animation`
- [npm](//npmjs.org/doc/cli/npm-install.html): `npm install animation`

then in your app:

<!--js window = global -->

```js
var Animation = require('animation')
```

## API

### Animation()

```js
function Mover(el){
  this.el = el
}
Animation.extend(Mover)
```
