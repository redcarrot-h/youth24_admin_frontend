import AdminSignup from './AdminSignup';
import AdminLogin from './AdminLogin';
import PrivateRoute from '../../access/PrivateRoute';

const AdminHome = () => {
  return (
    <>
      <title>Admin :: 청년24</title>

      <AdminLogin
        element={<PrivateRoute isAuth={false} RouteComponent={AdminLogin} />}
      />
      <AdminSignup
        element={<PrivateRoute isAuth={false} RouteComponent={AdminSignup} />}
      />

      <div
        className='toast align-items-center text-bg-primary border-0'
        role='alert'
        aria-live='assertive'
        aria-atomic='true'
      >
        <div className='d-flex'>
          <div className='toast-body'>
            Hello, world! This is a toast message.
          </div>
          <button
            type='button'
            className='btn-close btn-close-white me-2 m-auto'
            data-bs-dismiss='toast'
            aria-label='Close'
          ></button>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
