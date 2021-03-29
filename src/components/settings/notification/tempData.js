import ActionMenu from "../../common/reactTable/menu";

const tableRowBtnText={
    height: '13px',
  width: '22px',
  color: '#6A6976',
  fontFamily: 'Roboto',
  fontSize: '10px',
  letterSpacing: '0',
  lineHeight: '13px'
}

export const column =[
    {
        name:"Role",
        selector:"role"
    },
    {
        name:"Permissions",
        cell: row =><div>
            <div className='disp-inline'>{row.permissions}</div>
            <button className='disp-inline table-row-btn' style={{ marginLeft: '10px'}}> 
               <div className='table-row-btn-text'>View</div> 
            </button>
        </div>
        
    },
    {
        name: "Actions",
        cell: row =><ActionMenu />
    }
]

export const data =[
    {
        role:"Owner",
        permissions: "All"
    },
    {
        role:"Admin",
        permissions: "5 permissions"
    },
    {
        role:"Revenue Manager",
        permissions: "5 permissions"
    },
    {
        role:"Marketing Manager",
        permissions: "3 permissions"
    },
    {
        role:"Ad Manager",
        permissions: "3 permissions"
    },
    {
        role:"Campaign Manager",
        permissions: "3 permissions"
    }
]