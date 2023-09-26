// IMPORTANT BELOW:
// Not allowed to remove the last organizer of a competition.
if (user.roles.includes('organizer')) {
    // Find competitions of organizer
    const competitions_of_organizer = (await find_organizer_of_competition(
        { filter: { organizer_id: user._id.toString() } },
        actor, session
    ))?.data ?? []

    // For all competitions, count organizers
    for (const competition of competitions_of_organizer) {
        const organizers_of_competition = (await find_organizer_of_competition(
            { filter: { competition_id: competition._id.toString() } },
            actor, session
        ))?.data ?? []

        // If for any competition the number of organizers is 1, abort.
        if (organizers_of_competition.length === 1) {
            return {
                code: 403,
                json: {
                    message: `check_dependency_error`,
                    details: {
                        entity: 'user',
                        dependency: 'competition',
                        data: user,
                        error: 'forbidden_to_remove_the_last_organizer_of_a_competition'
                    }
                }
            }
        }
    }
}