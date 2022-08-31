import MainNavbar from './MainNavbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => <main>
    <MainNavbar/>
    <div>
        <Outlet/>
    </div>
    <Footer/>
</main>

export default MainLayout