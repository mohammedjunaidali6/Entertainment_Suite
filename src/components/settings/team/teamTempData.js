import ActionMenu from '../../common/reactTable/menu';
import user from '../../../assets/img/user.svg';

export const columns= [
    {
        name:"User Name",
        cell: row=><div>
            <img style={{height: '36px',
            width: '36px',
            marginRight: '10px',
            borderRadius: '10px',
            display:'inline-block'}}
             src={row.imgSrc} />
               <div className='disp-inline-block'>{row.userName}</div>
            </div>
    },
    {
        name:"Email",
        selector: "email"
    },
    {
        name:"Role",
        selector: "role"
    },
    {
        name:"Status",
        selector: "status"
    },
    {
        name:"Actions",
        cell: row =><ActionMenu />
    }
]

export const data= [
    {
        userName:"Richard Wills",
        imgSrc: user,
        email:"name@gmail.com",
        role: "Owner",
        status: "Active",
    },
    {
        userName:"Anna Marie",
        imgSrc: user,
        email:"name@gmail.com",
        role: "Owner",
        status: "Active",
    },
    {
        userName:"Rayan Mathew",
        imgSrc: user,
        email:"name@gmail.com",
        role: "Owner",
        status: "Active",
    },
    {
        userName:"Rayan Mathew",
        imgSrc: user,
        email:"name@gmail.com",
        role: "Owner",
        status: "Inactive",
    },
    {
        userName:"Rayan Mathew",
        imgSrc: user,
        email:"name@gmail.com",
        role: "Owner",
        status: "Inctive",
    }
]