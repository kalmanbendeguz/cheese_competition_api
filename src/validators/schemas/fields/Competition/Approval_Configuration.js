.custom((competition, helpers) => {
    // Only requirement about rating_map: the root (with node_id of 0) should have a matching record.
    if(!('0' in competition.rating_map)){
        throw new Error('rating_map_does_not_have_a_record_for_root_category')
    }
    return competition
})
.custom((competition, helpers) => {
    // rating_sheets should have a matching sheet for each rating_map value.
    const rating_map_sheet_ids = [...new Set(Object.values(competition.rating_map))]
    const rating_sheet_ids = competition.rating_sheets.map(rating_sheet => rating_sheet.id)
    if (rating_map_sheet_ids.some(rating_sheet_id => !rating_sheet_ids.includes(rating_sheet_id))) {
        throw new Error('rating_sheets_does_not_cover_all_rating_map_rating_sheet_ids')
    }
    return competition
})