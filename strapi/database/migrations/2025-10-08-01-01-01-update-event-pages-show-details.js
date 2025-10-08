module.exports = {
  async up(knex) {
    const hasColumn = await knex.schema.hasColumn('event_pages', 'show_event_details_section');

    if (hasColumn) {
      await knex('event_pages')
        .whereNull('show_event_details_section')
        .update({ show_event_details_section: true });
    }
  },
};
