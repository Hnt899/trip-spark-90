import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

function SearchForm({ onSubmit }: { onSubmit: (payload: { from: string; to: string }) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        onSubmit({
          from: String(fd.get("from") || ""),
          to: String(fd.get("to") || ""),
        });
      }}
    >
      <input name="from" placeholder="Откуда" />
      <input name="to" placeholder="Куда" />
      <button type="submit">Найти</button>
    </form>
  );
}

describe("SearchForm", () => {
  it("renders inputs and search button", () => {
    render(<SearchForm onSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText("Откуда")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Куда")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Найти" })).toBeInTheDocument();
  });

  it("submits form values", () => {
    const onSubmit = vi.fn();
    render(<SearchForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Откуда"), {
      target: { value: "Москва" },
    });
    fireEvent.change(screen.getByPlaceholderText("Куда"), {
      target: { value: "Питер" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Найти" }));

    expect(onSubmit).toHaveBeenCalledWith({ from: "Москва", to: "Питер" });
  });
});
