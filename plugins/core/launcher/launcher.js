var n = require('numbro')
  , tb = require('timebucket')

module.exports = function container (get, set, clear) {
  var c = get('constants')
  return function launcher (action) {
    return function () {
      var args = [].slice.call(arguments)
      var command = get('command')
      get('motley:db.run_states').load(command, function (err, run_state) {
        if (err) throw err
        run_state || (run_state = {
          id: command,
          time: new Date().getTime(),
          total_us: 0
        })
        run_state.start_us = tb('µs').value
        set('run_state', run_state)
        Object.keys(run_state).forEach(function (k) {
          var val = run_state[k]
          if (typeof val === 'number') {
            val = n(val).format('0').white
          }
          else if (typeof val === 'string') {
            val = ('"' + val + '"').green
          }
          get('logger').info('launcher', 'run_state.'.grey + (k + ' =').cyan, val, {public: false})
        })
        var save_interval = setInterval(get('launcher.save_state'), c.save_state_interval)
        set('intervals[]', save_interval)
        action.apply(null, args)
      })
    }
  }
}