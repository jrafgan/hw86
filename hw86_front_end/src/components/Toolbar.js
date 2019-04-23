import React from 'react';
import {NavLink} from 'react-router-dom';

const Toolbar = ({user}) => {
    return (
        <div className="nav_bar">
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/add_artist">Добавить Исполнителя</NavLink>
            <NavLink className="add_album" to="/add_album">Добавить Альбом</NavLink>
            {user ? (
                <div className="nav_bar2">
                    <span>Привет, {user.username}!</span>
                    <NavLink to="/track_history" exact>Ваши трэки</NavLink>
                </div>
            ) : (
                <div className="nav_bar2">
                    <NavLink to="/register" exact>Регистрация</NavLink>

                    <NavLink to="/login" exact>Вход</NavLink>
                </div>
            )}
        </div>
    );
};

export default Toolbar;