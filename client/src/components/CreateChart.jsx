import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import HighLowAvg from './HighLowAvg'
import ExportButton from './ExportButton'

const GoldPricesChart = ({ dataForChart }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current && dataForChart.length > 0) {
      const ctx = chartRef.current.getContext('2d')

      // Destroy existing chart instance if exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const labels = dataForChart.map((data) => data.data)
      const prices = dataForChart.map((data) => data.cena)

      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Cena',
            data: prices,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      }

      const options = {
        scales: {
          x: {
            type: 'category',
            ticks: {
              callback: function (value, index, values) {
                // Show only the year on the x-axis
                return labels[index].split('-')[0]
              },
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.dataset.label || ''
                const date = context.label // Full date for tooltip
                const value = context.raw
                return `${label}: ${value} (${date})`
              },
            },
          },
        },
      }

      // Create new chart instance
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
      })
    }
  }, [dataForChart])

  const downloadChart = () => {
    const link = document.createElement('a')
    link.download = 'chart.png'
    link.href = chartInstance.current.toBase64Image()
    link.click()
  }

  return (
    <div className='w-[90vw] px-8'>
      <div>
        <HighLowAvg data={dataForChart} />
      </div>

      {dataForChart.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <canvas ref={chartRef} />
      )}
      <div>
        <button onClick={downloadChart}>Download chart image</button>
        <ExportButton data={dataForChart} />
      </div>
    </div>
  )
}

export default GoldPricesChart
