import React, { useCallback } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../config/colors";
import {
  nextTrack,
  playPauseTrack,
  previousTrack,
  loadTrack,
} from "../../../actions/player";
import { loadAudio } from "../../Player/index";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("screen");

function HomePlayer(props) {
  const tracks = useSelector((state) => state.player.list);
  const selectedTrack = useSelector((state) => state.player.selectedTrack);
  const paused = useSelector((state) => state.player.paused);
  const playbackInstance = useSelector(
    (state) => state.player.playbackInstance
  );
  const dispatch = useDispatch();

  const loadAudio = useCallback(async () => {
    try {
      if (playbackInstance != null) {
        await playbackInstance.unloadAsync();
        playbackInstance.setOnPlaybackStatusUpdate(null);
      }

      const source = {
        uri: tracks[selectedTrack].audioUrl,
      };

      const initialStatus = {
        //Play by default
        shouldPlay: true,
        //Control the speed
        rate: 1.0,
        //Correct the pitch
        shouldCorrectPitch: true,
        //Control the Volume
        volume: 1.0,
        //mute the Audio
        isMuted: false,
      };

      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus
      );

      sound.playAsync();
      const newState = {
        playbackInstance: sound,
      };

      const action = loadTrack(newState);
      dispatch(action);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handlePreviousTrack = useCallback(async () => {
    if (selectedTrack == 0) {
      return;
    }
    if (playbackInstance != null) {
      await playbackInstance.unloadAsync();
      playbackInstance.setOnPlaybackStatusUpdate(null);
      if (selectedTrack < tracks.length - 1) {
        const action = previousTrack(null);
        dispatch(action);
      }
      loadAudio();
    }
  });

  const handleNextTrack = useCallback(async () => {
    if (selectedTrack == tracks.length - 1) {
      return;
    }
    if (playbackInstance != null) {
      await playbackInstance.unloadAsync();
      playbackInstance.setOnPlaybackStatusUpdate(null);

      if (selectedTrack < tracks.length - 1) {
        const action = nextTrack(null);
        dispatch(action);
      }
      loadAudio();
    }
  });

  const handlePlayPause = useCallback(async () => {
    paused
      ? await playbackInstance.playAsync()
      : await playbackInstance.pauseAsync();

    const newState = {
      paused: !paused,
    };
    const action = playPauseTrack(newState);
    dispatch(action);
  });

  return (
    <View style={styles.playerControler}>
      <Image
        style={styles.playerThumbnail}
        source={{ uri: tracks[selectedTrack].albumArtUrl }}
      />
      <View style={styles.songContainer}>
        <Text style={styles.songTitle}>{tracks[selectedTrack].title}</Text>
        <Text style={styles.songArtist}>{tracks[selectedTrack].artist}</Text>
      </View>

      <TouchableWithoutFeedback
        style={{ margin: 5 }}
        onPress={handlePreviousTrack}
      >
        <MaterialCommunityIcons
          name="skip-previous"
          size={height * 0.04}
          color={colors.gray}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={{ margin: 5 }} onPress={handlePlayPause}>
        {paused ? (
          <MaterialCommunityIcons
            name="play-circle"
            size={height * 0.05}
            color={colors.gray}
          />
        ) : (
          <MaterialCommunityIcons
            name="pause-circle"
            size={height * 0.05}
            color={colors.gray}
          />
        )}
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback style={{ margin: 5 }} onPress={handleNextTrack}>
        <MaterialCommunityIcons
          name="skip-next"
          size={height * 0.04}
          color={colors.gray}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  playerControler: {
    position: "absolute",
    flexDirection: "row",

    width: width * 0.8,
    height: height * 0.0625,

    alignSelf: "center",
    alignItems: "center",

    backgroundColor: "white",
    borderRadius: 30,
    padding: 10,

    bottom: height * 0.02,
  },
  playerThumbnail: {
    width: height * 0.05,
    height: height * 0.05,

    borderRadius: 30,
  },
  songContainer: {
    width: width * 0.35,
    height: height * 0.05,

    flexDirection: "column",

    paddingStart: 5,
  },

  songTitle: {
    flex: 1,

    fontFamily: "Righteous",
    fontSize: 15,

    overflow: "hidden",
  },
  songArtist: {
    flex: 1,

    fontFamily: "Righteous",
    fontSize: 12,
    color: colors.opacity,
  },
});

export default HomePlayer;
