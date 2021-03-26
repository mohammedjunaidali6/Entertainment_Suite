import ActionMenu from "../../common/reactTable/menu"

export const columns =[
    {
        name:"ID",
        selector:"id"
    },
    {
        name:"Coupon Name ",
        selector:"couponName"
    },
    {
        name:"Coupon Code ",
        selector:"couponCode"
    },
    {
        name:"Category ",
        cell:row =>
            <div style={{
                boxSizing: 'border-box',
                height: '25px',
                width: '48px',
                border: '1px solid #E0E7EB',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
                textAlign:'center'
            }}>
                Shoes 
            </div>
        
    },
    {
        name:"Usage/Coustomer",
        selector:"usage"
    },
    {
        name:"Amount",
        selector:"amount"
    },
    {
        name:"Added On",
        selector:"addedOn"
    },
    {
        name:"Expiring On",
        selector:"expiringOn"
    },
    {
        name:" ",
        cell: row=> <ActionMenu />
    }
]
    
export const data =[
    {
        id:"677823790",
        couponName:"Point Coupons",
        couponCode:"NEWYEAR1000",
        category:" ",
        usage:"1",
        amount:"2000",
        addedOn:"05/02/21",
        expiringOn:"05/02/21",

    },
    {
        id:"377823790",
        couponName:"Point Coupons",
        couponCode:"NEWYEAR1000",
        category:" ",
        usage:"2",
        amount:"5000",
        addedOn:"05/02/21",
        expiringOn: "05/02/21",

    },
    {
        id:"377853790",
        couponName:"Coupons",
        couponCode:"NEWYEAR1000",
        category:" ",
        usage:"1",
        amount:"10000",
        addedOn:"05/02/21",
        expiringOn: "05/02/21",

    },
    {
        id:"345823790",
        couponName:"Coupons",
        couponCode:"NEWYEAR1000",
        category:" ",
        usage:"2",
        amount:"7500",
        addedOn:"05/02/21",
        expiringOn: "05/02/21",

    },
    {
        id:"434523790",
        couponName:"Point Coupons",
        couponCode:"NEWYEAR1000",
        category:" ",
        usage:"1",
        amount:"3000",
        addedOn:"05/02/21",
        expiringOn: "05/02/21",

    }
]