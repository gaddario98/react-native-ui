import { useMemo, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  Easing,
  Dimensions,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { paragraphText, useThemeColors } from "../../../styles";
import { LoadingProps } from "./types";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Loading: React.FC<LoadingProps> = ({
  visible = true,
  text,
  overlay = false,
  size = "large",
  style,
  textStyle,
  color,
  ns = "translation", // Ensure ns is always defined
}) => {
  console.log("Loading component rendered");
  const theme = useThemeColors();
  const { t } = useTranslation(ns);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const backgroundAnim1 = useRef(new Animated.Value(0)).current;
  const backgroundAnim2 = useRef(new Animated.Value(0)).current;

  const loadingColor = useMemo(
    () => color || theme.primary,
    [color, theme.primary]
  );

  useEffect(() => {
    if (visible) {
      // Animazioni del contenuto
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Rotazione continua
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ])
      ).start();

      // Animazione pulsante
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Animazioni dello sfondo
      Animated.loop(
        Animated.sequence([
          Animated.timing(backgroundAnim1, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(backgroundAnim1, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(backgroundAnim2, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(backgroundAnim2, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [
    backgroundAnim1,
    backgroundAnim2,
    opacityAnim,
    pulseAnim,
    rotateAnim,
    scaleAnim,
    visible,
  ]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.05],
  });

  const LoadingContent = useMemo(
    () => (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
          style,
        ]}
      >
        <Animated.View style={{ transform: [{ rotate: spin }, { scale }] }}>
          <Ionicons
            name="sync"
            size={size === "large" ? 50 : 24}
            color={loadingColor}
          />
        </Animated.View>
        {text && (
          <Animated.Text
            style={[
              styles.text,
              paragraphText,
              { color: loadingColor },
              textStyle,
              { transform: [{ scale }] },
            ]}
          >
            {t(text)}
          </Animated.Text>
        )}
      </Animated.View>
    ),
    [
      opacityAnim,
      scaleAnim,
      style,
      spin,
      scale,
      loadingColor,
      size,
      text,
      textStyle,
      t,
    ]
  );

  if (!visible) return <></>;
  if (overlay) {
    if (Platform.OS === "web") {
      // Render a fullscreen overlay using View for web
      return (
        <View style={styles.modalContainer}>
          <Animated.View
            style={{
              opacity: opacityAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}
          />
          {/* Background animations */}
          <Animated.View
            style={[
              styles.backgroundBubble,
              {
                transform: [
                  {
                    translateX: backgroundAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-width / 2, width / 2],
                    }),
                  },
                  {
                    scale: backgroundAnim1.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.8, 1.2, 0.8],
                    }),
                  },
                ],
                opacity: 0.3,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.backgroundBubble,
              {
                backgroundColor: theme.secondary,
                transform: [
                  {
                    translateX: backgroundAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [width / 2, -width / 2],
                    }),
                  },
                  {
                    scale: backgroundAnim2.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 1.5, 1],
                    }),
                  },
                ],
                opacity: 0.2,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.modalContent,
              {
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
              style,
            ]}
          >
            {LoadingContent}
          </Animated.View>
        </View>
      );
    }

    return (
      <Modal
        visible={visible}
        animationType="fade"
        statusBarTranslucent
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={{
              opacity: opacityAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}
          />
          {/* Background animations */}
          <Animated.View
            style={[
              styles.backgroundBubble,
              {
                transform: [
                  {
                    translateX: backgroundAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-width / 2, width / 2],
                    }),
                  },
                  {
                    scale: backgroundAnim1.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.8, 1.2, 0.8],
                    }),
                  },
                ],
                opacity: 0.3,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.backgroundBubble,
              {
                backgroundColor: theme.secondary,
                transform: [
                  {
                    translateX: backgroundAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [width / 2, -width / 2],
                    }),
                  },
                  {
                    scale: backgroundAnim2.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 1.5, 1],
                    }),
                  },
                ],
                opacity: 0.2,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.modalContent,
              {
                opacity: opacityAnim,
                transform: [{ scale: scaleAnim }],
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
              style,
            ]}
          >
            {LoadingContent}
          </Animated.View>
        </View>
      </Modal>
    );
  }

  return LoadingContent;
};

const styles = StyleSheet.create({
  backgroundBubble: {
    backgroundColor: "#8cc91b",
    borderRadius: 150,
    height: 300,
    opacity: 0.2,
    position: "absolute",
    width: 300,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    padding: 16,
  },
  modalContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    borderRadius: 16,
    elevation: 4,
    minWidth: 120,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 2,
  },
  text: {
    marginTop: 12,
    textAlign: "center",
  },
});

export default Loading;
