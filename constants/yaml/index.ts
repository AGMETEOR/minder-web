import { v4 as uuidv4 } from 'uuid';

export const createProfileScafoldWithRule = (ruleName: string) => {
  return `version: v1
type: profile
name: profile-${uuidv4()}
context:
  provider: github
alert: "on"
remediate: "on"
repository:
  - type: ${ruleName}
    def:
      enabled: true`;
}