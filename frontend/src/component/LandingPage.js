import React from 'react'
import Table from './dataTable/Table'
import Statistics from './Statistics'

const LandingPage = () => {
  return (
    <div className='m-10 space-y-5 justify-center items-center'>
        <h1 className='text-2xl justify-center items-center flex text-primary font-bold pt-5'>Transaction Dashboard</h1>
        <div className='m-10'>
          <Table/>
        </div>
        <div className='m-10'>
          <Statistics/>
        </div>
    </div>
  )
}

export default LandingPage