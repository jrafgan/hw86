import React, {Component, Fragment} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import Main from "./containers/Main";
import AddArtist from "./containers/AddArtist";
import AddAlbum from "./containers/AddAlbum";
import AlbumInfo from "./components/AlbumInfo";
import TrackInfo from "./components/TrackInfo";
import TrackHistory from "./containers/TrackHistory";
import Register from "./containers/Register";
import Login from "./containers/Login";
import {connect} from "react-redux";
import Toolbar from "./components/Toolbar";


class App extends Component {
    render() {
        return (
            <Fragment>
                <Toolbar user={this.props.user}/>
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/add_artist" exact component={AddArtist} />
                        <Route path="/add_album" exact component={AddAlbum} />
                        <Route path="/album_info/:id" exact component={AlbumInfo} />
                        <Route path="/track_info/:id" exact component={TrackInfo} />
                        <Route path="/track_history/" exact component={TrackHistory} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />
                    </Switch>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
});
export default withRouter(connect(mapStateToProps)(App));