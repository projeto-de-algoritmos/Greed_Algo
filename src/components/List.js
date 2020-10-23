import React from 'react';

function List({ items, title }) {
  return (
    <div>
      <h3 style={{ margin: 0 }}>{title}</h3>
      <div style={{ padding: 20, overflowY: 'scroll', width: "45vw", height: "30vh", borderColor: '#F2F2F2', borderWidth: 5, borderStyle: "solid" }}>
        {items.map((item, index) => (
          <div key={index} style={{ backgroundColor: '#6d8cee', flexDirection: 'row', display: 'flex', marginTop: 10, marginBottom: 10, padding: 20, width: "90%", overflow: 'hidden' }}>
            {/* <h3 style={{ alignSelf: 'center', marginRight: 20 }}>Tarefa numero {index + 1}</h3> */}
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
        }
      </div>
    </div>
  );
}

export default List;