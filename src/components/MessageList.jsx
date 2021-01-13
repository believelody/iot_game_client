import React from 'react';

export default ({ data }) => {
    const dataList = data && data.length > 0 ? data.map((d, i) => <li key={i}>{d.toString()}</li>) : <h3>Write a message</h3>
    
    return (
        <div>
            <h3>Messages</h3>
            <ul>
                {dataList}
            </ul>
        </div>
    )
}