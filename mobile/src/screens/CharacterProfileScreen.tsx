/**
 * Character Profile Screen -- Ch.19 SS19.1. Full character illustration,
 * headline quote + italic accent phrase in the track's color, short bio,
 * a "Hosts [Track Name]" tag, and a link into that character's track.
 * Entry points: tapping the host name on Track Detail, and the "Meet the
 * cast" row on Profile (both wired to navigate here with a characterId).
 *
 * No real character illustration assets exist yet (same gap as Buggy's
 * idle-bob standing in for a full animation rig) -- this uses the same
 * accent-colored avatar-circle pattern already established elsewhere in
 * the app (LessonPlayerScreen's speaker avatars) scaled up, rather than
 * inventing new visual language ahead of real art.
 */
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { color, radius, space } from "../design/tokens";
import { CHARACTERS } from "../characters/characters";
import { ALL_TRACK_META, TRACK_CONTENT_REGISTRY } from "../content/allTracks";
import { BuggyMascot } from "../components/BuggyMascot";
import type { RootStackParamList } from "../navigation/types";
import type { TrackId } from "../design/tokens";

export function CharacterProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "CharacterProfile">>();
  const character = CHARACTERS[route.params.characterId];
  const hostsTrackId = character.hostsTrackId as TrackId | null;
  const trackMeta = hostsTrackId ? ALL_TRACK_META[hostsTrackId] : null;
  const trackHasContent = hostsTrackId ? Boolean(TRACK_CONTENT_REGISTRY[hostsTrackId]) : false;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: space.lg, gap: space.lg }}>
      <View style={styles.heroWrap}>
        {character.id === "buggy" ? (
          <BuggyMascot size={120} />
        ) : (
          <View style={[styles.avatar, { backgroundColor: character.accentColor }]}>
            <Text style={styles.avatarInitial}>{character.name[0]}</Text>
          </View>
        )}
        <Text style={styles.name}>{character.name}</Text>
        <Text style={[styles.accentLine, { color: character.accentColor }]}>“{character.tagline}”</Text>
      </View>

      {trackMeta ? (
        <View style={[styles.hostTag, { backgroundColor: character.accentColor }]}>
          <Text style={styles.hostTagText}>Hosts {trackMeta.title}</Text>
        </View>
      ) : (
        <View style={styles.hostTagNeutral}>
          <Text style={styles.hostTagNeutralText}>Appears across every track</Text>
        </View>
      )}

      <Text style={styles.bio}>{character.bio}</Text>

      {trackMeta && trackHasContent && hostsTrackId ? (
        <TouchableOpacity
          style={[styles.trackButton, { backgroundColor: character.accentColor }]}
          onPress={() => navigation.navigate("TrackDetail", { trackId: hostsTrackId })}
          accessibilityRole="button"
        >
          <Text style={styles.trackButtonText}>Go to {trackMeta.title}</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: color.bg.light },
  heroWrap: { alignItems: "center", gap: space.sm },
  avatar: { width: 120, height: 120, borderRadius: 60, alignItems: "center", justifyContent: "center" },
  avatarInitial: { color: "#FFFFFF", fontWeight: "700", fontSize: 44 },
  name: { fontSize: 26, fontWeight: "700", color: color.text.onLight.primary, marginTop: space.sm },
  accentLine: { fontSize: 17, fontStyle: "italic", textAlign: "center", marginTop: 2 },
  hostTag: { alignSelf: "center", borderRadius: radius.full, paddingHorizontal: space.md, paddingVertical: space.xs },
  hostTagText: { color: "#FFFFFF", fontWeight: "600", fontSize: 13 },
  hostTagNeutral: {
    alignSelf: "center",
    borderRadius: radius.full,
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
    borderWidth: 1,
    borderColor: color.border.subtle,
  },
  hostTagNeutralText: { color: color.text.onLight.secondary, fontWeight: "600", fontSize: 13 },
  bio: { fontSize: 15, lineHeight: 22, color: color.text.onLight.primary, textAlign: "center" },
  trackButton: { borderRadius: radius.md, padding: space.md, alignItems: "center" },
  trackButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
});
