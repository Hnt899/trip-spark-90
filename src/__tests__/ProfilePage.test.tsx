import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProfilePurpose from "@/pages/reference/articles/ProfilePurpose";

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "u-1", email: "user@test.dev" },
    loading: false,
    signOut: vi.fn(),
    updatePassword: vi.fn(),
  }),
}));

// Статья рендерит Header/Footer, а они ходят в API через React Query,
// поэтому тесту нужен QueryClientProvider (без ретраев — чтобы не ждать в тестах).
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

describe("ProfilePage", () => {
  it("renders profile-related article content", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProfilePurpose />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    expect(screen.getByTitle(/Личный кабинет/i)).toBeInTheDocument();
  });
});
