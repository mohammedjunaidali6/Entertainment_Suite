import React, { useState, Fragment, useEffect } from 'react';
import { BUDGET_MIN, BUDGET_DEFAULT, BUDGET_MAX, BUDGET_DURATION_DEFAULT, BUDGET_DURATION_MIN, BUDGET_DURATION_MAX } from "../../../../constants/globalConstants";
import Table from "../../../common/reactTable/table";
import ActionMenu from "../../../common/reactTable/menu";
import plus_src from "../../../../assets/img/add_gray.svg";
import Resizer from "../../../common/resizer/resizer";
import './rewardsAndBudget.css';
import { getData, postData } from '../../../../api/ApiHelper';
import Loader from '../../../common/Spinner/spinner';


export const rbColumns = [
    {
        name: "Winner Position",
        selector: "winnerPosition"
    },
    {
        name: "Reward Type",
        selector: "rewardType"
    },
    {
        name: "Reward Value",
        selector: "rewardValue"
    },
    // {
    //     name: "Product Category",
    //     selector: "productCategory"
    // },
    {
        name: "Probability",
        selector: "probability"
    },
    {
        name: "Display Name",
        selector: "displayName"
    },
    {
        name: "Action",
        cell: action => <ActionMenu />
    }
];

export const rbData = [
    {
        id: 1,
        winnerPosition: "First Prize",
        rewardType: "Point Coupons",
        rewardValue: 500,
        productCategory: "Category",
        probability: "20%",
        displayName: "Get 500 Points"
    },
    {
        id: 2,
        winnerPosition: "Second Prize",
        rewardType: "Point Coupons",
        rewardValue: 300,
        productCategory: "Category",
        probability: "20%",
        displayName: "Get 300 Points"
    },
    {
        id: 3,
        winnerPosition: "Third Prize",
        rewardType: "Coupons",
        rewardValue: 200,
        productCategory: "Category",
        probability: "20%",
        displayName: "Get 200 Points"
    },
    {
        id: 4,
        winnerPosition: "Fourth Prize",
        rewardType: "Coupons",
        rewardValue: 100,
        productCategory: "Category",
        probability: "20%",
        displayName: "Get 100 Points"
    }
];

