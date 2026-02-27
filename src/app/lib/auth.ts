import { betterAuth, boolean } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { role } from "better-auth/plugins";
import { Role, Status } from "../../generate/prisma/enums";
// If your Prisma file is located elsewhere, you can change the path

const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: true,
                defaultValue: Role.PATIENT
            },
            status: {
                type: 'string',
                required: true,
                defaultValue: Status.ACTIVE
            },
            isDeleted: {
                type: 'boolean',
                required: true,
                defaultValue: false
            },
            deletedAt: {
                type: "date",
                required: false,
                defaultValue: null
            },
            needsPassChange: {
                type: 'boolean',
                required: false,
                defaultValue: false
            }

        }
    },
});

export default auth