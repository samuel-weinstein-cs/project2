import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_search } from '../services/api-helper';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }
    componentDidMount() {
        this.loadList()
    }
    componentDidUpdate(prevProps) {
        if (this.props.search !== prevProps.search) {
            this.loadList()
        }
    }
    loadList = async () => {
        const response = await API_search(this.props.search);
        this.setState({
            items: response.Search,
        })
    }
    render() {
        console.log(this.state.items);

        return (
            <div id="list">
                {this.state.items ? this.state.items.map((item, key) =>
                    <div key={key} className="list-movie">
                        <Link to={`/id/${item.imdbID}`}>
                            <h1>{item.Title} ({item.Year})</h1>
                            {item.Poster !== "N/A" &&
                                <img
                                    className="list-poster"
                                    src={item.Poster}
                                    alt={item.Title}
                                />}
                        </Link>
                    </div>
                ) :
                    <h1>No results found</h1>
                }
            </div >
        )
    }
}
export default List;