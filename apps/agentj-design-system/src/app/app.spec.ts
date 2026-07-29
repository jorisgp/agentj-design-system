import { render } from "@testing-library/angular";
import { describe, expect, it } from "vitest";
import { App } from "./app";
import { NxWelcome } from "./nx-welcome";

describe("App", () => {
  it("should render title", async () => {
    const { container } = await render(App, {
      imports: [NxWelcome],
    });

    expect(container.querySelector("h1")?.textContent).toContain(
      "Welcome agentj-design-system",
    );
  });
});
