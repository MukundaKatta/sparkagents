import { describe, it, expect } from "vitest";
import { Sparkagents } from "../src/core.js";
describe("Sparkagents", () => {
  it("init", () => { expect(new Sparkagents().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Sparkagents(); await c.generate(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Sparkagents(); await c.generate(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
