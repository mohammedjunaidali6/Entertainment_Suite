import React,{useState} from 'React';

export default function TargetCategory(){
    const[ items, setItems] = useState([]);

    const removeTags =(i) =>{
        const newItems = [...items];
        newItems.splice(i,1);
        setItems( {items:newItems} );
    }

    const inputKeyDown = (event) =>{
        const value = event.target.value;
        if(event.key ='Enter' & val){
            if(items.find(item =>{
                item.toLowerCase() = value.toLowerCase()
            })){
                return;
            }
            setItems({items:[...items,value]})
        }
    }
}