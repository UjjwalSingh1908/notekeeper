import React from 'react'
import { Card, Space } from 'antd';
import {PushpinOutlined, PushpinFilled, DeleteFilled} from '@ant-design/icons'
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from '../Firebase'

const NoteCard = (props) => {

  const handlePin = async () => {

    const taskDocRef = doc(db, 'notes', props.id)
    try{
      await updateDoc(taskDocRef, {
        pinned: !props.pinned
      })
    } catch (err) {
      alert(err)
    }    
  }

  const handleDelete = async () => {
    const taskDocRef = doc(db, 'notes', props.id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Card title={props.title} extra={
      
        <Space>
 { props.pinned ? (<PushpinFilled style={{ cursor: "pointer" }}  onClick={handlePin} />) : (<PushpinOutlined style={{ cursor: "pointer" }}  onClick={handlePin}  />) }
<DeleteFilled style={{ cursor: "pointer" }}  onClick={handleDelete} />
        </Space>
      
        
    
    }
    bordered={false}
     style={{ width: 300, margin:"1rem" }}>
      <p>{props.body}</p>
    </Card>
  )
}

export default NoteCard