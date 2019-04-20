import React, {Component} from 'react';
import '../App.css'
import {getAlbums, getArtists, getTracks} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";
import ImageThumbnail from "../components/ImageThumbnail";
import {Link, NavLink} from "react-router-dom";


class Main extends Component {

    componentDidMount() {
        this.props.getArtists();
        // this.props.getAlbums();
        // this.props.getTracks();
    }

    getAlbums = e => {
      console.log(e.target);
    };

    selectChangeHandler = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    inputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    };

    render() {
        console.log(this.props.state);
        return (
            <div className="App">
                <h2 className="h2">First.FM</h2>
                <div className="main_nav">
                    <NavLink to="/add_artist">Добавить Исполнителя</NavLink>
                    <NavLink className="add_album" to="/add_album">Добавить Альбом</NavLink>
                </div>
                <div className="list_div">
                    <div className="column">
                        <p className="artist_p">Исполнители</p>
                        {this.props.artists ? this.props.artists.map(item => {
                            return <div className="artist_thumbnail" key={item._id} id={item._id}  onClick={this.getAlbums}>
                                <ImageThumbnail image={item.image}/>
                                <p>{item.name}</p>
                                <p>{item.description}</p>
                                <Link to={"/album_info/" + item._id}>Альбомы</Link>
                            </div>
                        }) : null}
                    </div>
                    {/*<div className="column">*/}
                    {/*    <p>Альбомы</p>*/}
                    {/*    {this.props.albums ? this.props.albums.map(item => {*/}
                    {/*        return <div className="artist_thumbnail" key={item._id}>*/}
                    {/*            <ImageThumbnail image={item.image}/>*/}
                    {/*            <p>{item.artist.name}</p>*/}
                    {/*            <p>{item.title}</p>*/}
                    {/*            <p>{item.year}-год</p>*/}
                    {/*        </div>*/}
                    {/*    }) : null}*/}
                    {/*</div>*/}
                    {/*<div className="column">*/}
                    {/*    <p>Дорожки</p>*/}
                    {/*    {this.props.tracks ? this.props.tracks.map(item => {*/}
                    {/*        return <div className="artist_thumbnail" key={item._id}>*/}
                    {/*            <p>{item.album.title}</p>*/}
                    {/*            <p>{item.title}</p>*/}
                    {/*            <p>Продолжительнось : {item.duration}</p>*/}
                    {/*        </div>*/}
                    {/*    }) : null}*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    artists: state.response.artists,
    albums: state.response.albums,
    tracks: state.response.tracks,
    state: state.response
});

const mapDispatchToProps = dispatch => ({
    getArtists: () => dispatch(getArtists()),
    getAlbums: () => dispatch(getAlbums()),
    getTracks: () => dispatch(getTracks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);