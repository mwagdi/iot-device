import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from './constants';
import { Provider } from './AppContext';
import ReadingsList from './components/ReadingsList';
import { searchReadings, getActive } from './helpers';
import StatusMessage from './components/StatusMessage';
import ActiveIndicator from './components/ActiveIndicator';

class App extends Component{
    state = {
        search: "",
        readingNames: [],
        readingsByName: {},
        status: null,
        closeStatus: () => this.setState({ status: null }),
        toggleActive: (reading,value) => {
            this.setState({ status: value ? "Activating..." : "Deactivating..." })
            axios.patch(`${API_URL}/${reading}?active=${value}`)
            .then(() => {
                this.setState(({readingsByName}) => ({
                     readingsByName: {
                         ...readingsByName,
                         [reading]: {
                             ...readingsByName[reading],
                             active: value
                         }
                     },
                     status: null
                    }))
            })
            .catch(() => this.setState({ status: "Error" }))
        }
    }
    componentDidMount(){
        this.setState({ status: "Loading..." })
        axios.get(API_URL)
        .then(response => this.setState({
            status: null,
            readingNames: response.data.data.map(reading => reading.name),
            readingsByName: response.data.data.reduce((obj,reading) => {
                return {
                    ...obj,
                    [reading.name]: reading
                }
            },{})
        }))
    }
    handleInputChange = e => {
        this.setState({ search: e.target.value })
    }
    render(){
        const { readingNames,readingsByName,search,status,closeStatus } = this.state;
        return (
            <Provider value={this.state}>
                {status && <StatusMessage status={status} close={closeStatus} />}
                <h1>Relayr Device Dashboard</h1>
                <div className="main-container">
                    <div className="input-container">
                        <input
                            type="text"
                            value={search}
                            placeholder="Search readings..."
                            onChange={this.handleInputChange}/>
                    </div>
                    <div className="main-wrap flex-container">
                        <ReadingsList readings={searchReadings(search,readingNames)} />
                        <ActiveIndicator
                        total={readingNames.length}
                        active={getActive(readingNames,readingsByName)} />
                    </div>
                </div>
            </Provider>
        )
    }
}

export default App;
