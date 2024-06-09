import React, { useEffect, useState } from 'react'

function SingleDayPrice() {
  const [data, setData] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dateRegex = /^\w{4}-\w{2}-\w{2}$/
        if (!dateRegex.test(inputValue)) {
          console.log('bad')

          return
        }

        const response = await fetch(
          `http://localhost:5002/api/gold_price/${inputValue}`
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const jsonData = await response.json()
        setData(jsonData)
        console.log(data)
      } catch (error) {
        setData({ cena: 'There is not price for this date' })
        console.error('There was an error fetching the gold prices!', error)
      }
    }

    fetchData()
  }, [inputValue])

  return (
    <div className='py-16'>
      <p className='text-xl'>
        Sprawdź cenę złota dla danego dnia, date podaj w formacie YYYY-MM-DD
      </p>
      <p className='text-sm'>
        Pamiętaj, ze API NBP ma dane od 2013-01-02 oraz nie pracuja w weekendy i
        święta
      </p>

      <div className='flex items-center gap-8'>
        <input
          class='my-4 w-[200px] px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-sm focus:outline-none focus:border-blue-500'
          type='text'
          value={inputValue}
          onChange={handleChange}
        />
        {data && data.cena && (
          <p>
            Cena z dnia {inputValue} to :{' '}
            <span className='text-blue-400 text-2xl'>{data.cena}</span>
          </p>
        )}
      </div>
    </div>
  )
}

export default SingleDayPrice
