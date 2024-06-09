import GoldPricesChart from './components/GoldPricesChart'
import SIngleDayPrice from './components/SIngleDayPrice'

function App() {
  const testData = [
    {
      _id: '665c774c8fe149243bcac21f',
      data: '2013-01-02',
      cena: 167.98,
    },
    {
      _id: '665c774c8fe149243bcac219',
      data: '2013-01-02',
      cena: 165.83,
    },
    {
      _id: '665c774c8fe149243bcac21a',
      data: '2013-01-03',
      cena: 166.97,
    },
  ]
  return (
    <div className='mx-4'>
      <GoldPricesChart />
      <SIngleDayPrice />
      {/* <CreateChart dataForChart={testData} /> */}
    </div>
  )
}

export default App
