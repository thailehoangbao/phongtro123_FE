import icons from "../ultis/icons";
const { FaPen,MdManageSearch,MdAccountBox } = icons;

const menuManage = [
    {
        id:1,
        text: 'Đăng tin cho thuê',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <FaPen  className="text-orange-500"/>
    },
    {
        id:2,
        text: 'Quản lí tin đăng',
        path: '/he-thong/quan-li-bai-dang',
        icon: <MdManageSearch className="text-orange-500"/>
    },
    {
        id:3,
        text: 'Thông tin tài khoản',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <MdAccountBox  className="text-orange-500"/>
    },
]

export default menuManage