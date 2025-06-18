import React, { ChangeEvent, FormEvent, Fragment, ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { useDispatch } from 'react-redux';
import { IAddUserRequest, IUpdateUserRequest } from '../../store/users/types';
import { addUser, getUserById, updateUser } from '../../store/users/actions';
import { useNavigate, useParams } from 'react-router';
import { urlConstants } from '../../constants/url-constants';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../helpers';
import { UnknownAction } from 'redux';

export const EditUser = () => {
  const id = useParams() as {id: string};//No se ra kieu nay chu ko phai ep
  const dispatch = useDispatch();
  const user = useSelector((state: AppState)=>state.users.editUser);
  const [formInput, setFormInput] = useState({
    email: '',
    first_name: '',
    last_name: '',
  });
  useEffect(()=>{
    dispatch(getUserById(id.id.slice(3)) as unknown as UnknownAction);
  },[dispatch, id])
  useEffect(()=>{
    setFormInput({
      first_name: user!==null?user.first_name:'',
      last_name: user!==null?user.last_name:'',
      email: user!==null?user.email:'',
    })
  }, [user])
  const [formSubmitted, setFormSubmitted]=useState(false);
  const {email, first_name, last_name} = formInput;

  const loading = useSelector<AppState, ReactNode>((state)=>state.users.loading);
  const navigate = useNavigate();
const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
  const {name, value} = e.target;
  //Do dau ngoac nhon trong callback bi JS hieu nham la khoi lenh nen phai boc bang ({})
  //Khi tên tham số cần biến động, vd ko dc cố định tên name, mà có thể là a, 1, @ các thứ thì bọc [name]
  setFormInput((input)=>({...input, [name]: value}));
}

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setFormSubmitted(true);
    if(email&&first_name&&last_name){
      const user: IUpdateUserRequest = {
        email,
        first_name,
        last_name
      };
      dispatch(updateUser(id.id.slice(3), user, navigate) as any)
    }
  }
  return (
    <Fragment>
<h1 className='h3 mb-4 text-gray-800 text-left'>Cập nhật user</h1>
<div className='card text-left'>
<div className='card-header'>Thông tin user</div>
<div className='card-body'>
<form onSubmit={handleSubmit}>
<div className="form-group">
<label>Email</label>
<input type='text' className={"form-control "+ (formSubmitted && (!email || !validateEmail(email))? 'is-invalid': '')}
value={email} name='email' placeholder='name@example.com' onChange={handleChange}/>
{formSubmitted && !email && (
<div className='invalid-feedback'>Email is required</div>
)}
{formSubmitted && !validateEmail(email) && (
<div className='invalid-feedback'>Email is not valid</div>
)}
</div>
<div className="form-group">
<label>Tên</label>
<input type='text' className={'form-control '+(formSubmitted && !first_name ?'is-invalid':'')} value={first_name} name='first_name' onChange={handleChange}/>
  {formSubmitted && !first_name&&(<div className='invalid-feedback'>First name is required</div>
)}
</div>
<div className="form-group">
<label>Họ</label>
<input type='last_name' className={"form-control " + (formSubmitted && ! last_name? 'is-invalid': '')}
value={last_name} name='last_name' onChange={handleChange}/>
{formSubmitted && ! last_name && (<div className='invalid-feedback'>Last name is required</div>)}
</div>
<div className="form-group">
<button className='btn btn-primary' type='submit'>
{loading && (<span className='spinner-border spinner-border-sm mr-1'></span>)}
Lưu
</button>
<Link className='btn btn-danger' to={urlConstants.USER_LIST}>
Hủy
</Link>
</div>
</form></div></div></Fragment>)};