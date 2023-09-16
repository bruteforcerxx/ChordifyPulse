import { useState, useEffect } from 'react';
import Icons from './icons';
 

function SideBar() {
    return ( 
        <>
        <section className='side-section'>
            <div className="logo-container">
                <div className='logo-circle'>
                <Icons name="wave" classname="logo"/>
                </div>

                <div className='title-cont'>
                    <h2 className="title">CHORDIFY</h2>
                    <h2 className="sub-title">PULSE</h2>
                </div>
                
            </div>

            <div className="menu-list">
                <a href="">
                <div>
                    <Icons name="home" classname="icons"/>
                    <h6 className="active">Home</h6>
                </div>
                </a>
                <a href="">
                <div>
                    <Icons name="search" classname="icons"/>
                    <h6>Search</h6>
                </div>
                </a>
            
                <a href="">
                <div>
                    <Icons name="trend" classname="icons"/>
                    <h6>Trends</h6>
                </div>
                </a>
                

                <a href="">
                <div>
                    <Icons name="stack" classname="icons"/>
                    <h6>Library</h6>
                </div>

                </a>
                
            </div>
            <div className="menu-list">
            <a href="">
                <div>
                    <Icons name="play" classname="icons"/>
                    <h6 className="">Made for you</h6>
                </div>
                </a>
                <a href="">
                <div>
                    <Icons name="music" classname="icons"/>
                    <h6>Daily Mix</h6>
                </div>
                </a>
            
            </div>
            <div className="menu-list">
                <a href="">
                <div>
                    <Icons name="home" classname="icons"/>
                    <h6 className="">Liked Songs</h6>
                </div>
                </a>
                <a href="">
                <div>
                    <Icons name="search" classname="icons"/>
                    <h6>Favourite Artists</h6>
                </div>
                </a>
            
                <a href="">
                <div>
                    <Icons name="home" classname="icons"/>
                    <h6>Trends</h6>
                </div>
                </a>
                

                <a href="">
                <div>
                    <Icons name="home" classname="icons"/>
                    <h6>Library</h6>
                </div>

                </a>
                
            </div>

        
        </section>
        
        
        </>
     );
}

export default SideBar;