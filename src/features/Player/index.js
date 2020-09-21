import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, AppState } from "react-native";
import shareStyle from "../../config/styles";
import PlayerBanners from "../Player/components/PlayerBanner";
import PlayerSlider from "../Player/components/PlayerSlider";
import PlayerControler from "../Player/components/PlayerControler";
import { Audio, Video } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import {
  loadTrack,
  nextTrack,
  playPauseTrack,
  previousTrack,
  swipeTrack,
} from "../../actions/player";

const { width, height } = Dimensions.get("screen");

const ITEM_SIZE = width * 0.6;

function index({ navigation }) {
  const paused = useSelector((state) => state.player.paused);
  const [totalLength, setTotalLength] = useState(1);
  const [curPos, setCurPos] = useState(0);
  const tracks = useSelector((state) => state.player.list);
  const selectedTrack = useSelector((state) => state.player.selectedTrack);
  const playbackInstance = useSelector(
    (state) => state.player.playbackInstance
  );
  const dispatch = useDispatch();
  const listBanner = useRef(null);

  const seek = useCallback((time) => {
    time = Math.round(time);
    setCurPos(time);
  }, []);

  const handleOnItemChange = useCallback(async (index) => {
    if (playbackInstance != null) {
      await playbackInstance.unloadAsync();
      playbackInstance.setOnPlaybackStatusUpdate(null);

      const newState = {
        selectedTrack: index,
      };

      const action = swipeTrack(newState);
      dispatch(action);
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
      if (listBanner.current) {
        var prev = selectedTrack;
        listBanner.current.scrollToOffset({
          offset: ITEM_SIZE * --prev,
          animated: true,
        });
      }
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
      if (listBanner.current) {
        var next = selectedTrack;
        listBanner.current.scrollToOffset({
          offset: ITEM_SIZE * ++next,
          animated: true,
        });
      }
    }
  });

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

        progressUpdateIntervalMillis: 1000,
      };

      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus
      );

      const onPlaybackStatusUpdate = (playbackStatus) => {
        if (!playbackStatus.isLoaded) {
          // Update your UI for the unloaded state
          if (playbackStatus.error) {
            console.log(
              `Encountered a fatal error during playback: ${playbackStatus.error}`
            );
          }
        } else {
          // Update your UI for the loaded state

          if (playbackStatus.isPlaying) {
            // Update your UI for the playing state
            setCurPos(playbackStatus.positionMillis);
          } else {
            // Update your UI for the paused state
          }
        }
      };

      sound.getStatusAsync().then((result) => {
        setTotalLength(result.durationMillis);
        setCurPos(result.positionMillis);
      });

      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
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

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    loadAudio(paused);
  }, []);
  return (
    <View style={shareStyle.container}>
      <PlayerBanners
        listBanner={listBanner}
        data={tracks}
        selectedTrack={selectedTrack.current}
        onItemChange={handleOnItemChange}
      />
      <PlayerSlider
        onSeek={seek}
        trackLength={totalLength}
        currentPosition={curPos}
        onSlidingStart={() => {
          setPaused(true);
        }}
      />
      <PlayerControler
        handlePlayPause={handlePlayPause}
        handleNextTrack={handleNextTrack}
        handlePreviousTrack={handlePreviousTrack}
        paused={paused}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default index;
