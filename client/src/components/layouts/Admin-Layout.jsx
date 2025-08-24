import { NavLink, Outlet } from "react-router-dom";

export const AdminLayout = () => {
    return <>
    <header>
        <div className="container">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/admin/users">Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/contacts">Contacts</NavLink>
                    </li>
                    <li>services</li>
                    <li>home</li>
                </ul>
            </nav>
        </div>
    </header>
    {/* Outlet is used to show the nested route pages */}
    <Outlet />
    
    </>
};