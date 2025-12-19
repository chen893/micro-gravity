export async function register() {
  if (
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_RUNTIME === "nodejs"
  ) {
    const { setGlobalDispatcher, ProxyAgent } = await import("undici");
    // 常见代理端口：7890 (Clash), 10809 (v2ray), 1080 (通用)
    const proxyAgent = new ProxyAgent("http://127.0.0.1:7890");
    setGlobalDispatcher(proxyAgent);
    console.log("✓ Node.js 开发环境代理已启用: http://127.0.0.1:7890");
  }
}
