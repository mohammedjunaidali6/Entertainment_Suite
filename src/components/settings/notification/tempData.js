import ActionMenu from "../../common/reactTable/menu";

export const column =[
    {
        name:"Role",
        selector:"role"
    },
    {
        name:"Permissions",
        cell: row =><div>
            <div className='disp-inline'>{row.permissions}</div>
            <div className='disp-inline' style={{
                height: '15px',
                width: '36px',
                marginLeft: '10px',
                borderRadius: '4px',
                backgroundColor: '#DBDDDE'
              }}>View</div>
            
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