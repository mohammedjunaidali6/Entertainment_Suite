import ActionMenu from "../../common/reactTable/menu";
import CustomTooltip from "../../common/tooltip/tooltip"


const targetCategoryStyle= {
    boxSizing: 'border-box',
    height: '25px',
    width: '48px',
    border: '1px solid #E0E7EB',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    textAlign:'center',
    float: 'left',
    fontSize:'10px'
}

export const columns =[
    {
        name:"ID",
        width:'5%',
        selector:"RewardMasterId"
    },
    {
        name:"Coupon Name ",
        width:'20%',
        selector:"RewardName"
    },
    {
        name:"Coupon Code ",
        width:'15%',
        selector:"RewardCode"
    },
    {
        name:"Category ",
        width: '20%',
        cell:row =>
            <div>
                <div style={targetCategoryStyle} className='clearfix c-center mr-1'>{row.Categories.length>0&&row.Categories[0].CategoryName}</div>
                <div style={targetCategoryStyle} className='clearfix c-center mr-1'>{row.Categories.length>1&&row.Categories[1].CategoryName}</div>
                {row.Categories && row.Categories.length > 2 &&
                    <CustomTooltip tooltipText={row.Categories[2].CategoryName+" , "+ row.Categories.length>3&&row.Categories[3].CategoryName+" , "+ row.Categories.length>4&&row.Categories[4].CategoryName}>
                        <div className='clearfix c-center' style={targetCategoryStyle}>{row.Categories.length - 2}+</div>
                    </CustomTooltip>
                }
            </div>
    },
    {
        name:"Usage",
        width:'10%',
        selector:"PerPersonUsage"
    },
    {
        name:"Amount",
        width:'10%',
        selector:"DiscountValue"
    },
    {
        name:"Expiring On",
        width:'15%',
        selector:"expiryDate"
    },
    {
        name:" ",
        width:'5%',
        cell: row=> <ActionMenu />
    }
]