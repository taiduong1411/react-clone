import React, { useEffect, useState } from 'react'
import { Space, Table, Button, Modal, Alert } from 'antd';
// Thư viện notify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ColumnsType } from 'antd/es/table';
import { IProduct } from '../../types/product';
import { Link } from 'react-router-dom'
import db from '../../../db/db.json';
import axios from 'axios';
interface DataType {
    key: string | number;
    id: number;
    name: string;
    price: number;
}
interface IProps {
    products: IProduct[],
    onRemove: (id: number) => void
}


const ProductManagementPage = (props: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [_id, setId] = useState();
    const showModal = (event: any) => {
        let data_id = event.currentTarget.dataset.tag;
        setId(data_id)
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);

        removeProduct(_id || '');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const removeProduct = (_id: string) => {
        axios.delete(`http://localhost:3000/products/${_id}`)
            .then(response => {
                // useEffect(() => {
                // }, []);
                toast.success('Xoá sản phẩm thành công !', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch(error => {
                toast.error('Có lỗi xảy ra !', {
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
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: 'red' }} onClick={showModal} data-tag={record.id}>Remove</Button>
                    <Button type="primary" ><Link to={`/admin/products/${record.id}/update`}>Update</Link></Button>
                    <Modal title="Xoá Sản Phẩm" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Bạn có muốn xoá sản phẩm ?</p>
                    </Modal>
                </Space>
            ),
        },
    ];
    const data: DataType[] = db.products.map((item: IProduct) => {
        return {
            key: item.id,
            ...item
        }
    })

    return (
        <div>
            <Button type='primary' style={{ marginTop: 20, marginBottom: 20 }} ><Link to={'/admin/products/add'}>Add New Product</Link></Button>
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
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </div>
    )
}

export default ProductManagementPage