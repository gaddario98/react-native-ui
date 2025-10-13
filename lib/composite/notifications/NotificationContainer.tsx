import { memo } from "react";
import { View, StyleSheet } from "react-native";
import { useNotificationState } from "@gaddario98/react-notifications";
import Notification from "./Notification";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationContainer: React.FC = () => {
  const [notification, setNotification] = useNotificationState();

  const handleDismiss = () => {
    setNotification(null);
  };

  if (!notification) return null;

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <Notification
        visible={true}
        onDismiss={handleDismiss}
        {...notification}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1000,
  },
});

export default memo(NotificationContainer);
