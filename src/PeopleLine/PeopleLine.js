import React from 'react'
import './PeopleLine.css'

export default class PeopleLine extends React.Component {
    static defaultProps = {
        people: []
    }
    render() {
        return (
            <div className='line'>
                {this.props.people.map(person => {
                    return <p className='person'>{person}</p>
                })}
            </div>
        )
    }
}