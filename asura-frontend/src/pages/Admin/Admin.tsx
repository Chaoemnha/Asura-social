import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { AppState } from '../../store';
import { Sidebar } from '../Sidebar/Sidebar';
import { Topbar } from '../Topbar/Topbar';
import {getCurrentLoginUser} from '../../store/account/actions';

export const Admin = () => {
  //P select đúng state bị tác động bởi LOGOUT
  const token = useSelector<AppState>(
      (state: any) => state.account.token
    );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentLoginUser() as any);
  }, [dispatch]);

  useEffect(() => {
    if (token === null) {
      navigate('/login', { replace: true });
      console.log("Dang chuyen ve login");
    }
  }, [token, navigate]);
  return (
    <Fragment>
      <Sidebar/>
  {/* Content Wrapper */}
  <div id="content-wrapper" className="d-flex flex-column">
    {/* Main Content */}
    <div id="content">
      <Topbar/>
      {/* Begin Page Content */}
      <div className="container-fluid">
        <Outlet/>
      </div>
      {/* /.container-fluid */}
    </div>
    {/* End of Main Content */}
    {/* Footer */}
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright © Asura social 2025</span>
        </div>
      </div>
    </footer>
    {/* End of Footer */}
  </div>
</Fragment>
  )
}
