import { useHeaderMenus } from '../../hooks/useHeaderMenus';
import './style.scss';

export const Header = () => {

    const menus = useHeaderMenus()
    
    return (
        <div className='Header-Component' >
            {menus.map(menu => {
                return (
                    <section key={menu.id}>
                        <p>{menu.title}</p>
                        {menus.indexOf(menu) == (menus.length - 1) ? null : <p>/</p>}
                    </section>
                )
            })}
        </div>
    )
}