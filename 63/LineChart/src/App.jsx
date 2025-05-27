import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const fakeData = [
  {date: "Jan", totalSales:2400},
  {date: "Feb", totalSales:1398},
  {date: "Mar", totalSales:9800},
  {date: "Apr", totalSales:3908},
  {date: "May", totalSales:4800},
  {date: "Jun", totalSales:3800},
  {date: "Jul", totalSales:4300},
]
export default function App(){
  return (
    <div className='p-4 bg-white rounded shadow-md max-w3xl mx-auto'>
      <h2 className='text-xl font-semibold mb-4 text-center text-blue-700'>
        // ResponsiveConatiner
        <ResponsiveContainer height={300} width="100%">
          // Area chart with data 
          <AreaChart data={fakeData} height={300} width={700}>
            // X axis
            <XAxis dataKey='date'/>
            // Y axis
            <YAxis unit='$' />
            // Tooltip
            <Tooltip />
            // cartesianGrid
            {/* <cartesianGrid strokeDasharray='4' /> */}
            // Area Line
            <Area type="monotone" dataKey='totalSales' stroke='red' fill='orange'/>
          </AreaChart>
        </ResponsiveContainer>
      </h2>
    </div>
  )
}