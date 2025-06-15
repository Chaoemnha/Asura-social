import React, { ChangeEvent, FormEvent, Fragment, ReactNode, useState } from 'react'
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { useDispatch } from 'react-redux';
import { IAddUserRequest } from '../../store/users/types';
import { addUser } from '../../store/users/actions';
import { useNavigate } from 'react-router';
import { urlConstants } from '../../url-constants/url-constants';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../helpers';

export const AddUser = () => {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const [formSubmitted, setFormSubmitted]=useState(false);
  const {email, password, first_name, last_name} = formInput;

  const loading = useSelector<AppState, ReactNode>((state)=>state.users.loading);
  const dispatch = useDispatch();
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
    if(email&&password&&first_name&&last_name){
      const user: IAddUserRequest = {
        email,
        password,
        first_name,
        last_name
      };
      dispatch(addUser(user, navigate) as any)
    }
  }
  return (
    <Fragment>
<h1 className='h3 mb-4 text-gray-800'>Add new user</h1>
<div className='card'>
<div className='card-header'>Thông tin user</div>
<div className='card-body'>
<form onSubmit={handleSubmit}>
<div className="form-group">
<label>Email</label>
<input type='text' className={"form-control "+ (formSubmitted && (!email || !validateEmail(email))? 'is-invalid': '')}
name='email' placeholder='name@example.com' onChange={handleChange}/>
{formSubmitted && !email && (
<div className='invalid-feedback'>Email is required</div>
)}
{formSubmitted && !validateEmail(email) && (
<div className='invalid-feedback'>Email is not valid</div>
)}
</div>
<div className="form-group">
<label>Password</label>
<input type="password" className={"form-control " + (formSubmitted && !password? 'is-invalid': '')}
name="password" onChange={handleChange}/>
  {formSubmitted && !password && (<div className='invalid-feedback'>Password is required</div>
)}
</div>
<div className="form-group">
<label>Tên</label>
<input type='text' className={'form-control '+(formSubmitted && !first_name ?'is-invalid':'')} name='first_name' onChange={handleChange}/>
  {formSubmitted && !first_name&&(<div className='invalid-feedback'>First name is required</div>
)}
</div>
<div className="form-group">
<label>Họ</label>
<input type='last_name' className={"form-control " + (formSubmitted && ! last_name? 'is-invalid': '')}
name='last_name' onChange={handleChange}/>
{formSubmitted && ! last_name && (<div className='invalid-feedback'>Last name is required</div>)}
</div>
<div className="form-group">
<button className='btn btn-primary' type='submit'>
{loading && (<span className='spinner-border spinner-border-sm mr-1'></span>)}
Save
</button>
<Link className='btn btn-danger' to={urlConstants.USER_LIST}>
Cancel
</Link>
</div>
</form></div></div></Fragment>)};