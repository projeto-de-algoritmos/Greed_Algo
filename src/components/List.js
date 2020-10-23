import React from 'react';

function List({ items, title, altText, id, onDrop, onDragStart, containerColor }) {

  const onDragOver = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <h3 style={{ margin: 10 }}>{title}</h3>
      <div onDragOver={(e) => onDragOver(e)} onDrop={(e) => onDrop(e)} style={{ padding: 20, overflowY: 'scroll', width: "45vw", height: "30vh", borderColor: '#F2F2F2', borderWidth: 5, borderStyle: "solid" }}>
        {items.length > 0 ?
          items.map((item, index) => (
            <div key={index} draggable onDragStart={(e) => onDragStart(e, item.id, id)} style={{ backgroundColor: containerColor || '#FA8072', flexDirection: 'row', display: 'flex', marginTop: 10, marginBottom: 10, padding: 20, width: "90%", overflow: 'hidden' }}>
              <div style={{ marginLeft: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', width: '80%' }}>
                <div style={{ marginBottom: 5 }}>{item.description}</div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', width: '70%' }}>
                  <div>{item.initialMoment}</div>
                  <div style={{ marginLeft: 20, marginRight: 20 }}>-</div>
                  <div>{item.finalMoment}</div>
                </div>
              </div>
            </div>
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