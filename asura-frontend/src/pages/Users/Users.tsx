import React, { Fragment, JSX, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import {IUser} from '../../store/users/types'
import { useDispatch } from 'react-redux'
import { loadUsersPaging } from '../../store/users/actions'

export const Users = () => {
  const users: IUser [] = useSelector((state: AppState)=>state.users.items);
  console.log(users);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUsersPaging(1) as any);
  },[dispatch])
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
    <div className="card-header py-3">
      <h6 className="m-0 font-weight-bold text-primary">Danh sách người dùng</h6>
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
  </div>
</div>

    </Fragment>
  )
}
