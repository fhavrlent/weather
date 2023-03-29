import { renderHook, act } from "@testing-library/react";

import { useError } from "./useError";

describe("useError", () => {
  it("should initially have an empty error message", () => {
    const { result } = renderHook(() => useError());

    expect(result.current.errorMessage).toBe("");
  });

  it("should show an error message", () => {
    const { result } = renderHook(() => useError());
    const testErrorMessage = "Test error message";

    act(() => {
      result.current.showError(testErrorMessage);
    });

    expect(result.current.errorMessage).toBe(testErrorMessage);
  });

  it("should hide an error message", () => {
    const { result } = renderHook(() => useError());
    const testErrorMessage = "Test error message";

    act(() => {
      result.current.showError(testErrorMessage);
    });

    expect(result.current.errorMessage).toBe(testErrorMessage);

    act(() => {
      result.current.hideError();
    });

    expect(result.current.errorMessage).toBe("");
  });
});
