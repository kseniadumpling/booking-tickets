import React, {Component} from 'react';
import MovieList from './components/MovieList';
import DemoList from './demo/demoList.json';
import Container from "react-bootstrap/Container";

class AppPage extends Component {
    render() {
        return (
            <Container className="pt-5">
                <h2 className="text-center">Book Your Tickets</h2>
                <MovieList data={DemoList.movieList}/>
            </Container>
        );
    }
}

export default AppPage;
