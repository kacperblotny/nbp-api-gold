import React from 'react'

function ExportButton({ data }) {
  const exportToJson = (e) => {
    e.preventDefault()

    const fileData = JSON.stringify(data, null, 2)
    const blob = new Blob([fileData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'gold_data.json'

    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
  }

  return (
    <button onClick={exportToJson} className='m-4'>
      Export this data to JSON
    </button>
  )
}
export default ExportButton
