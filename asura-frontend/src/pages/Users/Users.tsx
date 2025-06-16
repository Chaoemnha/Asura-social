import React, { Fragment, JSX, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import {IUser} from '../../store/users/types'
import { useDispatch } from 'react-redux'
import { loadUsersPaging } from '../../store/users/actions'
import { Pagination } from '../../components'
import { Link } from 'react-router-dom'
import { urlConstants } from '../../url-constants/url-constants'

export const Users = () => {
  const users: IUser [] = useSelector((state: AppState)=>state.users.items);
  const totalItems = useSelector((state: AppState)=>state.users.total);
  //Gio ms biet pageSize no lay tu respone tu backend
  const pageSize = useSelector((state: AppState)=>state.users.pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(users);
  const dispatch = useDispatch();
  useEffect(()=>{
    //Nhu nay khi F5 van o trang do
    dispatch(loadUsersPaging(currentPage) as any);
  },[dispatch, currentPage])

  const onPageChanged = (pageNumber: number)=>{
    setCurrentPage(pageNumber);
    const searchKeyword: string = sessionStorage.getItem('searchKeyword')??"";
  }
  //Lay tablebody ra thanh 1 bien la mang JSX khi lay cac thuoc tinh user hien thi ra JSX
  const userElements: JSX.Element[]=users.map((user)=>{
    return(
      <tr key={`user_${user._id}`}>
        <td><img className="img-profile rounded-circle" src={`${user.avatar}`} alt=''/></td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
      </tr>
    )
  })
  return (
    <Fragment>
        <div>
  {/* Page Heading */}
  <h1 className="h3 mb-2 text-gray-800">Danh sách người dùng</h1>
  {/* DataTales Example */}
  <div className="card shadow mb-4">
    <div className="card-header py-3 d-flex justify-content-between align-items-center">
      <h6 className="m-0 font-weight-bold text-primary">{(sessionStorage.getItem('searchKeyword') && sessionStorage.getItem('searchKeyword') != "")
      ? `Kết quả tìm kiếm cho: ${sessionStorage.getItem('searchKeyword')}`:"Danh sách người dùng"
      }
    {(sessionStorage.getItem('searchKeyword') && sessionStorage.getItem('searchKeyword') != "") && (
      <button
        className="btn btn-sm btn-secondary ml-3"
        onClick={() => {dispatch(loadUsersPaging(1) as any); sessionStorage.removeItem('searchKeyword')}}
        style={{ marginLeft: 12 }}
      >
        Hủy
      </button>
    )}</h6><Link to={urlConstants.USER_ADD} className='btn btn-outline-success btn-sm'>
      <span className='fa fa-plus'>Thêm mới</span></Link>
    </div>
    <div className="card-body">
      <div className="table-responsive">
        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
          <thead>
            <tr>
              <th>Ảnh đại diện</th>
              <th>Họ</th>
              <th>Tên</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userElements}
          </tbody>
        </table>
      </div>
    </div>
    <div className='card-footer'>
      <Pagination totalRecords={totalItems} pageLimit={3} pageSize={pageSize} onPageChanged={onPageChanged}></Pagination>
    </div>
  </div>
</div>

    </Fragment>
  )
}
