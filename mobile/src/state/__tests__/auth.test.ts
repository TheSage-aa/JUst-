/**
 * Ch.12 SS12.3's local-only sign-up/log-in/log-out actions. Covered here
 * as direct store-action tests rather than through the Settings/SignUp
 * screens' Alert.alert confirmation flows, because react-native-web's
 * Alert.alert does not support multi-button callbacks (a documented RN-
 * web limitation, not an app bug) -- these actions are real native
 * modals on iOS/Android, but can't be driven end-to-end in this sandbox's
 * headless-web verification method. Testing the store actions directly
 * verifies the actual logic that matters.
 */
import { useAppStore } from "../useAppStore";

function resetAuthState() {
  useAppStore.setState({
    user: {
      userId: "local-user",
      email: "",
      createdAt: new Date().toISOString(),
      soundEnabled: true,
      hapticsEnabled: true,
    },
    hasSeenOnboarding: false,
    sessionActive: false,
  });
}

describe("useAppStore -- onboarding", () => {
  beforeEach(resetAuthState);

  test("completeOnboarding flips hasSeenOnboarding once", () => {
    expect(useAppStore.getState().hasSeenOnboarding).toBe(false);
    useAppStore.getState().completeOnboarding();
    expect(useAppStore.getState().hasSeenOnboarding).toBe(true);
  });
});

describe("useAppStore -- signUp", () => {
  beforeEach(resetAuthState);

  test("valid email + password creates the local profile and starts a session", () => {
    const result = useAppStore.getState().signUp({ email: "a@b.com", password: "password123" });
    expect(result.ok).toBe(true);
    expect(useAppStore.getState().user.email).toBe("a@b.com");
    expect(useAppStore.getState().sessionActive).toBe(true);
  });

  test("stores optional displayName and age", () => {
    useAppStore.getState().signUp({ email: "a@b.com", password: "password123", displayName: "Ada", age: 21 });
    expect(useAppStore.getState().user.displayName).toBe("Ada");
    expect(useAppStore.getState().user.age).toBe(21);
  });

  test("rejects a malformed email", () => {
    const result = useAppStore.getState().signUp({ email: "not-an-email", password: "password123" });
    expect(result.ok).toBe(false);
    expect(useAppStore.getState().sessionActive).toBe(false);
  });

  test("rejects a password under 6 characters", () => {
    const result = useAppStore.getState().signUp({ email: "a@b.com", password: "abc" });
    expect(result.ok).toBe(false);
  });

  test("rejects signing up again with the same email already on this device (Ch.12 SS12.3's account-exists-on-login-attempt state)", () => {
    useAppStore.getState().signUp({ email: "a@b.com", password: "password123" });
    useAppStore.getState().signOut();
    const result = useAppStore.getState().signUp({ email: "a@b.com", password: "password123" });
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/already exists/i);
  });

  test("rejects signing up with a different email while another profile is active on this device", () => {
    useAppStore.getState().signUp({ email: "a@b.com", password: "password123" });
    const result = useAppStore.getState().signUp({ email: "someone-else@b.com", password: "password123" });
    expect(result.ok).toBe(false);
  });
});

describe("useAppStore -- logIn / signOut", () => {
  beforeEach(resetAuthState);

  test("logging in with no profile on this device fails", () => {
    const result = useAppStore.getState().logIn({ email: "a@b.com", password: "anything" });
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/no account/i);
  });

  test("logging in with the matching email resumes the session", () => {
    useAppStore.getState().signUp({ email: "a@b.com", password: "password123" });
    useAppStore.getState().signOut();
    expect(useAppStore.getState().sessionActive).toBe(false);

    const result = useAppStore.getState().logIn({ email: "a@b.com", password: "different-value-doesnt-matter" });
    expect(result.ok).toBe(true);
    expect(useAppStore.getState().sessionActive).toBe(true);
  });

  test("logging in with a non-matching email fails", () => {
    useAppStore.getState().signUp({ email: "a@b.com", password: "password123" });
    useAppStore.getState().signOut();
    const result = useAppStore.getState().logIn({ email: "wrong@b.com", password: "x" });
    expect(result.ok).toBe(false);
  });

  test("signOut clears the session without touching progress/economy data", () => {
    useAppStore.getState().signUp({ email: "a@b.com", password: "password123" });
    useAppStore.setState({ economy: { ...useAppStore.getState().economy, xpTotal: 250 } });

    useAppStore.getState().signOut();

    expect(useAppStore.getState().sessionActive).toBe(false);
    expect(useAppStore.getState().economy.xpTotal).toBe(250); // untouched
    expect(useAppStore.getState().user.email).toBe("a@b.com"); // profile still exists

    const result = useAppStore.getState().logIn({ email: "a@b.com", password: "x" });
    expect(result.ok).toBe(true);
    expect(useAppStore.getState().economy.xpTotal).toBe(250); // resumed, not reset
  });
});
