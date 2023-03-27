import React from 'react';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';
// import routes from '../../routes/routes'
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
export default function MasterLayout() {
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        {/* <Routes>
                            {routes.map((route, idx) => {
                                return (
                                    route.element && (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={(props) => (
                                                <route.element {...props} />
                                            )}
                                        />
                                    )
                                )
                            })}
                            <Navigate to="/admin/dashboard" />
                        </Routes> */

                        }

                        <Outlet />
                    </main>
                    <Footer />
                </div>


            </div>
        </div>
    )
}
