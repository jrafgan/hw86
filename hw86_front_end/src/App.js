import React, {Component, Fragment} from 'react';
import {Route, Switch} from "react-router-dom";
import Main from "./containers/Main";
import AddArtist from "./containers/AddArtist";
import AddAlbum from "./containers/AddAlbum";
import AlbumInfo from "./components/AlbumInfo";
import TrackInfo from "./components/TrackInfo";


class App extends Component {
    render() {
        return (
            <Fragment>
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/add_artist" exact component={AddArtist} />
                        <Route path="/add_album" exact component={AddAlbum} />
                        <Route path="/album_info/:id" exact component={AlbumInfo} />
                        <Route path="/track_info/:id" exact component={TrackInfo} />
                    </Switch>
            </Fragment>
        );
    }
}

export default App;