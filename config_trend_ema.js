var c = module.exports = {}

// mongo configuration
c.mongo = {}
c.mongo.host = process.env.MONGODB_PORT_27017_TCP_ADDR || 'mongodb'
c.mongo.port = process.env.MONGODB_PORT_27017_TCP_PORT || 27017
c.mongo.db = 'zenbot4'
c.mongo.username = null
c.mongo.password = null
c.mongo.replicaSet = null

// Exchange API keys:
c.gdax = {}
c.gdax.key = process.env.GDAX_KEY || 'GDAX-API-KEY'
c.gdax.b64secret = process.env.GDAX_SECRET || 'GDAX-BASE64-SECRET'
c.gdax.passphrase = process.env.GDAX_PASSPHASE || 'GDAX-PASSPHRASE'


// Strategy and Selector
// trend_ema (default)
//   description:
//    Buy when (EMA - last(EMA) > 0) and sell when (EMA - last(EMA) < 0). Optional buy on low RSI.
//  options:
//    --period=<value>  period length (default: 2m)
//    --min_periods=<value>  min. number of history periods (default: 52)
//    --trend_ema=<value>  number of periods for trend EMA (default: 26)
//    --neutral_rate=<value>  avoid trades if abs(trend_ema) under this float (0 to disable, "auto" for a variable filter) (default: auto)
//    --oversold_rsi_periods=<value>  number of periods for oversold RSI (default: 14)
//    --oversold_rsi=<value>  buy when RSI reaches this value (default: 10)
c.selector = process.env.ZENBOT_SELECTOR || 'gdax.BTC-EUR'
c.strategy = process.env.ZENBOT_STRATEGY || 'trend_ema'

c.period = process.env.ZENBOT_PERIOD || '30m'
c.min_periods = process.env.ZENBOT_MIN_PERIOD || '10'
c.trend_ema = process.env.ZENBOT_TREND_EMA || '21'
c.neutral_rate = 'auto'
c.overbought_rsi_periods = 100
c.oversold_rsi= 0

// Optional stop-order triggers:
// sell if price drops below this % of bought price (0 to disable)
c.sell_stop_pct = 0
// buy if price surges above this % of sold price (0 to disable)
c.buy_stop_pct = 0
// enable trailing sell stop when reaching this % profit (0 to disable)
c.profit_stop_enable_pct = 0
// maintain a trailing stop this % below the high-water mark of profit
c.profit_stop_pct = 0

// Order execution rules:
// avoid trading at a slippage above this pct
c.max_slippage_pct = 5
// buy with this % of currency balance
c.buy_pct = 99
// sell with this % of asset balance
c.sell_pct = 99
// ms to adjust non-filled order after
c.order_adjust_time = 30000
// avoid selling at a loss below this pct
c.max_sell_loss_pct = 25
// ms to poll order status
c.order_poll_time = 5000
// ms to wait for settlement (after an order cancel)
c.wait_for_settlement = 5000
// % to mark up or down price for orders
c.markup_pct = 0
// become a market taker (high fees) or a market maker (low fees)
c.order_type = 'maker'

// Misc options:
// default # days for backfill and sim commands
c.days = 30
// ms to poll new trades at
c.poll_trades = 30000
// amount of currency to start simulations with
c.currency_capital = 1000
// amount of asset to start simulations with
c.asset_capital = 0
// for sim, reverse time at the end of the graph, normalizing buy/hold to 0
c.symmetrical = false
// number of periods to calculate RSI at
c.rsi_periods = 14
// period to record balances for stats
c.balance_snapshot_period = '15m'
// avg. amount of slippage to apply to sim trades
c.avg_slippage_pct = 0.045
