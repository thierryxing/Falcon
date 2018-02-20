/**
 * Created by Thierry on 2017/6/7.
 */
export default {

  ProjectType: {
    App: 'App',
    Lib: 'Lib'
  },

  Platforms: {
    iOS: 'ios',
    Android: 'android'
  },

  Templates: {
    Prod: 0,
    Test: 1,
    Beta: 2,
    Lib: 3
  },

  BuildStatus: {
    Failed: 'failed',
    Success: 'success',
    Processing: 'processing',
    Canceled: 'canceled'
  },

  CloneStatus: {
    Prepare: 'prepare',
    Processing: 'processing',
    Success: 'success',
    Failed: 'failed'
  }

}

