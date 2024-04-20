import React from 'react'
import './Stats_Table.css';

function Stats_Table() {
  return (
    <div className='TableContainer'>
      <h1 className='TableHeader'>Statistics</h1>
      <table className='StatsTable'>
        <thead>
          <tr className='cl2'>
            <th className='StatsRow'>Application Type</th>
            <th className='StatsRow'>New</th>
            <th className='StatsRow'>Seen</th>
            <th className='StatsRow'>Pending</th>
            <th className='StatsRow'>Cleared</th>
          </tr>
        </thead>
        <tbody>
          <tr className='cl1'>
            <td className='StatsRow'><b>Residential Conversion</b></td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
          </tr>

          <tr className='cl2'>
            <td className='StatsRow'><b>Residential Construction</b></td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
          </tr>

          <tr className='cl1'>
            <td className='StatsRow'><b>Commercial Conversion</b></td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
          </tr>

          <tr className='cl2'>
            <td className='StatsRow'><b>Commercial Construction</b></td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
            <td className='StatsRow'>0</td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default Stats_Table
