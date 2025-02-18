import icons from "../ultis/icons";
const { FaPen,MdManageSearch,MdAccountBox } = icons;

const menuSidebar = [
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
        text: 'Sửa thông tin cá nhân',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <MdAccountBox  className="text-orange-500"/>
    },
    {
        id:4,
        text: 'Liên hệ',
        path: '/lien-he',
        icon: <MdAccountBox  className="text-orange-500"/>
    }
]

export default menuSidebar