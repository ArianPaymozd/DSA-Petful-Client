import React from 'react'
import { Link } from 'react-router-dom'
import LandingImg from './LandingImg-min.jpg'
import './LandingPage.css'

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className='Landing_main'>
                <div className='Landing_content'>
                    <img className="Landing_img" src={LandingImg} alt='family with dog'/>
                    <p className="Landing_text">Here at petful we have a first in first out or FIFO philosophy when it comes to pet adoption. Future pet parents can enter a queue to adopt either a dog or cat. Only the first pet in line can be adopted at any time, meaning you only have one option for each pet! Go to the adoption page and enter the queue to take home your new best friend as soon as possible!</p>
                </div>
                <Link className="adopt_link" to='/adopt'>Adopt Now!</Link>
            </div>
        )
    }
}