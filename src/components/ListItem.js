import React from 'react';
import CloseIcon from '@material-ui/icons/Close';


const ListItem = ({ item, index, id, onDragStart, containerColor, close, deleteItem }) => {
  return (
    <div
      key={index}
      draggable
      onDragStart={(e) => onDragStart(e, item.id, id)}
      style={{
        backgroundColor: containerColor || '#FA8072', flexDirection: 'row',
        display: 'flex',
        marginTop: 10,
        marginBottom: 10,
        padding: 20,
        width: "90%",
        overflow: 'hidden'
      }}
    >
      <div style={styles.description}>
        <div>
          <div>{item.description}</div>
          <div style={styles.time}>
            <div>{item.initialMoment}</div>
            <div style={styles.dash}>-</div>
            <div>{item.finalMoment}</div>
          </div>
        </div>
        {close ? <CloseIcon onClick={() => deleteItem(item.id)} /> : null}
      </div>
    </div>
  );
}

const styles = {
  container: {

  },
  description: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%"
  },
  time: {
    display: "flex"
  },
  dash: {
    marginLeft: 20,
    marginRight: 20
  }
}

export default ListItem;