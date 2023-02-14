
import React from 'react'
import { Modal, Button, Input, Form } from 'antd';
import {db} from '../Firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
const { TextArea } = Input;


const AddNote = (props) => {
  const [form] = Form.useForm();

  const handleSubmit = async ({title,body}) => {
    
    try {
      await addDoc(collection(db, 'notes'), {
        title: title,
        body: body,
        pinned: false,
        created: Timestamp.now()
      })
      form.resetFields();
      props.handleCancel()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal  open={props.open}    footer={null}  onCancel={() => { form.resetFields();
 props.handleCancel()}}>
        <h2 style={{textAlign: "center"}} >Make a note</h2>
    <Form
    form={form}
    name="basic"
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    onFinish={handleSubmit}
    initialValues={{ remember: true }}
    autoComplete="off"
  >

<Form.Item
      label="Title"
      name="title"
    >
      <Input placeholder='Add a title' />
    </Form.Item>
    <Form.Item
    label="Text"
    name="body"
    rules={[{ required: true, message: 'Please type something!' }]}
    >
    <TextArea rows={4} placeholder="Please type your note here" />
    </Form.Item>
    <Form.Item wrapperCol={{
        offset: 4,
        span: 16,
      }}>
      <Button style={{ width: '100%' }} type="primary" htmlType="submit">
        Add Note
      </Button>
</Form.Item>
  </Form>
  </Modal>
  )
}

export default AddNote