export default function RewardsAndBudget(props) {
    const rewardsAndBudgetData = props.props.rewardsAndBudget;
    const [addReward, setAddReward] = useState(false);
    const [rewardsData, setRewardsData] = useState(rewardsAndBudgetData?.rewards);
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState(rewardsAndBudgetData?.budget);
    const [budgetDuration, setBudgetDuration] = useState(rewardsAndBudgetData?.budgetDuration);


    const fetchRewards = () => {
        setLoading(true);
        getData(`/engt/rewardbyfilters`)
            .then(response => {
                if (response && Array.isArray(response.data?.data)) {
                    let rewardArr = [];
                    response.data.data.forEach(rew => {
                        let rewardObj = {}
                        rewardObj.id = rew.reward_master_id;
                        rewardObj.winnerPosition = rew.win_position;
                        rewardObj.rewardType = rew.reward_type;
                        rewardObj.rewardValue = rew.Value;
                        rewardObj.probability = rew.probability;
                        rewardObj.displayName = rew.display_name;
                        rewardArr.push(rewardObj);
                    });
                    setRewardsData(rewardArr);
                } else {
                    setRewardsData();
                }
                setLoading(false);
            })
    }


    useEffect(() => {
        if (!Array.isArray(rewardsAndBudgetData?.rewards)) {
            fetchRewards();
        }
    }, []);
    useEffect(() => {

        return () => {
            let rewardsAndBudget = {
                rewards: [...rewardsData],
                budget: budget,
                budgetDuration: budgetDuration
            }
            props.props.engagementsSmartActionHandler.dispatchRewardsAndBudgetData(rewardsAndBudget)
        }
    }, [budget, budgetDuration, rewardsData])

    return (
        <Fragment>
            {loading ?
                <Loader />
                :
                <>
                    <div id="rewards-budget-container" >
                        <div className="r-b-h">Rewards and Budget</div>
                        <Fragment>
                            <div className="r-b-table-sec">
                                <Table columns={rbColumns} data={rewardsData} noTableHead={false} />
                            </div>
                            {!addReward ? (
                                <div>
                                    <div className="r-b-add-reward" onClick={() => setAddReward(true)}>
                                        <img src={plus_src} alt="Plus" className="r-b-add-reward-img" />
                                        <span className="r-b-add-reward-text">Add Reward</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="add-reward-sec w-100 float-left clearfix">
                                    <div className="r-b-addreward-h w-100 float-left clearfix">Add new reward</div>
                                    <div className="r-b-addreward-top w-100 float-left clearfix">
                                        <div className="w-33 float-left clearfix">
                                            <div className="w-100 float-left clearfix">
                                                <div className="w-100 float-left clearfix r-b-ar-i-h">Winner Position</div>
                                                <div className="w-97 float-left clearfix">
                                                    <input type="text" placeholder="Winner position" className=" r-b-ar-i" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-33 float-left clearfix">
                                            <div className="w-100 float-left clearfix">
                                                <div className="w-100 float-left clearfix r-b-ar-i-h">Reward Type</div>
                                                <div className="w-97 float-left clearfix">
                                                    <input type="text" placeholder="Reward Type" className=" r-b-ar-i" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-33 float-left clearfix">
                                            <div className="w-100 float-left clearfix">
                                                <div className="w-100 float-left clearfix r-b-ar-i-h">Number of Awards</div>
                                                <div className="w-97 float-left clearfix">
                                                    <input type="text" placeholder="Number of Awards" className=" r-b-ar-i" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="r-b-addreward-bottom w-100 float-left clearfix">
                                        <div className="w-33 float-left clearfix">
                                            <div className="w-100 float-left clearfix">
                                                <div className="w-100 float-left clearfix r-b-ar-i-h">Probability</div>
                                                <div className="w-97 float-left clearfix">
                                                    <input type="text" placeholder="Probability" className=" r-b-ar-i" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-33 float-left clearfix">
                                            <div className="w-100 float-left clearfix">
                                                <div className="w-100 float-left clearfix r-b-ar-i-h">Coupon Code</div>
                                                <div className="w-97 float-left clearfix">
                                                    <input type="text" placeholder="Coupon Code" className="r-b-ar-i" />
                                                </div>
                                                <div className="w-100 float-left clearfix r-b-ar-link">Mannage Coupon</div>
                                            </div>
                                        </div>
                                        <div className="w-33 float-left clearfix">
                                            <div className="w-100 float-left clearfix">
                                                <div className="w-100 float-left clearfix r-b-ar-i-h">Display Name</div>
                                                <div className="w-97 float-left clearfix">
                                                    <input type="text" placeholder="Display Name" className=" r-b-ar-i" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="r-b-addreward-btns w-100 float-left text-right clearfix">
                                        <div className="r-b-addreward-s float-right clearfix" onClick={() => setAddReward(false)}>Add</div>
                                        <div className="r-b-addreward-c float-right clearfix" onClick={() => setAddReward(false)}>Cancel</div>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    </div>
                    <div className="b-d-sec w-100 float-left clearfix">
                        <div className="w-45 float-left clearfix">
                            <div className="b-d-h w-100 float-left clearfix">Budget</div>
                            <div className="b-d-content w-100 float-left clearfix">
                                <div className="b-d-content-h w-100 float-left clearfix">Daily Budget</div>
                                <div className="w-100 float-left clearfix">
                                    <Resizer
                                        minSize={BUDGET_MIN}
                                        maxSize={BUDGET_MAX}
                                        initialSize={rewardsAndBudgetData?.budget ?? BUDGET_DEFAULT}
                                        id='budgetResizer'
                                        valText=''
                                        updateBudget={budget => setBudget(budget)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-10 float-left clearfix"></div>
                        <div className="w-45 float-right clearfix">
                            <div className="b-d-h">Duration</div>
                            <div className="b-d-content">
                                <div className="b-d-content-h">Number of Days</div>
                                <div className="w-100 float-left clearfix">
                                    <Resizer
                                        minSize={BUDGET_DURATION_MIN}
                                        maxSize={BUDGET_DURATION_MAX}
                                        initialSize={rewardsAndBudgetData?.budgetDuration ?? BUDGET_DURATION_DEFAULT}
                                        id='daysResizer'
                                        valText='Days'
                                        updateBudgetDuration={duration => setBudgetDuration(duration)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </Fragment>
    )
}