import React, { useEffect,useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions'
import UpdatePost from './UpdatePost'
import { apiDeletePost } from '../../services'
import { ToastContainer, toast } from 'react-toastify';
import checkExpiration from '../../ultis/Common/checkExpiration'
const ManagePost = () => {
    const dispatch = useDispatch()
    const [isEdit,setIsEdit] = useState(false)
    const [isShowTitle,setIsShowTitle] = useState(false)
    const { postOfcurrent, postOffilter } = useSelector(state => state.post)
    useEffect(() => {
        dispatch(actions.getPostsLimitAdmin())
    },[])

    const handleDeletePost = async (item) => {
        try {
            const data = {
                imagesId : item.imagesId,
                overviewId: item.overviewId,
                attributesId: item.attributesId,
                postId: item.id
            }
            const response = await apiDeletePost(data)
            if(response.status === 200) {
                notifyDeleteSuccess()
                dispatch(actions.getPostsLimitAdmin())
            }
        } catch (error) {
            notifyDeleteError()
        }
    }
    const handleFilterActive = (e) => {
        dispatch(actions.FilterPostsAdmin(e.target.value))
    }   
    const notifyDeleteSuccess = () => toast('Xóa thành công!');
    const notifyDeleteError = () => toast('Xóa lỗi!');
    return (
        <div className='flex flex-col gap-6'>
            <div className='border-b-2 pb-2 flex justify-between items-center'>
                <h1 className='text-2xl font-medium '>Quản lý tin đăng</h1>
                <select onChange={handleFilterActive} name="" id="" className='outline-none border p-2 border-gray-200 rounded-md'>
                    <option value="">Lọc theo trạng thái</option>
                    <option value="Đang hoạt động">Đang hoạt động</option>
                    <option value="Hết hạn">Hết hạn</option>
                </select>
            </div>
            <table className="w-full table-fixed">
                <thead className='bg-gray-200'>
                    <tr>
                        <th className='border p-2'>Mã tin</th>
                        <th className='border p-2'>Ảnh đại diện</th>
                        <th className='border p-2'>Tiêu đề</th>
                        <th className='border p-2'>Giá</th>
                        <th className='border p-2'>Ngày bắt đầu</th>
                        <th className='border p-2'>Ngày hết hạn</th>
                        <th className='border p-2'>Trạng thái</th>
                        <th className='border p-2'>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                        {postOffilter.length > 0 ? postOffilter?.map((item,index) => (
                            <tr key={index}>
                                <td className='text-center border' >{item.overviews.code}</td>
                                <td className='flex justify-center border'>
                                    <img src={JSON.parse(item.images.image)[0]} alt="img" className='w-[50px] h-[50px]' />
                                </td>
                                <td className='text-center border cursor-pointer' onClick={() => setIsShowTitle(!isShowTitle)}>{isShowTitle ? item.title: `${item.title.slice(0,10)}...` }</td>
                                <td className='text-center border'>{item.attributes.price}</td>
                                <td className='text-center border'>{item.overviews.created}</td>
                                <td className='text-center border'>{item.overviews.expired}</td>
                                <td className='text-center border'>
                                    {checkExpiration(item.overviews.expired)}
                                </td>
                                <td className='border'>
                                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeletePost(item)}>
                                    Xóa
                                </button>
                                <button class="bg-yellow-500 ml-2 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                                    dispatch(actions.editData(item))
                                    setIsEdit(true)
                                }}>
                                    Sửa
                                </button>
                                </td>
                            </tr>
                        )) : postOfcurrent?.map((item,index) => (
                            <tr key={index}>
                                <td className='text-center border' >{item.overviews.code}</td>
                                <td className='flex justify-center border'>
                                    <img src={JSON.parse(item.images.image)[0]} alt="img" className='w-[50px] h-[50px]' />
                                </td>
                                <td className='text-center border cursor-pointer' onClick={() => setIsShowTitle(!isShowTitle)}>{isShowTitle ? item.title: `${item.title.slice(0,10)}...` }</td>
                                <td className='text-center border'>{item.attributes.price}</td>
                                <td className='text-center border'>{item.overviews.created}</td>
                                <td className='text-center border'>{item.overviews.expired}</td>
                                <td className='text-center border'>
                                    {checkExpiration(item.overviews.expired)}
                                </td>
                                <td className='border'>
                                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeletePost(item)}>
                                    Xóa
                                </button>
                                <button class="bg-yellow-500 ml-2 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                                    dispatch(actions.editData(item))
                                    setIsEdit(true)
                                }}>
                                    Sửa
                                </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <ToastContainer />
            {isEdit && <UpdatePost setIsEdit={setIsEdit} isEdit={isEdit}/>}
        </div>
    )
}

export default ManagePost