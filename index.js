import Emitter from '@jkroso/emitter'
import ease from 'ease-component'
import ms from 'parse-duration'
import now from '@jkroso/now'
import assert from 'assert'

export default class Animation extends Emitter {
  constructor() {
    super()
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

  /*
   * Run the Animation `maxLoops` times
   */

  loop(maxLoops) {
    const duration = this._duration
    const iteration = () => {
      if (!this.running) return
      const time = now()
      const progress = (time - start) / duration
      if (progress >= 1) {
        if (++loops < maxLoops) {
          start = time
          this.render(Math.min(progress - 1, 1))
          requestAnimationFrame(iteration)
        } else {
          this.render(1)
          this.running = false
          this.emit('end')
        }
      } else {
        this.render(progress)
        requestAnimationFrame(iteration)
      }
    }
    var loops = 0
    var start = now()
    requestAnimationFrame(iteration)
    this.running = true
    return this
  }

  /**
   * run the animation with an optional duration
   *
   * @param {Number|String} [n]
   * @return {this}
   */

  run(n) {
    if (n != null) this.duration(n)
    return this.loop(1)
  }

  /**
   * Prevent any further frames from being rendered
   * @return {this}
   */

  stop() {
    this.running = false
    return this
  }
}
