import React from 'react'
import './PeopleLine.css'

export default class PeopleLine extends React.Component {
    static defaultProps = {
        people: []
    }
    render() {
        return (
            <div className='line'>
                {this.props.people.map((person, idx) => {
                    return <p className='person' key={idx}>{person}</p>
                })}
            </div>
        )
    }
}