import React from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';

export default function BarCanvasGraph({ data, keys }) {
  console.log('**', data);

  return (
    <div className="App" style={{ height: '280px', width: '100%' }}>
      {data &&
        <ResponsiveBarCanvas
          data={data}
          keys={keys}
          indexBy="date"
          margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
          pixelRatio={1}
          padding={0.5}
          innerPadding={0}
          minValue="auto"
          maxValue="auto"
          groupMode="stacked"
          layout="vertical"
          reverse={false}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          valueFormat={{ format: ' >-', enabled: false }}
          colors={{ scheme: 'spectral' }}
          colorBy="id"
          borderWidth={0}
          borderRadius={0}
          borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 36
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          enableGridX={false}
          enableGridY={true}
          enableLabel={true}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', '1']] }}
          isInteractive={true}
          legends={[]}
        />
      }
    </div>
  )
}

const data = [
  {
    "country": "AD",
    "hot dog": 158,
    "hot dogColor": "hsl(213, 70%, 50%)",
    "burger": 133,
    "burgerColor": "hsl(190, 70%, 50%)",
    "sandwich": 23,
    "sandwichColor": "hsl(248, 70%, 50%)",
  },
  {
    "country": "AE",
    "hot dog": 145,
    "hot dogColor": "hsl(293, 70%, 50%)",
    "burger": 50,
    "burgerColor": "hsl(169, 70%, 50%)",
    "sandwich": 130,
    "sandwichColor": "hsl(5, 70%, 50%)",
  },
  {
    "country": "AF",
    "hot dog": 56,
    "hot dogColor": "hsl(234, 70%, 50%)",
    "burger": 33,
    "burgerColor": "hsl(145, 70%, 50%)",
    "sandwich": 112,
    "sandwichColor": "hsl(30, 70%, 50%)",
  }]