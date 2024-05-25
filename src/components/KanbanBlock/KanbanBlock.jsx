import React from 'react'

function KanbanBlock({status_items, setSelectedStatus, items}) {
  return (
    status_items?.map(status =>(
        <div key={status} className={`kanban__box ${status}`}>
            <div className="kanban__heading">
                <p>Done to start / 1</p>
            </div>
            <div className="kanban__block">{items(status)}</div>
            <button onClick={()=> setSelectedStatus(status)}>mn</button>
        </div>
    ))
  )
}

export default KanbanBlock
