import CreateChart from './CreateChart'
import React, { useEffect, useState } from 'react'

function DateRange() {
  const [chartData, setChartData] = useState([])
  const [fromDate, setfromDate] = useState('2013-01-02')
  const [toDate, settoDate] = useState('2014-01-02')

  const handleFromDate = (event) => {
    setfromDate(event.target.value)
  }
  const handleToDate = (event) => {
    settoDate(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dateRegex = /^\w{4}-\w{2}-\w{2}$/
        if (!dateRegex.test(fromDate)) {
          return
        }
        if (!dateRegex.test(toDate)) {
          return
        }

        const response = await fetch(
          `http://localhost:5002/api/gold_prices/${fromDate}/${toDate}`
        )
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
  }, [fromDate, toDate])

  return (
    <div className='py-16'>
      <div className='mx-8'>
        <p className='text-xl'>
          Sprawdź cenę złota dla danego dnia, date podaj w formacie YYYY-MM-DD
        </p>
        <p className='text-sm'>
          Pamiętaj, ze API NBP ma dane od 2013-01-02 oraz nie pracuja w weekendy
          i święta
        </p>

        <div className='flex items-center gap-8'>
          <input
            class='my-4 w-[200px] px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-sm focus:outline-none focus:border-blue-500'
            type='text'
            value={fromDate}
            onChange={handleFromDate}
          />
          <input
            class='my-4 w-[200px] px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-sm focus:outline-none focus:border-blue-500'
            type='text'
            value={toDate}
            onChange={handleToDate}
          />
        </div>
      </div>
      <div>
        <CreateChart dataForChart={chartData} />
      </div>
    </div>
  )
}

export default DateRange
