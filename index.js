
var extensible = require('extensible')
var ms = require('parse-duration')
var Emitter = require('emitter')
var ease = require('ease')
var now = require('now')
var raf = require('raf')

module.exports = Animation

function Animation(){}

/**
 * mixin methods
 */

Emitter(Animation.prototype)
extensible(Animation)

/**
 * set duration to `n` milliseconds. You can also
 * pass a natural language string
 *
 * @param {Number|String} n
 * @return {this}
 */

Animation.prototype.duration = function(n){
  if (typeof n == 'string') n = ms(n)
  this._duration = n
  return this
}

/**
 * Set easing function to `fn`.
 *
 *   animation.ease('in-out-sine')
 *
 * @param {String|Function} fn
 * @return {this}
 */

Animation.prototype.ease = function(fn){
  if (typeof fn == 'string') fn = ease[fn]
  if (!fn) throw new Error('invalid easing function')
  this._ease = fn
  return this
}

Animation.prototype.ease('linear') // default

/**
 * run the animation with an optional duration
 *
 * @param {Number|String|Function} [n]
 * @return {this}
 */

Animation.prototype.run = function(n){
  if (n != null) this.duration(n)
  var duration = this._duration
  var start = now()
  var self = this
  raf(function loop(){
    var progress = (now() - start) / duration
    if (progress >= 1) {
      self.render(1)
      self.running = false
      self.emit('end')
    } else {
      self.render(progress)
      raf(loop)
    }
  })
  this.running = true
  return this
}
