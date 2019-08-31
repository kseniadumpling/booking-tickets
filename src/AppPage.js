import React, {Component} from 'react';
import MovieList from './components/MovieList';
import DemoList from './demo/demoList.json';
import './AppPage.css';





class AppPage extends Component {
    render() {
        return (
            <div className="container pt-5">
                <h2 className="text-center">Book Your Tickets</h2>
                <MovieList data={DemoList.movieList}/>
            </div>
        );
    }
}

export default AppPage; // TODO: google this!!!
