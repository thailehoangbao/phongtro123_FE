import React, { useEffect, useState } from 'react'
import { InputForm, Button } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import * as actions from '../../store/actions'
import Swal from 'sweetalert2'
import validate from '../../ultis/Common/validateFields'

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn,msg } = useSelector(state => state.auth)
    const [isRegister,setRegister] = useState(false)
    const [invalidFields,setInvalidFields] = useState([])
    const [payload,setPayload] = useState({
        phone: '',
        password: '',
        name: ''
    })
    useEffect(() => {
        setRegister(location.state?.flag)
    },[location])

    useEffect(() => {
        isLoggedIn && navigate('/')
    },[isLoggedIn])

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error')
    },[msg])

    const handleSubmit = async () => {
        let finalPayload = isRegister ? payload : {
            phone: payload.phone,
            password: payload.password
        }
        let isvalids = validate(finalPayload,setInvalidFields)
        if(isvalids == 0) {
            isRegister ? dispatch(actions.register(finalPayload)) : dispatch(actions.login(finalPayload))
        }
    }

    return (
        <div className='bg-white mw-600 w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
            <h3 className='font-semibold text-2xl mb-3'>{isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}</h3>
            <div className='w-full flex flex-col gap-3'>
                {isRegister && <InputForm invalidFields={invalidFields} setInvalidFields={setInvalidFields}   text="HỌ TÊN" value={payload.name} setValue={setPayload} type="name"/>}
                <InputForm invalidFields={invalidFields} setInvalidFields={setInvalidFields}  text="SỐ ĐIỆN THOẠI" value={payload.phone} setValue={setPayload} type="phone"/>
                <InputForm invalidFields={invalidFields} setInvalidFields={setInvalidFields}  text="MẬT KHẨU" value={payload.password} setValue={setPayload} type="password"/>
            </div>
            <Button 
                text={isRegister ? "Đăng ký" : "Đăng nhập"}
                textColor='text-white'
                bgColor='bg-secondary1 mt-4'
                fullWidth
                onClick={handleSubmit}
            />
            <div className='flex justify-between mt-7'>
                <>
                    {isRegister ? <small>Bạn đã có tài khoản ? <span className='text-blue-500 hover:underline cursor-pointer hover:text-red-500'  onClick={() => {
                        setRegister(false)
                        setPayload({
                            phone: '',
                            name: '',
                            password: ''
                        })
                    }}>Đăng nhập ngay</span> </small> : (
                        <>
                            <small className='text-[blue] hover:text-[red] cursor-pointer hover:underline'>Bạn quên mật khẩu?</small>
                            <small className='text-[blue] hover:text-[red] cursor-pointer hover:underline' onClick={() => {
                                setPayload({
                                    phone: '',
                                    name: '',
                                    password: ''
                                })
                            }}>Tạo tài khoản mới?</small>
                        </>
                    )}
                </>
            </div>
        </div>
    )
}

export default Login