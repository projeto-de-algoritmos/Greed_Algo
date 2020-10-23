import React from 'react';
import ListItem from './ListItem';

function List({ items, title, altText, id, onDrop, onDragStart, containerColor, close, deleteItem }) {

  const onDragOver = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <h3 style={styles.title}>{title}</h3>
      <div
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e)}
        style={styles.listContainer}>
        {items.length > 0 ?
          items.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} id={id} onDragStart={onDragStart} containerColor={containerColor} close={close} deleteItem={deleteItem} />
          ))
          :
          <div style={styles.altText}>
            <h2>{altText}</h2>
          </div>
        }
      </div>
    </div>
  );
}

const styles = {
  title: {
    margin: 10
  },
  listContainer: {
    padding: 20,
    overflowY: 'scroll',
    width: "45vw",
    height: "30vh",
    borderColor: '#F2F2F2',
    borderWidth: 5,
    borderStyle: "solid"
  },
  altText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: "100%",
    opacity: 0.2
  }
}

export default List;