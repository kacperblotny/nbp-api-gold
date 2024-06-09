const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db.js')
const mongoose = require('mongoose')

connectDB()

const GoldPrices = require('./models/goldPrices.js')

const app = express()
app.use(cors())

const PORT = process.env.PORT || 5002
console.log('test')

app.get('/', (req, res) => {
  res.send(`api running on port ${PORT}`)
})

// @route   GET api/gold_prices
// @desc    GET all gold prices, sorted by date
// @access  public
app.get('/api/gold_prices', async (req, res) => {
  try {
    const goldPrices = await GoldPrices.find()

    goldPrices.sort((a, b) => a.data.localeCompare(b.data))

    if (goldPrices) {
      res.json(goldPrices)
    } else {
      res.status(404).json({
        error: 'No gold prices found, this might be due to lack of data',
      })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/gold_price/:date
// @desc    GET gold price for exact day in format YYYY-MM-DD
// @access  public
app.get('/api/gold_price/:date', async (req, res) => {
  try {
    const singleDay = req.params.date
    const goldPrice = await GoldPrices.findOne({ data: singleDay })

    if (goldPrice) {
      res.json(goldPrice)
    } else {
      res.status(404).json({
        error:
          'No gold prices found, this might be due to lack of data or incorrect date format YYYY-MM-DD`',
      })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/gold_price/:fromdate/:todate
// @desc    GET get gold prices in specyfic range
// @access  public
app.get('/api/gold_prices/:fromdate/:todate', async (req, res) => {
  try {
    const fromDate = req.params.fromdate
    const toDate = req.params.todate

    const goldPrices = await GoldPrices.find({
      data: {
        $gte: fromDate,
        $lte: toDate,
      },
    })

    goldPrices.sort((a, b) => a.data.localeCompare(b.data))

    if (goldPrices.length > 0) {
      res.json(goldPrices)
    } else {
      res.status(404).json({
        error:
          'No gold prices found, this might be due to lack of data or incorrect date format YYYY-MM-DD`',
      })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
