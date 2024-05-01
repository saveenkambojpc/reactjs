import { sample } from "lodash";
import { faker } from "@faker-js/faker";

// ----------------------------------------------------------------------

export const users: any = [...Array(24)].map((_, index) => ({
  id: index.toString(),
  avatarUrl: `./assets/images/avatars/dummy.png`,
  // name: faker.person.fullName(),
  name: `Member ${index + 1}`,
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(["active", "banned"]),
  health_status: sample(["healthy", "unhealthy"]),

  role: sample([
    "Leader",
    "Hr Manager",
    "UI Designer",
    "UX Designer",
    "UI/UX Designer",
    "Project Manager",
    "Backend Developer",
    "Full Stack Designer",
    "Front End Developer",
    "Full Stack Developer",
  ]),
}));


