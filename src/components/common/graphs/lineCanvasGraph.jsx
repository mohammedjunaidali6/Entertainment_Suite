import React from 'react';
import { ResponsiveLine } from '@nivo/line';

export default function LineCanvasGraph({ data, yName,pointsEnabled}) {
  console.log('**', pointsEnabled);

  return (
    <div className="App" style={{ height: '280px', width: '100%' }}>
      {
        data && data[0].data && data[0].data.length>0 &&
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 40, bottom: 40, left: 50 }}
          curve="monotoneX"
          colors={{ scheme: 'nivo' }}
          lineWidth={4}
          enablePoints={pointsEnabled}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={1}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableArea={true}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          axisLeft={{
            tickSize: 4,
            tickPadding: 2,
            tickRotation: 0,
            format: '.2s',
            legend: yName,
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          legends={[
            {
              anchor: 'top',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: -25,
              itemsSpacing: 25,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 12,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .01)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      }
    </div>
  )
}

const data = [
  {
    "id": "Sales",
    "color": "hsl(39, 40%, 70%)",
    "data": [
      {
        "x": 0,
        "y": 79
      },
      {
        "x": 1,
        "y": 162
      },
      {
        "x": 2,
        "y": 193
      },
      {
        "x": 3,
        "y": 176
      },
      {
        "x": 4,
        "y": 41
      },
      {
        "x": 5,
        "y": 134
      },
      {
        "x": 6,
        "y": 83
      },
    ]
  },
]