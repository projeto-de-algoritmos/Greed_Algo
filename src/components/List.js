import React from 'react';
import ListItem from './ListItem';

function List({ items, title, altText, id, onDrop, onDragStart, containerColor, close, deleteItem }) {

  const onDragOver = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <h3 style={{ margin: 10 }}>{title}</h3>
      <div onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e)} style={{ padding: 20, overflowY: 'scroll', width: "45vw", height: "30vh", borderColor: '#F2F2F2', borderWidth: 5, borderStyle: "solid" }}>
        {items.length > 0 ?
          items.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} id={id} onDragStart={onDragStart} containerColor={containerColor} close={close} deleteItem={deleteItem} />
          ))
          :
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%", height: "100%" }}>
            <h2 style={{ opacity: 0.2 }}>{altText}</h2>
          </div>
        }
      </div>
    </div>
  );
}

export default List;