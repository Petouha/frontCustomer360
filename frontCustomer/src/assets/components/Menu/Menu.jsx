import React, { useState, useEffect, useRef } from 'react';
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import user from './kk.png'
import UserPage from '../Profil/profil';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';

export const Menu = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    signOut();
    navigate("/");
  }

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handler);


    return () => {
      document.removeEventListener("mousedown", handler);
    }

  });

  function DropdownItem(props) {
    return (
      <li className='dropdownItem'>
        <img className='dropdownItem-icon' src={props.img} alt='Icon' />
        <a className='dropdownItem-text' href={props.link} style={{ textDecoration: 'none' }}>{props.text}</a>

      </li>
    );
  }

  function DropdownLogOut(props) {
    return (<li className='dropdownItem' style={{ borderBottom: '0px' }}>
      <img className='dropdownItem-icon' src={props.img} alt='Icon' />
      <a className='dropdownItem-text' onClick={logOut} style={{ textDecoration: 'none'}}>{props.text}</a>

    </li>);
  }

  return (
    <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
          <img src={user}></img>
        </div>
        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >

          <ul>

            <DropdownItem link={"/Profil"} text={"Profile"} img="data:image/png;base64,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" />
            <DropdownItem text={"Consultation"} img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStw0IFcmEQ8n7KJHIsNQD3XnOv6B7S2OdVygh1Mk67Z6fW-NTYwDdTDmY0Gao9-8SH2vE&usqp=CAU" />
            <DropdownItem link={"#offre"} text={"Offres"} img="https://scontent.xx.fbcdn.net/v/t1.15752-9/350356462_1442199873212084_8553053995336780729_n.png?stp=dst-png_p403x403&_nc_cat=102&ccb=1-7&_nc_sid=aee45a&_nc_ohc=t3lYhU7Z4hAAX-QwwOB&_nc_oc=AQml53XYBBvuLZjPA5x96CrMkM0nD1voX7L1tMrbp9YT2fcSS4NUu4542FejtOxy230CcKRP2mvqQ91pcTjKTzU6&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdS5AwaiA3Ivneclhjag3noAUX0jda-8Hish7riNaiwylA&oe=64A08279" />
            <DropdownItem text={"Migration"} img="data:image/png;base64,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" />
            <DropdownItem link={"/plaintes"} text={"Plaintes"} img="https://scontent.xx.fbcdn.net/v/t1.15752-9/350377558_199916129665129_1110266842020676_n.png?_nc_cat=100&ccb=1-7&_nc_sid=aee45a&_nc_ohc=ejmd0XSBDKcAX_4obTn&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSvpGch1QaEDV-QloenREYUWvyANPnLfRxmaMHuZaFX1Q&oe=64A0795C" />
            <DropdownLogOut text={"Se déconnecter"} img="data:image/png;base64,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" />
          </ul>
        </div>
      </div>
    </div>
  );
}
