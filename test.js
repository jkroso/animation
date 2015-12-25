import Animation from './index'

const animation = new Animation

animation.on('a', () => console.log('a'))
animation.emit('a')
