const tempRolesSchema = require('../models/tempRole-schema')

module.exports = (client) => {
    const checkForRoles = async () => {
        const query = {
            expires: { $lt: new Date() },
        }

        const results = await tempRolesSchema.find(query)

        for (const result of results) {
            const { guildId, userId, roleId } = result
            const guild = await client.guilds.fetch(guildId)
            if (!guild) return

            const user = await guild.members.fetch(userId).catch(() => null)
            if (!user) return

            const role = await guild.roles.cache.get(roleId)
            if (!role) return

            user.roles.remove(role)
        }

        await tempRolesSchema.deleteMany(query)

        setTimeout(checkForRoles, 1000 * 10)
    }
    checkForRoles()
}

module.exports.config = {
    dbName: 'EXPIRED ROLES',
    displayName: 'Expired Roles' 
}
