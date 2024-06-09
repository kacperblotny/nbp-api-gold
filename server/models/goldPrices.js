const { default: mongoose } = require('mongoose')

const GoldPricesSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      required: true,
    },
    cena: {
      type: Number,
      required: true,
    },
  },
  { collection: 'gold_prices' }
)

module.exports = GoldPrices = mongoose.model('GoldPrice', GoldPricesSchema)
