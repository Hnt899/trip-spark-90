import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import ProfilePurpose from "@/pages/reference/articles/ProfilePurpose";

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "u-1", email: "user@test.dev" },
    loading: false,
    signOut: vi.fn(),
    updatePassword: vi.fn(),
  }),
}));

describe("ProfilePage", () => {
  it("renders profile-related article content", () => {
    render(
      <MemoryRouter>
        <ProfilePurpose />
      </MemoryRouter>,
    );
    expect(screen.getByTitle(/Личный кабинет/i)).toBeInTheDocument();
  });
});
