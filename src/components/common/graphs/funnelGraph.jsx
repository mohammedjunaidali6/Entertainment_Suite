import React from 'react';
import { ResponsiveFunnel } from '@nivo/funnel'

export default function FunnelGraph({ data }) {
  console.log('**', data);

  var customizedData = [{
    id: 1,
    label: 'Customers Engaged',
    value: data?.EngagedCustomersTotal || 0,
  },
  {
    id: 2,
    label: 'Coupons Redeemed',
    value: data?.CouponsRedeemedTotal || 0,
  },
  {
    id: 3,
    label: 'Customers Awarded',
    value: data?.WinnersTotal || 0,
  }]

  return (
    <div className="App" style={{ height: '280px', width: '100%' }}>
      <ResponsiveFunnel
        data={customizedData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        valueFormat=">-.5s"
        colors={{ scheme: 'spectral' }}
        borderWidth={20}
        labelColor={{ from: 'color', modifiers: [['darker', 3]] }}
        beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
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
