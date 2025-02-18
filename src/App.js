import { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom'
import { Home, Login, Rental ,HomePage, DetailPost,SearchDetail,Contact } from './containers/Public';
import { path } from './ultis/constant';
import { System,CreatePost, ManagePost } from './containers/System';
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux';
import UpdateUser from './containers/System/UpdateUser';

function App() {
  const dispatch = useDispatch()
  const {isLoggedIn} = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAreas())
    dispatch(actions.getProvinces())
    dispatch(actions.getCategories())
  },[])

  useEffect(() => {
    setTimeout(() => {
        isLoggedIn && dispatch(actions.getCurrent())
    },1000)
  },[isLoggedIn])

  return (
    <div className="App w-full bg-primary overflow-hidden">
      <Routes>
        <Route path={path.HOME} element={<Home />} >
          <Route path={'*'} element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
          <Route path={path.CONTACT} element={<Contact />} />
          {/* <Route path={path.DETAIL_ALL} element={<DetailPost />} /> */}
        </Route>

        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />}/>
          <Route path={path.UPDATE_USER} element={<UpdateUser />}/>
          <Route path={path.MANAGE_POST} element={<ManagePost />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
