/* istanbul ignore file */
import Result from './src/Result.vue'

Result.install = function (app, naive) {
  app.component(naive.componentPrefix + Result.name, Result)
}

export default Result
