import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { type MockStoreEnhanced } from "redux-mock-store";
import { HomePage } from "./home";
import type { RootState } from "@/store";
import { TaskPriority } from "@/types";
import "@testing-library/jest-dom";

jest.mock("@/components/header", () => ({
  Header: jest.fn(() => <div data-testid="mock-header" />),
}));
jest.mock("@/components/tasks/search-and-filter", () => ({
  SearchAndFilter: jest.fn(() => <div data-testid="mock-search-filter" />),
}));
jest.mock("@/components/tasks/task-form", () => ({
  TaskForm: jest.fn(() => <div data-testid="mock-task-form" />),
}));
jest.mock("@/components/tasks/task-list", () => ({
  TaskList: jest.fn(() => <div data-testid="mock-task-list" />),
}));
jest.mock("@/components/tasks/task-stats", () => ({
  TaskStats: jest.fn(() => <div data-testid="mock-task-stats" />),
}));
jest.mock("@radix-ui/react-separator", () => ({
  Separator: jest.fn(() => <hr data-testid="mock-separator" />),
}));

const mockStore = configureStore<RootState>([]);

describe("HomePage", () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      tasks: {
        tasks: [
          {
            id: "1",
            title: "Test Task 1",
            description: "Description 1",
            completed: false,
            priority: TaskPriority.Medium,
            category: "Test",
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Test Task 2",
            description: "Description 2",
            completed: true,
            priority: TaskPriority.Low,
            category: "Work",
            createdAt: new Date().toISOString(),
          },
        ],
      },
      products: {
        products: [],
        loading: false,
        error: null,
        selectedProduct: null,
      },
      _persist: { version: -1, rehydrated: true },
    });
  });

  it("renders without crashing and displays child components", () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-task-stats")).toBeInTheDocument();
    expect(screen.getByTestId("mock-search-filter")).toBeInTheDocument();
    expect(screen.getByTestId("mock-task-form")).toBeInTheDocument();
    expect(screen.getByTestId("mock-separator")).toBeInTheDocument();
    expect(screen.getByTestId("mock-task-list")).toBeInTheDocument();
  });
});
