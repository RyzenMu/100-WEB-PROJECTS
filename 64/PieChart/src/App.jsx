import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts'

export default function App(){
  return (
    <div style={{width:'100%', height:'100vh'}}>
      <h1>Activity Breakdown</h1>
      <PieChartComponent />
    </div>
  )
}

// sample data
const startDataLight = [
  {duration:"work", value: 5, color: "#8884d8"},
  {duration:"Exercise", value: 2, color: "#82ca9d"},
  {duration:"Sleep", value: 7, color: "#ffc658"},
  {duration:"Leisure", value: 3, color: "#ff8042"},
];

const PieChartComponent = () => {
  return (
    <ResponsiveContainer width='100%' height={400}>
      <PieChart>
        <Pie
          data={startDataLight}
          nameKey='duration'
          dataKey='value'
          innerRadius={80}
          outerRadius={120}
          cx='40%'
          cy='50%'
          paddingAngle={3}>
            {startDataLight.map((entry)=> (
              <Cell 
                key={entry.duration}
                fill={entry.color}
                stroke={entry.color}
              />  
            ))}
        </Pie>
        <Tooltip />
        <Legend 
          verticalAlign='middle'
          align='right'
          layout='vertical'
          iconSize={15}
          iconType='circle'
        />  
      </PieChart>
    </ResponsiveContainer>
  )
}