import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { IProduct } from '../../types/product'
import { Button, Checkbox, Form, Input } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import db from '../../../db/db.json';
interface IProps {
    onAdd: (product: IProduct) => void
}
// interface IFormInput {
//     id: number,
//     name: string,
//     price: number
// }
const AddProductPage = (props: IProps) => {
    /*
        {
            onAdd: () => void
        }
    */
    // const { register, handleSubmit } = useForm<IProduct>()
    // const onHandleSubmit: SubmitHandler<IFormInput> = (data: IProduct) => {
    //     props.onAdd(data);
    // }

    const navigate = useNavigate()
    // const [error, setError] = useState('')
    const onFinish = async (values: any) => {
        const data = {
            id: +(values.product_id),
            name: values.name,
            price: +(values.price)
        };
        axios({
            method: 'post',
            url: 'http://localhost:3000/products',
            data: data
        }).then(function (response) {
            navigate('/admin/products')
        }).catch(function (error) {
            toast.error('Có lỗi xảy ra! ID có thể đã tồn tại', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });

        // props.onAdd(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            {/* <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
                <input type="text" {...register("name")} />
                <input type="number" {...register("price")} />
                <button type="submit">Add Product</button>
            </form> */}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, margin: 'auto', marginTop: 100 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Product ID"
                    name="product_id"
                    rules={[{ required: true, message: 'Please input your product id!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your product name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your product price!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddProductPage