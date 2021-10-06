import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './targetAudience.css';
import { getAuthAndData} from '../../../../api/ApiHelper';
import BasicTreeMap from '../../../common/map/treemap';
import createNotification from '../../../common/reactNotification';
import { 
    CUSTOMERS_BY_FILTERS,
    SOMETHING_WENT_WRONG 
} from '../../../../api/apiConstants';


export default function TargetAudience(props) {
    // console.log('***',props);
    var history = useHistory();
    const [customerSegments, setCustomerSegments] = useState();
    const [selectedSegment, setSelectedSegment] = useState(props.props?.targetAudience);

    const onSegmentSelection = (obj) => {
        setSelectedSegment(obj.data);
        props.setDefineSegment(obj.data);
    }
    
    const fetchCustomerSegments = () => {
        try {
            props.handleLoader(true);
            getAuthAndData(CUSTOMERS_BY_FILTERS, history)
                .then(res => {
                    if (handleResponseCode(res)) {
                        const data = {
                            "name": "Target Audience",
                            "color": "hsl(233, 70%, 50%)",
                            "children": []
                        }
                        res.data.map(c => {
                            c.percentage = (c.segment_customers_id == 6 ? 0.45 : c.segment_customers_id == 1 ? 0.25 : c.segment_customers_id == 2 ? 0.1 : c.segment_customers_id == 4 ? 0.07 : c.segment_customers_id == 5 ? 0.08 : 0.05)
                            data.children.push(c);
                        })
                        setCustomerSegments(data);
                    }
                    props.handleLoader(false);
                })
        } catch (error) {
            props.handleLoader(false);
            console.error(error)
        }
    }
    const handleResponseCode=(resp)=>{
        if(!resp || resp.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG+ 'in Target Audience');
            return false;
        }else{
            return true;
        }
    }

    useEffect(() => {
        fetchCustomerSegments();
    }, []);
    useEffect(() => {
        return () => {
            props.props.engagementsSmartActionHandler.dispatchTargetAudienceData(selectedSegment);
        }
    }, [selectedSegment]);

    return (
        <div id="target-audience-container" className="c-e-target-sec w-100 float-left clearfix">
            <div className="w-100 float-left clearfix c-e-target-h">Select Target Audience for the Engagement</div>
            <div className="c-e-target-content w-100 float-left clearfix">
                {customerSegments && <BasicTreeMap data={customerSegments} onSegmentSelection={obj => onSegmentSelection(obj)} />}
                <div className="w-100 float-left clearfix pl-2 pt-1" style={{fontSize:'12px'}}>
                    Selected Customer Segment : <b>{selectedSegment?.segment_name || 'No Segment selected'}</b>
                </div>

                {/* <div className="w-85 float-left clearfix c-e-target-left-box-con">
                    <div className="w-100 float-left clearfix">
                        <div className="w-60 float-left clearfix c-e-t-box c-e-target-g-box" onClick={() => taBoxSelect('All')}>
                            <div className="w-100 float-left clearfix c-r-t-box-n">All Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className="c-r-t-box-c float-left">5345</div>
                                <div className="c-r-t-box-per float-left">28%</div>
                                {selectedTABox && selectedTABox === 'All' ? (
                                    <div className="c-r-t-box-select float-right c-center mr-2">Selected</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-40 float-left clearfix c-e-t-box c-e-target-b-box" onClick={() => taBoxSelect('New')}>
                            <div className="w-100 float-left clearfix c-r-t-box-n">New Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className="c-r-t-box-c float-left">5345</div>
                                <div className="c-r-t-box-per float-left">28%</div>
                                {selectedTABox && selectedTABox === 'New' ? (
                                    <div className="c-r-t-box-select float-right c-center mr-2">Selected</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="w-100 float-left clearfix">
                        <div className="w-45 float-left clearfix c-e-t-box c-e-target-pur-box" onClick={() => taBoxSelect('Inactive')}>
                            <div className="w-100 float-left clearfix c-r-t-box-n" style={{ fontSize: "18px" }}>Inactive Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className="c-r-t-box-c float-left" style={{ fontSize: "28px" }}>4231</div>
                                <div className="c-r-t-box-per float-left">15%</div>
                                {selectedTABox && selectedTABox === 'Inactive' ? (
                                    <div className="c-r-t-box-select float-right c-center mr-2">Selected</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-30 float-left clearfix c-e-t-box c-e-target-l-pur-box" onClick={() => taBoxSelect('HVC1')}>
                            <div className="w-100 float-left clearfix c-r-t-box-n" style={{ fontSize: "16px" }}>High Volume Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className="c-r-t-box-c float-left" style={{ fontSize: "26px" }}>3122</div>
                                <div className="c-r-t-box-per float-left">15%</div>
                                {selectedTABox && selectedTABox === 'HVC1' ? (
                                    <div className="c-r-t-box-select float-right c-center mr-2">Selected</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-25 float-left clearfix c-e-t-box c-e-target-dp-box" onClick={() => taBoxSelect('HVC2')}>
                            <div className="w-100 float-left clearfix c-r-t-box-n" style={{ fontSize: "16px" }}>High Volume Customers</div>
                            <div className="w-100 float-left clearfix">
                                <div className="c-r-t-box-c float-left" style={{ fontSize: "26px" }}>3122</div>
                                <div className="c-r-t-box-per float-left">15%</div>
                                {selectedTABox && selectedTABox === 'HVC2' ? (
                                    <div className="c-r-t-box-select float-right c-center mr-2">Selected</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-15 float-left clearfix c-e-target-p-box" style={{ paddingTop: "80px" }} onClick={() => taBoxSelect('HVC3')}>
                    <div className="w-100 float-left clearfix" style={{ marginBottom: "10px" }}>
                        <div className="c-r-t-box-c float-left" style={{ fontSize: "26px" }}>3122</div>
                        <div className="c-r-t-box-per float-left">15%</div>
                    </div>
                    <div className="w-100 float-left clearfix c-r-t-box-n" style={{ fontSize: "16px", marginBottom: "30px" }}>High Volume Customers</div>
                    {selectedTABox && selectedTABox === 'HVC3' ? (
                        <div className="c-r-t-box-select float-left c-center mr-2">Selected</div>
                    ) : null}
                </div> */}
            </div>
        </div>
    )
}
