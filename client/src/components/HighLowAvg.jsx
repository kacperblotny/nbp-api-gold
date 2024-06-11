import React from 'react'

function HighLowAvg({ data }) {
  const pricesObj = {}
  data.forEach((item) => {
    pricesObj[item.data] = item.cena
  })

  const dates = Object.keys(pricesObj)
  const prices = Object.values(pricesObj)

  const highestPrice = Math.max(...prices)
  const lowestPrice = Math.min(...prices)
  const averagePrice =
    prices.reduce((sum, price) => sum + price, 0) / prices.length

  let belowAvg = 0
  let aboveAvg = 0

  for (const key in prices) {
    if (prices.hasOwnProperty(key)) {
      if (prices[key] > averagePrice) {
        aboveAvg++
      } else if (prices[key] < averagePrice) {
        belowAvg++
      }
    }
  }

  return (
    <div className='w-[90vw]'>
      <ul className='flex justify-between'>
        <li>
          <p className='text-sm text-center'>Lowest Price:</p>
          <p className='text-3xl text-center'>{lowestPrice}</p>
          <p className='text-sm text-center'>
            {dates[prices.indexOf(lowestPrice)]})
          </p>
        </li>
        <li>
          <p className='text-sm text-center'>Prices below average:</p>
          <p className='text-2xl text-center'>{belowAvg}</p>
        </li>
        <li>
          <p className='text-sm text-center'> Average Price:</p>
          <p className='text-3xl text-center'>{averagePrice.toFixed(2)}</p>
        </li>
        <li>
          <p className='text-sm text-center'>Prices above average:</p>
          <p className='text-2xl text-center'>{aboveAvg}</p>
        </li>
        <li>
          <p className='text-sm text-center'>Highest Price: </p>
          <p className='text-3xl text-center'>{highestPrice}</p>
          <p className='text-sm text-center'>
            {dates[prices.indexOf(highestPrice)]}
          </p>
        </li>
      </ul>
    </div>
  )
}

export default HighLowAvg
