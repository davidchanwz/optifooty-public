// Squad.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Squad from "./Squad";
// Importing here after jest.mock to get the mocked version
import { useUserTeamContext } from "../context/UserTeamContext";

// Mock the entire module where `useUserTeamContext` is defined
jest.mock("../context/UserTeamContext", () => ({
  useUserTeamContext: jest.fn(),
}));

// Define the mock outside and reset in each test or beforeEach block
const mockRemovePlayer = jest.fn();

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();

  // Setup return values or implementations
  (useUserTeamContext as jest.Mock).mockReturnValue({
    goalkeepers: [{ id: 1, name: "Goalkeeper 1" }],
    defenders: [{ id: 2, name: "Defender 1" }],
    midfielders: [{ id: 3, name: "Midfielder 1" }],
    forwards: [{ id: 4, name: "Forward 1" }],
    removePlayer: mockRemovePlayer,
  });
});

describe("Squad Component", () => {
  it("renders the component with players", () => {
    render(<Squad />);
    expect(screen.getByText("Goalkeeper 1")).toBeInTheDocument();
    expect(screen.getByText("Defender 1")).toBeInTheDocument();
    expect(screen.getByText("Midfielder 1")).toBeInTheDocument();
    expect(screen.getByText("Forward 1")).toBeInTheDocument();
  });

  it("shows confirmation dialog when a player is clicked", () => {
    render(<Squad />);
    const player = screen.getByText("Goalkeeper 1");
    fireEvent.click(player);
    expect(screen.getByText(/remove goalkeeper 1\?/i)).toBeInTheDocument();
  });

  it("removes a player when confirm is clicked", () => {
    const { rerender } = render(<Squad />);
    const player = screen.getByText("Goalkeeper 1");
    fireEvent.click(player);
    fireEvent.click(screen.getByText("Confirm"));

    // Update the mock to reflect the removal
    (useUserTeamContext as jest.Mock).mockReturnValue({
      goalkeepers: [],
      defenders: [{ id: 2, name: "Defender 1" }],
      midfielders: [{ id: 3, name: "Midfielder 1" }],
      forwards: [{ id: 4, name: "Forward 1" }],
      removePlayer: mockRemovePlayer,
    });

    // Re-render the component to reflect the new state
    rerender(<Squad />);

    const goalkeeper = screen.queryByText("Goalkeeper 1");
    expect(goalkeeper).not.toBeInTheDocument();
  });

  it("cancels the removal when cancel is clicked", () => {
    render(<Squad />);
    const player = screen.getByText("Goalkeeper 1");
    fireEvent.click(player);
    fireEvent.click(screen.getByText("Cancel"));
    expect(
      screen.queryByText(/remove goalkeeper 1\?/i)
    ).not.toBeInTheDocument();
  });
});
