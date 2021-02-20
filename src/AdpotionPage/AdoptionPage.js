import React from 'react'
import config from '../config'
import PeopleLine from '../PeopleLine/PeopleLine'
import './AdoptionPage.css'

export default class AdoptionPage extends React.Component {
    state = {
        pets: [],
        people: [],
        added: [],
        names: ['Max', 'Paulina', 'Tommy', 'Mike', 'Brad', 'Tanner', 'Brandon'],
        adopted: false
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/pets`)
        .then(petsData => petsData.json())
        .then(pets => {
            console.log(pets[1][0])
            this.setState({
                pets: [pets[0][0], pets[1][0]]
            })
        })
        fetch(`${config.API_ENDPOINT}/people`)
        .then(peopleData => peopleData.json())
        
        .then(people => {
            console.log(people)
            this.setState({
                people: people
            })
        })
        setInterval(this.handleLineDelete, 5000)
        setInterval(this.handleLineAdd, 5000)
    }

    handleAddPerson = (e) => {
        e.preventDefault()
        this.setState({
            user: e.target['person_name'].value,
            people: [...this.state.people, e.target['person_name'].value]
        })
        fetch(`${config.API_ENDPOINT}/people`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                person: e.target['person_name'].value
            })
        })
        e.target['person_name'].value = ''
        
    }

    handleLineDelete = () => {
        if (this.state.user && this.state.user !== this.state.people[0]) {
            const type = ['dog', 'cat']
            fetch(`${config.API_ENDPOINT}/people`, {
                method: 'DELETE',
            })
            const newPeople = this.state.people.filter(person => {return person !== this.state.people[0]})
            this.setState({
                people: newPeople
            })
            this.handleAdopt(type[Math.floor(Math.random() * 3)])
        }
    }

    uniqueName = () => {
        let uniqueIndex = Math.floor(Math.random() * this.state.names.length)
        if (!this.state.added.includes(uniqueIndex)) {
            return uniqueIndex
        } else {
            this.uniqueName()
        }
    }

    handleLineAdd = () => {
        let namesIndex = this.uniqueName()
        const newPerson = this.state.names[namesIndex]
        
        if (this.state.user === this.state.people[0] && this.state.people.length < 5) {
            this.setState({
                people: [...this.state.people, newPerson],
                added: [...this.state.added, namesIndex]
            })
            fetch(`${config.API_ENDPOINT}/people`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    person: newPerson
                })
            })
        }
    }

    handleAdopt = (type, setAdopted) => {
        fetch(`${config.API_ENDPOINT}/pets`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                type: type
            })
        })
        .then(data => data.json())
        .then(data => {
            if (type === 'dog') {
                this.setState({
                    pets: [this.state.pets[0], data[1]],
                    adopted: setAdopted ? true : false
                })
            }else {
                this.setState({
                    pets: [data[1], this.state.pets[1]],
                    adopted: setAdopted ? true : false
                })
            }
        })
    }

    render() {
        return(
            <>
            { this.state.adopted
                ? <div className='adopt_message'><p>Congrats! You just adopted a pet.</p></div>
                : null
            }
            <div className='Adopt_main'>
                
                <div className='pet_container'>
                {this.state.pets.map((pet, idx) => {
                    return (
                        <ul className='pet_content' key={idx}>
                            <li><h3 className='pet_name'>{pet.name}</h3></li>
                            <li><img className='pet_img' src={pet.imageURL} alt={pet.description} /></li>
                            <li>{pet.description}</li>
                            <li>{pet.story}</li>
                            <li>{pet.breed}</li>
                            <li>{pet.age}</li>
                            <li>{pet.gender}</li>
                            {this.state.user === this.state.people[0] ? <button onClick={() => {this.handleAdopt(pet.type, true)}}>Adopt</button> : null}
                        </ul>
                    )
                })}
                </div>
                <div className='line-container'>
                    <PeopleLine people={this.state.people}/>
                    <form onSubmit={this.handleAddPerson}>
                        <input type='text' name='person_name' aria-label='name input' />
                        <button type='submit'>Enter Line</button>
                    </form>
                </div>
            </div>
            </>
        )
    }
}