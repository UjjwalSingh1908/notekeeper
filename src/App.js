
import './App.css';
import { useState, useEffect } from 'react';
import { Pagination ,  Button} from 'antd';
import NoteCard from './components/NoteCard';
import { PlusOutlined } from '@ant-design/icons'
import AddNote from './components/AddNote';
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from './Firebase'


const numEachPage = 6;

function App() {

  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(6);

  useEffect(() => {
    const q = query(collection(db, 'notes'), orderBy('pinned', 'desc') , orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setNotes(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
      console.log(notes)
    })
  },[])

  const handleChange = value => {
   setMinVal((value - 1) * numEachPage);
    setMaxVal(value * numEachPage);
    
  };

  return (
    <div className='bg' >
      <div className='nav' >Note Keeper</div>
      <AddNote open ={open} handleCancel={()=> setOpen(false)} />
      <Button type="primary" shape="round" icon={<PlusOutlined />} className="add-btn" onClick={()=>setOpen(true)} >
            Add Note
          </Button>
          <div className='container' >
    
        {notes &&
          notes.length > 0 &&
          notes.slice(minVal, maxVal).map((note)=> {
            return(
              <NoteCard key={note.id} id={note.id} title={note.data.title} body={note.data.body} pinned = {note.data.pinned} />
      
            )
          })
        }
      </div>
      { notes.length>0 ?
      <Pagination
          defaultCurrent={1}
          defaultPageSize={6} 
          onChange={handleChange}
          total={notes.length}
        /> : null }
    </div>
  );
}

export default App;
