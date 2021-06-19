import React, { useEffect, useState } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap'



export default function BasicTreeMap(props) {


    const onNodeClick = (segment, event) => {
        var childs = event.target.parentNode.parentNode.children;
        for (var node of childs) {
            node.children[0].style.fillOpacity = '0.33';
            node.children[0].style.strokeWidth = '1';
            node.children[0].style.stroke = ''
        }
        event.target.style.fillOpacity = '10'
        event.target.style.strokeWidth = '3'
        event.target.style.stroke = 'royalblue'

        props.onSegmentSelection(segment);
    }

    return (
        <div className="App" style={{ height: '280px', width: '100%' }}>
            <ResponsiveTreeMap
                data={props.data}
                identity="name"
                value="percentage"
                valueFormat=" ^0.0%"
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                label={(e) => e.data.name + " (" + e.data.percentage * 100 + "%)"}
                labelSkipSize={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
                enableParentLabel={false}
                parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                colors={['#e1f0a1', '#f0c4a1', '#d7f0a1', '#a1f0cc', '#e2c5f0', '#f0c5e2', '#f0c5c8', '#e0d5eb', '#d2f7c8']}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                onClick={(n, e) => onNodeClick(n, e)}
            />
        </div>
    )
}