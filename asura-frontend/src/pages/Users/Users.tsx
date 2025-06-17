import React, { Fragment, JSX, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import {IUser} from '../../store/users/types'
import { useDispatch } from 'react-redux'
import { deleteUsers, loadUsersPaging } from '../../store/users/actions'
import { Pagination } from '../../components'
import { Link } from 'react-router-dom'
import { urlConstants } from '../../constants/url-constants'
import swal from 'sweetalert'

export const Users = () => {
  const users: IUser [] = useSelector((state: AppState)=>state.users.items);
  const totalItems = useSelector((state: AppState)=>state.users.total);
  //Gio ms biet pageSize no lay tu respone tu backend
  const pageSize = useSelector((state: AppState)=>state.users.pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems]=useState<string[]>([]);

  console.log(users);
  useEffect(()=>{
    //Nhu nay khi F5 van o trang do
    dispatch(loadUsersPaging(currentPage) as any);
  },[dispatch, currentPage])

  const onPageChanged = (pageNumber: number)=>{
    setCurrentPage(pageNumber);
    const searchKeyword: string = sessionStorage.getItem('searchKeyword')??"";
  }
  const handleSelectedRow = (id: string)=>{
    let newSelectedItems = [...selectedItems];
    selectedItems.indexOf(id)!==-1?(newSelectedItems=selectedItems.filter((item)=>item!==id)):newSelectedItems.push(id);
    setSelectedItems(newSelectedItems);
  }
  const handleDelete = ()=>{
    if(selectedItems){
      swal({
        title: 'Confirm',
        text: 'Do you want to delete these records?',
        icon: 'warning',
        buttons: ['Cancel','Apply'],
        dangerMode: true,

      }).then((willDelete)=>{
        if(willDelete){
          dispatch(deleteUsers(selectedItems) as any);
          setSelectedItems([]);
        }
      })
    }
  }
  //Lay tablebody ra thanh 1 bien la mang JSX khi lay cac thuoc tinh user hien thi ra JSX
  const userElements: JSX.Element[]=users.map((user)=>{
    return(
      <tr key={`user_${user._id}`} className={`table-row ${selectedItems.indexOf(user._id)!==-1?'selected': ''}`} onClick={()=>handleSelectedRow(user._id)}>
        <td><img className="img-profile rounded-circle" src={`${user.avatar}`} alt=''/></td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td><Link to={urlConstants.USER_EDIT+user._id}>Edit</Link></td>
        <td>
          <input aria-label='del user' type='checkbox' value={`${user._id}`} onChange={()=>handleSelectedRow(user._id)} checked={selectedItems.indexOf(user._id)!==-1}/>
        </td>
      </tr>
    )
  })
  return (
    <Fragment>
        <div>
  {/* Page Heading */}
  <h1 className="h3 mb-2 text-gray-800">User list</h1>
  {/* DataTales Example */}
  <div className="card shadow mb-4">
    <div className="card-header py-3 d-flex justify-content-between align-items-center">
      <h6 className="m-0 font-weight-bold text-primary">{(sessionStorage.getItem('searchKeyword') && sessionStorage.getItem('searchKeyword') != "")
      ? `Search results for: ${sessionStorage.getItem('searchKeyword')}`:"User list"
      }
    {(sessionStorage.getItem('searchKeyword') && sessionStorage.getItem('searchKeyword') != "") && (
      <button
        className="btn btn-sm btn-secondary ml-3"
        onClick={() => {dispatch(loadUsersPaging(1) as any); sessionStorage.removeItem('searchKeyword')}}
        style={{ marginLeft: 12 }}
      >
        Cancel
      </button>
    )}</h6>{selectedItems.length > 0&&(
        <Fragment>
          <button className='btn btn-outline-danger btn-sm' onClick={handleDelete}>
            <span className='fa fa-trash'></span>Delete
          </button>
          <button className='btn btn-outline-primary btn-sm' onClick={()=>setSelectedItems([])} >
            <i className='fas fa-check' ></i>Cancel select
          </button>
        </Fragment>
      )}<Link to={urlConstants.USER_ADD} className='btn btn-outline-success btn-sm'>
      <span className='fa fa-plus'>Add new</span></Link>
    </div>
    <div className="card-body">
      <div className="table-responsive">
        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>FName</th>
              <th>LName</th>
              <th>Email</th>
              <th></th>
              <th>Del</th>
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
