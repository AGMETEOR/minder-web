export const createProfileScafoldWithRule = (ruleName: string) => {
  return `version: v1
type: profile
name: my-first-profile
context:
  provider: github
alert: "on"
remediate: "on"
repository:
  - type: ${ruleName}
    def:
      enabled: true`;
}