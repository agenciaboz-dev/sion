import { useHeaderMenus } from '../../hooks/useHeaderMenus';
import {ReactComponent as Logo} from '../../images/logo.svg';
import './style.scss';

export const Header = () => {

    const menus = useHeaderMenus()
    
    return (
        <div className='Header-Component' >
            <div className="menus-container">
                {menus.map(menu => {
                    return (
                        <section key={menu.id}>
                            <p className='menu-title'>{menu.title}</p>
                            {menus.indexOf(menu) == (menus.length - 1) ? null : <p>/</p>}
                        </section>
                    )
                })}
            </div>
            <Logo />
        </div>
    )
}