const LogisticsMutations = {
    updateTracks(state) {
        let tracks = state.tracks.tracks;

        for (let track in tracks) {
            console.log(`${track + tracks[track]}`);
        }
    }
}

export {
    LogisticsMutations
}