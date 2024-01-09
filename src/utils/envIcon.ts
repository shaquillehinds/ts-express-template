export default function envIcon(env: NODE_ENV) {
  switch (env) {
    case "development":
    case "dev":
      return "🛠";
    case "test":
      return "🧪";
    case "staging":
      return "🟠";
    default:
      return "🛫";
  }
}
