import Emitter from '@jkroso/emitter'
import ease from 'ease-component'
import ms from 'parse-duration'
import now from '@jkroso/now'
import assert from 'assert'

export default class Animation {
  constructor() {
    this._duration = 300
    this._ease = ease.linear
    this.running = false
  }

  /**
   * set duration to `n` milliseconds. You can also
   * pass a natural language string
   *
   * @param {Number|String} n
   * @return {this}
   */

  duration(n) {
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

  ease(fn) {
    if (typeof fn == 'string') fn = ease[fn]
    assert(typeof fn == 'function', 'invalid easing function')
    this._ease = fn
    return this
  }

  /**
   * run the animation with an optional duration
   *
   * @param {Number|String|Function} [n]
   * @return {this}
   */

  run(n) {
    if (n != null) this.duration(n)
    const duration = this._duration
    const start = now()
    const loop = () => {
      const progress = (now() - start) / duration
      if (progress >= 1) {
        this.render(1)
        this.running = false
        this.emit('end')
      } else {
        this.render(progress)
        requestAnimationFrame(loop)
      }
    }
    requestAnimationFrame(loop)
    this.running = true
    return this
  }
}

/**
 * mixin Emitter
 */

Object.assign(Animation.prototype, Emitter.prototype)
