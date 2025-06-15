import React, { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../store/account/actions';

export const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
// const navigate = useNavigate();
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/auth", {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({email, password})
//       });
//       const data = await res.json();
//       if(res.ok){
//         localStorage.setItem('token', data.token);
//         navigate('/');
//       }
//     } catch (error) {
//       console.log("Loi ket noi server");
//     }
//   }
    const [inputs, setInputs] = useState({
      email: '',
      password: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const loading = useSelector<AppState, ReactNode>((state)=>state.account.loading);

    const {email, password} = inputs;

    const dispatch = useDispatch();
    const location = useLocation();
    //Cac hook ko duoc goi o trong ham callback
    const navigate = useNavigate();
    useEffect(()=>{
      dispatch(logout() as any);
    }, [dispatch]);

    const handleChange = ((e: ChangeEvent<HTMLInputElement>) =>{
      const {name, value} = e.target;
      setInputs((inputs) => ({
        ...inputs,
        [name]: value
      }));
    });
  //Neu submit thi sao v
    const handleSubmit = ((e: FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      setSubmitted(true);
      if(email&&password){
        console.log('Đang gửi dữ liệu:', { email, password });
        const {from} = location.state || {from: '/'};
        dispatch(login(email, password, from, navigate) as any);
      }
    });
  //Neu submit thi sao v
  return (
    <div className="container">
  {/* Outer Row */}
  <div className="row justify-content-center">
    <div className="col-xl-10 col-lg-12 col-md-9">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            <div 
  className="col-lg-6 d-none d-lg-block bg-login-image"
  style={{
    backgroundImage: 'url(https://github.com/Chaoemnha/onlinefile/blob/main/network.jpg?raw=true)',
    backgroundSize: 'cover', /* hoặc 'contain' */
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
></div>
            <div className="col-lg-6">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                </div>
                <form className="user" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input type="email" className={"form-control form-control-user " + (submitted?"is-invalid":"")} id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." onChange={handleChange} name='email'/>
                  </div>
                  <div className="form-group">
                    <input type="password" className={"form-control form-control-user " + (submitted?"is-invalid":"")} id="exampleInputPassword" placeholder="Password" onChange={handleChange} value={password} name='password'/>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox small">
                      <input type="checkbox" className="custom-control-input" id="customCheck" />
                      <label className="custom-control-label" htmlFor="customCheck">Remember
                        Me</label>
                    </div>
                  </div>
                  <div className='form-group'>
                  <button type='submit' className="btn btn-primary btn-user btn-block">
                    {loading && (<span className='spinner-border spinner-border-sm mr-1'></span>)}
                    Login
                  </button></div>
                  <hr />
                  <a href="index.html" className="btn btn-google btn-user btn-block">
                    <i className="fab fa-google fa-fw" /> Login with Google
                  </a>
                  <a href="index.html" className="btn btn-facebook btn-user btn-block">
                    <i className="fab fa-facebook-f fa-fw" /> Login with Facebook
                  </a>
                </form>
                <hr />
                <div className="text-center">
                  <a className="small" href="forgot-password.html">Forgot Password?</a>
                </div>
                <div className="text-center">
                  <a className="small" href="register.html">Create an Account!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
