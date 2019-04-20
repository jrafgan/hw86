import React, {Component} from 'react';
import ImageThumbnail from "./ImageThumbnail";
import {getAlbum, getTracksByAlbum} from "../store/actions/musicActions";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

class TrackInfo extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getAlbum(id);
        this.props.getTracksByAlbum(id);
    }

    getTracks = id => {
        console.log(id);
    };

    render() {
        console.log(this.props.match.params);
        if (this.props.artist) console.log(this.props.artist);
        return (
            <div>
                <div className="column">
                    <Link to="/">Главная</Link>
                    <div className="one_artist">
                        {this.props.album ? <div className="artist_thumbnail" key={this.props.album.artist._id}  onClick={this.getTracks}>
                            <ImageThumbnail image={this.props.album.artist.image}/>
                            <p>{this.props.album.artist.name}</p>
                            <p>{this.props.album.artist.description}</p>
                        </div> : null}
                    </div>
                    {this.props.album ? <div className="artist_thumbnail">
                            <ImageThumbnail image={this.props.album.image}/>
                            <p>{this.props.album.title}</p>
                            <p>{this.props.album.year}-год</p>
                        </div> : null}
                        <div className="track_thumbnail">
                            <p>Трэки</p>
                    {this.props.tracks ? this.props.tracks.map(track=>{
                        return <div>
                        <span>{track.number}. </span>
                        <span> {track.title} </span>
                        <span> {track.duration}</span>
                    </div>}) : null}
                        </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    album: state.response.album,
    tracks: state.response.tracks,
});

const mapDispatchToProps = dispatch => ({
    getTracksByAlbum: (id) => dispatch(getTracksByAlbum(id)),
    getAlbum: (albumId) => dispatch(getAlbum(albumId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackInfo);