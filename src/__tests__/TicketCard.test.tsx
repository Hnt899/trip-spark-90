import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

type TicketCardProps = {
  orderNumber: string;
  fromCity: string;
  toCity: string;
  price: number;
};

function TicketCard({ orderNumber, fromCity, toCity, price }: TicketCardProps) {
  return (
    <article>
      <h3>Билет #{orderNumber}</h3>
      <p>
        {fromCity} → {toCity}
      </p>
      <strong>{price.toLocaleString("ru-RU")} ₽</strong>
    </article>
  );
}

describe("TicketCard", () => {
  it("shows ticket information", () => {
    render(<TicketCard orderNumber="T12345" fromCity="Москва" toCity="Санкт-Петербург" price={4990} />);

    expect(screen.getByText("Билет #T12345")).toBeInTheDocument();
    expect(screen.getByText("Москва → Санкт-Петербург")).toBeInTheDocument();
    expect(screen.getByText("4 990 ₽")).toBeInTheDocument();
  });
});
