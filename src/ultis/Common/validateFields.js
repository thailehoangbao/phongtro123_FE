const validate = (payload,setInvalidFields) => {
    let invalids = 0;
    let fields = Object.entries(payload)
    fields.forEach(item => {
        if (item[1] === '' || item[1] === 0) {
            setInvalidFields(prev => [...prev,{
                name: item[0],
                message: 'Vui lòng không để trống!'
            }])
            invalids++
        }
    })

    fields.forEach(item => {
        switch (item[0]) {
            case 'phone':
                if(!+item[1] ) {
                    setInvalidFields(prev => [...prev,{
                        name: item[0],
                        message: 'Vui lòng nhập đúng định dạng số điện thoại!'
                    }])
                    invalids++
                }
                break;
            case 'password':
                if(item[1].length < 6) {
                    setInvalidFields(prev => [...prev,{
                        name: item[0],
                        message: 'Vui lòng nhập mật khẩu nhiều hơn 6 ký tự'
                    }])
                    invalids++
                }
                break;    
            case 'priceNumber':
            case 'areaNumber':
                if(!+item[1]) {
                    setInvalidFields(prev => [...prev,{
                        name: item[0],
                        message: 'Vui lòng nhập đúng định dạng số!'
                    }])
                    invalids++
                }
                break;

            default:
                break;
        }
    })

    return invalids
}

export default validate