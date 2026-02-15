// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const withAuth = (WrappedComponent) => {
//   const AuthComponent = (props) => {
//     const router = useNavigate();

//     const isAuthenticated = () => {
//       if (localStorage.getItem("token")) {
//         return true;
//       }
//       return false;
//     };

//     useEffect(() => {
//       if (!isAuthenticated()) {
//         router("/auth");
//       }
//     }, [router]);

//     return <WrappedComponent {...props} />;
//   };

//   return AuthComponent;
// };

// export default withAuth;


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useNavigate();

    useEffect(() => {
      // Check directly inside the effect to avoid dependency issues
      if (!localStorage.getItem("token")) {
        router("/auth");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;