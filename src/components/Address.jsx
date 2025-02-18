import React,{memo, useEffect, useState} from 'react'
import { InputReadOnly, SelectAddress } from '../components'
import { apiGetPublicDetailDictrict, apiGetPublicDetailProvince, apiGetPublicDictricts, apiGetPublicProvince } from '../services'
import { useSelector } from 'react-redux'
const Address = ({setPayload,invalideFields,setInvalideFields}) => {
    const {dataEdit} = useSelector(state => state.post)
    const [provinces,setProvinces] = useState([])
    const [districts,setDistricts] = useState([])
    const [nameProvince,setNameProvince] = useState('')
    const [nameDistrict,setnameDistrict] = useState('')
    const [codeProvince,setcodeProvince] = useState('')
    const [codeDistrict,setcodeDistrict] = useState('')
    useEffect(() => {
        let addressArr = dataEdit?.address?.split(',') || []
        let foundProvince = provinces?.length > 0 && provinces?.find(item => item.name === addressArr[1])
        setcodeProvince(foundProvince?.code)
        setNameProvince(foundProvince?.name)
        const fetchPublicDictrict = async () => {
            const response =  await apiGetPublicDictricts()
            const dataDistrict = response?.data.filter((item) => item.province_code === +foundProvince?.code)
            setDistricts(dataDistrict)
            if(response?.status === 200 ) {
                let foundDistrict = dataDistrict.length > 0 && dataDistrict?.find(item => item.name === addressArr[0])
                setnameDistrict(foundDistrict.name)
                setcodeDistrict(foundDistrict.code)
            }
        }
        fetchPublicDictrict()
    },[provinces])
    const getDistrictFromProvice = (e) => {
        const provinceCode = e.target.value
        setcodeProvince(e.target.value)
        setPayload(prev => ({...prev,provinceCode: e.target.value}))
        const fetchPublicDictrict = async () => {
            const response =  await apiGetPublicDictricts()
            const detailProvince = await apiGetPublicDetailProvince(e.target.value)
            const dataDistrict = response?.data.filter((item) => item.province_code === +provinceCode)
            if(response?.status === 200 ) {
                setDistricts(dataDistrict)
            }

            if(detailProvince?.status === 200 ) {
                setNameProvince(detailProvince.data.name)
                setnameDistrict('')
            }
        }
        fetchPublicDictrict()
    }
    const setNameDistrict = (e) => {
        const codeDistrict = e.target.value
        setcodeDistrict(e.target.value)
        const fetchNameDistrict = async () => {
            const response = await apiGetPublicDetailDictrict(codeDistrict)
            if(response?.status === 200 ) {
                setnameDistrict(response.data.name)
            }
        }
        fetchNameDistrict()
    }
    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response =  await apiGetPublicProvince()
            if(response?.status === 200 ) {
                setProvinces(response.data)
            }
        }
        fetchPublicProvince()
    },[])
    useEffect(() => {
        setPayload(prev => ({
            ...prev,
            address: `${nameDistrict ? nameDistrict : ''}${nameDistrict ? ',' : ''}${nameProvince ? nameProvince :''}`,
            province: `${nameProvince ? nameProvince :''}`
        }))
    },[nameDistrict,nameProvince])
    return (
        <div >
            <h2 className='text-lg font-semibold'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <SelectAddress invalideFields={invalideFields} setInvalideFields={setInvalideFields} type='province' label='Tỉnh/Thành Phố' options={provinces} getDistrictFromProvice={getDistrictFromProvice} value={codeProvince}/>
                    <SelectAddress invalideFields={invalideFields} setInvalideFields={setInvalideFields} type='district' label='Quận/Huyện'options={districts} setNameDistrict={setNameDistrict} value={codeDistrict}/>
                </div>
                <InputReadOnly nameProvince={nameProvince} nameDistrict={nameDistrict} label='Địa chỉ chính xác'/>
            </div>
        </div>
    )
}

export default memo(Address)
