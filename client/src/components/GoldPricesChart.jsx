import React, { useEffect, useState, useRef } from 'react'
import CreateChart from './CreateChart'

const GoldPricesChart = () => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/gold_prices')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const jsonData = await response.json()
        setChartData(jsonData)
      } catch (error) {
        console.error('There was an error fetching the gold prices!', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='w-screen'>
      <h2 className='text-4xl p-4'>
        Cena za 1g złota wyliczona przez NBP 2013-2024
      </h2>
      <CreateChart dataForChart={chartData} />
    </div>
  )
}

export default GoldPricesChart
