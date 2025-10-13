import { memo, useMemo } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import { Text } from "../base";
import {
  contentLayoutRow,
  fouterLayout,
  padding,
  paragraphText,
  useThemeColors,
} from "../../styles";
import { AppLinks, appLinks, openLink } from "@gaddario98/react-native-utiles";

export interface FooterProps {
  style?: StyleProp<ViewStyle>;
  links?: AppLinks;
}

const Footer: React.FC<FooterProps> = ({ style, links }) => {
  const theme = useThemeColors();

  const backgroundColor = useMemo(() => theme.primary, [theme.primary]);
  const textColor = useMemo(() => theme.onPrimary, [theme.onPrimary]);

  const finalLinks = useMemo(() => ({ ...appLinks, ...links }), [links]);

  return (
    <View
      style={[
        fouterLayout,
        { backgroundColor, padding, justifyContent: "center" },
        style,
      ]}
    >
      <Text
        text="© Copyright 2025 IRV Group"
        style={[paragraphText, { color: textColor, textAlign: "center" }]}
      />
      <View style={[contentLayoutRow, { justifyContent: "center" }]}>
        <TouchableOpacity onPress={() => openLink(finalLinks.privacy)}>
          <Text
            style={[
              paragraphText,
              styles.footerLink,
              { color: textColor, textAlign: "center", width: "auto" },
            ]}
            contentStyle={{ width: "auto" }}
            text="Privacy"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink(finalLinks.cookie)}>
          <Text
            style={[
              paragraphText,
              styles.footerLink,
              { color: textColor, textAlign: "center" },
            ]}
            contentStyle={{ width: "auto" }}
            text="Cookie"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink(finalLinks.eula)}>
          <Text
            style={[
              paragraphText,
              styles.footerLink,
              { color: textColor, textAlign: "center" },
            ]}
            contentStyle={{ width: "auto" }}
            text="Eula"
          />
        </TouchableOpacity>
      </View>

      <View style={[contentLayoutRow, { justifyContent: "center" }]}>
        <TouchableOpacity onPress={() => openLink("mailto:" + finalLinks.mail)}>
          <Text
            style={[
              paragraphText,
              styles.footerLink,
              { color: textColor, textAlign: "center", width: "auto" },
            ]}
            contentStyle={{ width: "auto" }}
            text={finalLinks.mail}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink("tel:" + finalLinks.telephone)}
        >
          <Text
            style={[
              paragraphText,
              styles.footerLink,
              { color: textColor, textAlign: "center" },
            ]}
            contentStyle={{ width: "auto" }}
            text={finalLinks.telephone}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => openLink("https://" + finalLinks.website)}
      >
        <Text
          style={[
            paragraphText,
            styles.footerLink,
            { color: textColor, textAlign: "center" },
          ]}
          contentStyle={{ width: "auto" }}
          text={finalLinks.website}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerLink: {
    textDecorationLine: "underline",
  },
});

export default memo(Footer);
