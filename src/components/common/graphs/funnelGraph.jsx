import React from 'react';
import { ResponsiveFunnel } from '@nivo/funnel'

export default function FunnelGraph({ data }) {

  var customizedData = [{
    id: 1,
    label: 'Customers Engaged',
    value: data?.EngagedCustomersTotal || 0,
  },
  {
    id: 2,
    label: 'Customers Awarded',
    value: data?.WinnersTotal || 0,
  },
  {
    id: 3,
    label: 'Coupons Converted',
    value: data?.CouponsRedeemedTotal || 0,
  }]

  return (
    <div className="App" style={{ height: '280px', width: '100%' }}>
      <ResponsiveFunnel
        data={customizedData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        valueFormat=">-.3s"
        colors={{ scheme: 'nivo' }}
        borderWidth={20}
        labelColor={{ from: 'color', modifiers: [['darker', 30]] }}
        enableAfterSeparators={false}
        enableBeforeSeparators={false}
        currentBorderWidth={40}
        motionConfig="wobbly"
        isInteractive={false}
      />
    </div>
  )
}

const data = [
  {
    "id": "step_viewed",
    "value": 43665,
    "label": "Viewed"
  },
  {
    "id": "step_add_to_card",
    "value": 35737,
    "label": "Add To Card"
  },
  {
    "id": "step_purchased",
    "value": 26996,
    "label": "Purchased"
  }
]
